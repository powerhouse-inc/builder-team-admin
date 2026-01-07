import { useState, useMemo } from "react";
import { Button } from "@powerhousedao/document-engineering";
import { useDocumentsInSelectedDrive } from "@powerhousedao/reactor-browser";
import { generateId } from "document-model";
import { X, FileText, Check } from "lucide-react";
import type { LineItemGroup } from "../../../document-models/expense-report/gen/types.js";
import { actions } from "../../../document-models/expense-report/index.js";

interface AddBillingStatementModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
  dispatch: any;
  groups: LineItemGroup[];
}

// Mapping of fusion labels to group IDs
const fusionLabelToValue: Record<string, string> = {
  Budget: "budget",
  "Current Liability": "liabilities/current",
  "Interest Income": "income/interest",
  "Travel & Entertainment": "expenses/headcount/travel-and-entertainment",
  "Cost of Goods Sold": "expenses/non-headcount/direct-costs",
  "Marketing Expense": "expenses/headcount/marketing",
  "Professional Services": "expenses/headcount/professional-services",
  "Software Development Expense": "expenses/non-headcount/software-development",
  "Compensation & Benefits": "expenses/headcount/compensation-and-benefits",
  "Admin Expense": "expenses/headcount/admin",
  "Other Income Expense (Non-operating)": "income/non-operating",
  "Other Income": "income/other",
  "Income Tax Expense": "expenses/non-headcount/income-tax",
  "Current Asset": "assets/current",
  "Software Expense": "expenses/non-headcount/software",
  "Fixed Asset": "assets/fixed",
  "Non-Current Asset": "assets/non-current",
  "Gas Expense": "expenses/non-headcount/gas",
  "Adjustment A/C": "accounts/adjustment",
  "Temporary Holding Account": "accounts/temporary",
  Other: "accounts/other",
  "Internal Transfers": "accounts/internal-transfers",
  "Owner Equity": "equity/owner",
  "Non-current Liability": "liabilities/non-current",
  Equity: "equity/retained",
};

export function AddBillingStatementModal({
  isOpen,
  onClose,
  walletAddress,
  dispatch,
  groups,
}: AddBillingStatementModalProps) {
  const documents = useDocumentsInSelectedDrive();
  const [selectedStatements, setSelectedStatements] = useState<Set<string>>(
    new Set(),
  );
  const [searchTerm, setSearchTerm] = useState("");

  // Get already added billing statement IDs for this wallet from documents
  const existingBillingStatementIds = useMemo(() => {
    if (!documents) return new Set<string>();

    const expenseReports = documents.filter(
      (doc: any) => doc.header.documentType === "powerhouse/expense-report",
    );

    const ids = new Set<string>();
    expenseReports.forEach((doc: any) => {
      const wallets = doc.state?.global?.wallets || [];
      const wallet = wallets.find((w: any) => w.wallet === walletAddress);
      if (wallet?.billingStatements) {
        wallet.billingStatements.forEach((id: string) => {
          if (id) ids.add(id);
        });
      }
    });

    return ids;
  }, [documents, walletAddress]);

  // Get billing statement documents from the drive
  const billingStatements = useMemo(() => {
    if (!documents) return [];

    return documents
      .filter(
        (doc: any) =>
          doc.header.documentType === "powerhouse/billing-statement",
      )
      .map((doc: any) => ({
        id: doc.header.id,
        name: doc.header.name,
        document: doc, // Full document with state
      }));
  }, [documents]);

  // Filter billing statements based on search term
  const filteredStatements = useMemo(() => {
    if (!searchTerm.trim()) return billingStatements;
    const search = searchTerm.toLowerCase();
    return billingStatements.filter((stmt) =>
      stmt.name.toLowerCase().includes(search),
    );
  }, [billingStatements, searchTerm]);

  // Toggle statement selection
  const toggleStatement = (id: string) => {
    // Don't allow selecting already-added statements
    if (existingBillingStatementIds.has(id)) {
      return;
    }

    const newSelected = new Set(selectedStatements);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedStatements(newSelected);
  };

  // Format currency with thousand separators
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Map billing statement line item tag to expense report group
  const mapTagToGroup = (lineItem: any): string | null => {
    // Find expense-account tag
    const expenseAccountTag = lineItem.lineItemTag?.find(
      (tag: any) => tag.dimension === "expense-account",
    );

    if (!expenseAccountTag || !expenseAccountTag.label) return null;

    // Find matching group by label
    const group = groups.find((g) => g.label === expenseAccountTag.label);
    return group ? group.id : null;
  };

  // Add selected billing statements to wallet
  const handleAddStatements = () => {
    if (selectedStatements.size === 0) return;

    // First, add all billing statement references
    selectedStatements.forEach((statementId) => {
      dispatch(
        actions.addBillingStatement({
          wallet: walletAddress,
          billingStatementId: statementId,
        }),
      );
    });

    // Aggregate line items by category across all selected billing statements
    const categoryAggregation = new Map<
      string,
      {
        groupId: string | null;
        groupLabel: string;
        budget: number;
        actuals: number;
        forecast: number;
        payments: number;
      }
    >();

    selectedStatements.forEach((statementId) => {
      const statement = billingStatements.find((s) => s.id === statementId);
      if (!statement || !statement.document) return;

      console.log("Statement document:", statement.document);

      // Extract line items from billing statement
      const billingState = statement.document;
      const lineItems = billingState.state?.global?.lineItems || [];

      console.log("Line items found:", lineItems.length, lineItems);

      // Aggregate line items by category
      lineItems.forEach((billingLineItem: any) => {
        const groupId = mapTagToGroup(billingLineItem);
        const categoryKey = groupId || "uncategorized";

        const existing = categoryAggregation.get(categoryKey);

        if (existing) {
          // Aggregate values for the same category
          existing.actuals += billingLineItem.totalPriceCash || 0;
        } else {
          // Create new category entry
          const group = groups.find((g) => g.id === groupId);
          categoryAggregation.set(categoryKey, {
            groupId: groupId,
            groupLabel: group?.label || "Uncategorised",
            budget: 0,
            actuals: billingLineItem.totalPriceCash || 0,
            forecast: 0,
            payments: 0,
          });
        }
      });
    });

    // Now add aggregated line items to wallet
    categoryAggregation.forEach((aggregatedItem) => {
      const expenseLineItem = {
        id: generateId(),
        label: aggregatedItem.groupLabel,
        group: aggregatedItem.groupId,
        budget: aggregatedItem.budget,
        actuals: aggregatedItem.actuals,
        forecast: aggregatedItem.forecast,
        payments: aggregatedItem.payments,
        comments: null,
      };

      dispatch(
        actions.addLineItem({
          wallet: walletAddress,
          lineItem: expenseLineItem,
        }),
      );
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[80vh] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Billing Statements
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Select billing statements to add to wallet{" "}
              {walletAddress.substring(0, 10)}...
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <input
              type="text"
              placeholder="Search billing statements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-11 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto px-6 py-4">
          {filteredStatements.length > 0 ? (
            <div className="space-y-2">
              {filteredStatements.map((statement) => {
                const isAlreadyAdded = existingBillingStatementIds.has(
                  statement.id,
                );
                const isSelected = selectedStatements.has(statement.id);
                const billingState = statement.document;
                const lineItemCount =
                  billingState.state?.global?.lineItems?.length || 0;
                const totalCash = billingState.state?.global?.totalCash || 0;

                return (
                  <div
                    key={statement.id}
                    onClick={() => toggleStatement(statement.id)}
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                      isAlreadyAdded
                        ? "border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 opacity-60 cursor-not-allowed"
                        : isSelected
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 cursor-pointer"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer"
                    }`}
                  >
                    {/* Checkbox */}
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
                        isAlreadyAdded
                          ? "border-gray-400 dark:border-gray-500 bg-gray-200 dark:bg-gray-700"
                          : isSelected
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {(isSelected || isAlreadyAdded) && (
                        <Check className="text-white" size={14} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-white truncate">
                          {statement.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                          {lineItemCount} items
                        </span>
                        {isAlreadyAdded && (
                          <span className="text-xs text-amber-600 dark:text-amber-400 px-2 py-1 bg-amber-50 dark:bg-amber-900/20 rounded font-medium">
                            Already included
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <span>Total: {formatCurrency(totalCash)}</span>
                        <span className="text-xs font-mono">
                          {statement.id.substring(0, 8)}...
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
              <FileText size={48} className="mb-4 opacity-50" />
              <p className="text-sm">
                {searchTerm
                  ? "No billing statements found matching your search"
                  : "No billing statements available in this drive"}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {selectedStatements.size} statement
            {selectedStatements.size !== 1 ? "s" : ""} selected
          </span>
          <div className="flex gap-3">
            <Button onClick={onClose} variant="secondary">
              CANCEL
            </Button>
            <Button
              onClick={handleAddStatements}
              disabled={selectedStatements.size === 0}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              ADD{" "}
              {selectedStatements.size > 0 && `(${selectedStatements.size})`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
