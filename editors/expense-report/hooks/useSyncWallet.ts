import { useDocumentsInSelectedDrive } from "@powerhousedao/reactor-browser";
import { actions } from "../../../document-models/expense-report/index.js";
import { generateId } from "document-model";
import type {
  LineItemGroup,
  LineItem,
  Wallet,
} from "../../../document-models/expense-report/gen/types.js";

interface BillingStatementLineItem {
  id: string;
  description: string;
  unit: string;
  quantity: number;
  unitPriceCash: number;
  unitPricePwt: number;
  totalPriceCash: number;
  totalPricePwt: number;
  lineItemTag?: Array<{
    id: string;
    label: string;
    dimension: string;
  }>;
}

export function useSyncWallet() {
  const documents = useDocumentsInSelectedDrive();

  const syncWallet = (
    walletAddress: string,
    existingLineItems: LineItem[],
    billingStatementIds: string[],
    groups: LineItemGroup[],
    allWallets: Wallet[],
    accountTransactionsDocumentId: string | null | undefined,
    periodStart: string | null | undefined,
    periodEnd: string | null | undefined,
    dispatch: any,
  ) => {
    if (!documents) return;

    // Get billing statement documents
    const billingStatements = new Map<string, any>();
    documents
      .filter(
        (doc: any) =>
          doc.header.documentType === "powerhouse/billing-statement",
      )
      .forEach((doc: any) => {
        billingStatements.set(doc.header.id, doc);
      });

    // Helper function to map tag to group
    const mapTagToGroup = (
      billingLineItem: BillingStatementLineItem,
    ): string | null => {
      // Find expense-account tag
      const expenseAccountTag = billingLineItem.lineItemTag?.find(
        (tag) => tag.dimension === "expense-account",
      );

      if (!expenseAccountTag || !expenseAccountTag.label) return null;

      // Find matching group by label
      const group = groups.find((g) => g.label === expenseAccountTag.label);
      return group ? group.id : null;
    };

    // Helper function to calculate payments from AccountTransactions document
    const calculatePaymentsFromTransactions = (
      txDocumentId: string,
      start: string,
      end: string,
    ): number => {
      // Find AccountTransactions document
      const txDoc = documents?.find(
        (doc: any) =>
          doc.header.id === txDocumentId &&
          doc.header.documentType === "powerhouse/account-transactions",
      ) as any;

      if (!txDoc?.state?.global?.transactions) {
        return 0;
      }

      const transactions = txDoc.state.global.transactions || [];
      const startDate = new Date(start);
      const endDate = new Date(end);

      // USD stablecoin list
      const USD_STABLECOINS = ["USDC", "USDT", "USDS", "DAI", "GUSD", "TUSD"];

      // Create set of all wallet addresses for intergroup detection
      const walletAddresses = new Set(
        allWallets.map((w) => w.wallet?.toLowerCase()).filter(Boolean),
      );

      // Calculate total payments from USD transactions
      const totalPayments = transactions.reduce((sum: number, tx: any) => {
        // Only count OUTFLOW transactions
        if (tx.direction !== "OUTFLOW") return sum;

        // Check if transaction is within period
        const txDate = new Date(tx.datetime);
        if (txDate < startDate || txDate > endDate) return sum;

        // Extract currency unit from amount
        const unit = tx.amount?.unit || tx.details?.token;
        if (!USD_STABLECOINS.includes(unit)) return sum;

        // Exclude intergroup transactions (transactions to other wallets in this report)
        const counterParty = tx.counterParty?.toLowerCase();
        if (counterParty && walletAddresses.has(counterParty)) return sum;

        // Add the transaction amount (convert to number if it's a string)
        const amount = parseFloat(tx.amount?.value || 0);
        return sum + amount;
      }, 0);

      return totalPayments;
    };

    // Aggregate line items by category
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

    // Extract and aggregate line items from all billing statements
    billingStatementIds.forEach((statementId) => {
      const statement = billingStatements.get(statementId);
      if (!statement?.state?.global?.lineItems) return;

      const lineItems = statement.state.global.lineItems || [];

      lineItems.forEach((billingLineItem: BillingStatementLineItem) => {
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
            groupLabel: group?.label || "Uncategorized",
            budget: 0,
            actuals: billingLineItem.totalPriceCash || 0,
            forecast: 0,
            payments: 0,
          });
        }
      });
    });

    // Calculate payments from transactions for "Uncategorized" items
    if (accountTransactionsDocumentId && periodStart && periodEnd) {
      const transactionPayments = calculatePaymentsFromTransactions(
        accountTransactionsDocumentId,
        periodStart,
        periodEnd,
      );

      if (transactionPayments > 0) {
        // Add payments to "uncategorized" category
        const uncategorized = categoryAggregation.get("uncategorized");

        if (uncategorized) {
          // Update existing uncategorized category with payments
          uncategorized.payments = transactionPayments;
        } else {
          // Create new uncategorized category entry with payments
          categoryAggregation.set("uncategorized", {
            groupId: null,
            groupLabel: "Uncategorized",
            budget: 0,
            actuals: 0,
            forecast: 0,
            payments: transactionPayments,
          });
        }
      }
    }

    // Now add or update line items in wallet
    categoryAggregation.forEach((aggregatedItem) => {
      // Check if this line item already exists for this wallet
      const existingLineItem = existingLineItems.find(
        (item) => item.group === aggregatedItem.groupId,
      );

      if (existingLineItem && existingLineItem.id) {
        // Update existing line item
        dispatch(
          actions.updateLineItem({
            wallet: walletAddress,
            lineItemId: existingLineItem.id,
            actuals: aggregatedItem.actuals,
            payments: aggregatedItem.payments,
          }),
        );
      } else {
        // Add new line item
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
      }
    });
  };

  return { syncWallet };
}
