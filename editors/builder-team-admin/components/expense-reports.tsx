import { FileItem } from "@powerhousedao/design-system/connect";
import { FolderItem } from "@powerhousedao/design-system/connect";
import {
  isFolderNodeKind,
  isFileNodeKind,
  addFolder,
  useSelectedDrive,
  setSelectedNode,
  useSelectedNodePath,
  useNodesInSelectedDriveOrFolder,
  useSelectedDriveId,
  useUserPermissions,
  useDocumentsInSelectedDrive,
  useNodeActions,
} from "@powerhousedao/reactor-browser";
import { useMemo, useEffect, useRef, useState, Fragment } from "react";
import type { FolderNode, FileNode, Node } from "document-drive";
import type { ExpenseReportDocument } from "../../../document-models/expense-report/gen/types.js";
import { Plus } from "lucide-react";
import { ExpenseReportsStats } from "./ExpenseReportsStats.js";

const EXPENSE_REPORTS_FOLDER_NAME = "Expense Reports";

/**
 * Simple inline input for creating new folders.
 */
function FolderNameInput({
  onSubmit,
  onCancel,
}: {
  onSubmit: (name: string) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState("New Folder");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (value.trim()) {
        onSubmit(value.trim());
      }
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={() => {
        if (value.trim()) {
          onSubmit(value.trim());
        } else {
          onCancel();
        }
      }}
      className="text-gray-800 bg-transparent border-b border-gray-400 outline-none px-1 py-0.5 text-sm min-w-[100px]"
      placeholder="New Folder"
    />
  );
}

/**
 * Custom breadcrumbs component that treats "Expense Reports" folder as the root.
 * Only shows path from "Expense Reports" folder onwards.
 * Includes folder creation functionality.
 */
function ExpenseReportsBreadcrumbs({ rootFolderId }: { rootFolderId: string }) {
  const selectedNodePath = useSelectedNodePath();
  const selectedDriveId = useSelectedDriveId();
  const { isAllowedToCreateDocuments } = useUserPermissions();
  const [isCreating, setIsCreating] = useState(false);

  // Find the index of the root folder in the path
  const rootIndex = selectedNodePath.findIndex(
    (node) => node.id === rootFolderId,
  );

  // Get the path starting from (and including) the root folder
  const visiblePath =
    rootIndex >= 0 ? selectedNodePath.slice(rootIndex) : selectedNodePath;

  const handleAddNew = () => {
    setIsCreating(true);
  };

  const handleSubmit = (name: string) => {
    if (!isAllowedToCreateDocuments || !selectedDriveId) return;

    const parentFolderId = selectedNodePath.at(-1)?.id;
    addFolder(selectedDriveId, name, parentFolderId)
      .then((node) => {
        if (node) {
          setSelectedNode(node);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsCreating(false);
      });
  };

  const handleCancel = () => {
    setIsCreating(false);
  };

  return (
    <div className="flex h-9 flex-row items-center gap-2 text-gray-500 border-b border-gray-200 pb-3">
      {visiblePath.map((node) => (
        <Fragment key={node.id}>
          <div
            className="transition-colors last-of-type:text-gray-800 hover:text-gray-800 cursor-pointer"
            onClick={() => setSelectedNode(node.id)}
            role="button"
          >
            {node.name}
          </div>
          <span>/</span>
        </Fragment>
      ))}
      {isAllowedToCreateDocuments &&
        (isCreating ? (
          <FolderNameInput onSubmit={handleSubmit} onCancel={handleCancel} />
        ) : (
          <button
            type="button"
            className="ml-1 flex items-center justify-center gap-2 rounded-md bg-gray-50 px-2 py-1.5 transition-colors hover:bg-gray-200 hover:text-gray-800"
            onClick={handleAddNew}
          >
            <Plus size={14} />
            Add new
          </button>
        ))}
    </div>
  );
}

export function ExpenseReports() {
  const [driveDocument] = useSelectedDrive();
  const hasCreatedFolder = useRef(false);
  const hasNavigatedToFolder = useRef(false);
  const selectedNodePath = useSelectedNodePath();
  const nodesInCurrentFolder = useNodesInSelectedDriveOrFolder();
  const documentsInDrive = useDocumentsInSelectedDrive();

  // Find the "Expense Reports" folder in the drive
  const expenseReportsFolder = useMemo(() => {
    if (!driveDocument) return null;
    const nodes = driveDocument.state.global.nodes;
    return nodes.find(
      (node: Node): node is FolderNode =>
        isFolderNodeKind(node) && node.name === EXPENSE_REPORTS_FOLDER_NAME,
    );
  }, [driveDocument]);

  // Build a set of all node IDs within the Expense Reports folder tree
  const expenseReportsFolderNodeIds = useMemo(() => {
    const nodeIds = new Set<string>();
    if (!expenseReportsFolder || !driveDocument) return nodeIds;

    const allNodes = driveDocument.state.global.nodes;

    // Recursively collect all node IDs within the Expense Reports folder
    const collectNodeIds = (parentId: string) => {
      nodeIds.add(parentId);
      for (const node of allNodes) {
        if (isFolderNodeKind(node) && node.parentFolder === parentId) {
          collectNodeIds(node.id);
        } else if (isFileNodeKind(node) && node.parentFolder === parentId) {
          nodeIds.add(node.id);
        }
      }
    };

    collectNodeIds(expenseReportsFolder.id);
    return nodeIds;
  }, [expenseReportsFolder, driveDocument]);

  // Filter expense report documents that are inside the Expense Reports folder
  const expenseReportDocuments = useMemo(() => {
    if (!documentsInDrive || !driveDocument) return [];

    // Get file nodes for expense reports in the Expense Reports folder
    const expenseReportFileNodes = driveDocument.state.global.nodes.filter(
      (node): node is FileNode =>
        isFileNodeKind(node) &&
        node.documentType === "powerhouse/expense-report" &&
        expenseReportsFolderNodeIds.has(node.id),
    );

    // Map file node IDs to their documents
    const fileNodeIds = new Set(expenseReportFileNodes.map((n) => n.id));

    return documentsInDrive.filter(
      (doc): doc is ExpenseReportDocument =>
        doc.header.documentType === "powerhouse/expense-report" &&
        fileNodeIds.has(doc.header.id),
    );
  }, [documentsInDrive, driveDocument, expenseReportsFolderNodeIds]);

  // Create folder if it doesn't exist
  useEffect(() => {
    if (!driveDocument || expenseReportsFolder || hasCreatedFolder.current)
      return;

    hasCreatedFolder.current = true;
    const driveId = driveDocument.header.id;
    void addFolder(driveId, EXPENSE_REPORTS_FOLDER_NAME);
  }, [driveDocument, expenseReportsFolder]);

  // Navigate to the folder when it exists (only once on mount)
  useEffect(() => {
    if (expenseReportsFolder && !hasNavigatedToFolder.current) {
      hasNavigatedToFolder.current = true;
      setSelectedNode(expenseReportsFolder.id);
    }
  }, [expenseReportsFolder]);

  // Check if we're currently within the Expense Reports folder tree
  const isWithinExpenseReports = useMemo(() => {
    if (!expenseReportsFolder) return false;
    return selectedNodePath.some((node) => node.id === expenseReportsFolder.id);
  }, [selectedNodePath, expenseReportsFolder]);

  // If user navigated outside Expense Reports folder, bring them back
  useEffect(() => {
    if (
      expenseReportsFolder &&
      !isWithinExpenseReports &&
      hasNavigatedToFolder.current
    ) {
      setSelectedNode(expenseReportsFolder.id);
    }
  }, [expenseReportsFolder, isWithinExpenseReports]);

  // Track which documents have been processed for auto-placement
  const processedDocsRef = useRef<Set<string>>(new Set());

  // Get node actions for moving files
  const { onMoveNode } = useNodeActions();

  // Get year folders that exist directly under the Expense Reports folder
  const yearFolders = useMemo(() => {
    if (!driveDocument || !expenseReportsFolder)
      return new Map<string, FolderNode>();
    const folders = new Map<string, FolderNode>(); // year string -> folder node
    for (const node of driveDocument.state.global.nodes) {
      if (
        isFolderNodeKind(node) &&
        node.parentFolder === expenseReportsFolder.id &&
        /^\d{4}$/.test(node.name) // folder name is a 4-digit year
      ) {
        folders.set(node.name, node);
      }
    }
    return folders;
  }, [driveDocument, expenseReportsFolder]);

  // Auto-place expense reports into year folders based on periodStart
  useEffect(() => {
    if (!driveDocument || !expenseReportsFolder || !documentsInDrive) return;

    const driveId = driveDocument.header.id;
    const allNodes = driveDocument.state.global.nodes;

    // Find expense report file nodes that are directly in the Expense Reports root folder
    const expenseReportNodesInRoot = allNodes.filter(
      (node): node is FileNode =>
        isFileNodeKind(node) &&
        node.documentType === "powerhouse/expense-report" &&
        node.parentFolder === expenseReportsFolder.id,
    );

    // Process each expense report in the root folder
    for (const fileNode of expenseReportNodesInRoot) {
      // Skip if already processed
      if (processedDocsRef.current.has(fileNode.id)) continue;

      // Find the corresponding document to get periodStart
      const doc = documentsInDrive.find(
        (d): d is ExpenseReportDocument =>
          d.header.documentType === "powerhouse/expense-report" &&
          d.header.id === fileNode.id,
      );

      if (!doc) continue;

      const periodStart = doc.state.global.periodStart;
      if (!periodStart) {
        // No period defined - leave in root folder (this signals something is wrong)
        processedDocsRef.current.add(fileNode.id);
        continue;
      }

      // Extract year from periodStart
      const year = new Date(periodStart).getFullYear().toString();

      // Mark as processed immediately to prevent duplicate processing
      processedDocsRef.current.add(fileNode.id);

      // Check if year folder exists
      const existingYearFolder = yearFolders.get(year);

      if (existingYearFolder) {
        // Year folder exists - move the document there
        onMoveNode(fileNode, existingYearFolder).catch((error: unknown) => {
          console.error(
            `Failed to move expense report to ${year} folder:`,
            error,
          );
          // Remove from processed so it can be retried
          processedDocsRef.current.delete(fileNode.id);
        });
      } else {
        // Create year folder first, then move the document
        addFolder(driveId, year, expenseReportsFolder.id)
          .then((newFolder) => {
            if (newFolder) {
              // Move the document to the new year folder
              return onMoveNode(fileNode, newFolder);
            }
          })
          .catch((error: unknown) => {
            console.error(
              `Failed to create ${year} folder or move expense report:`,
              error,
            );
            // Remove from processed so it can be retried
            processedDocsRef.current.delete(fileNode.id);
          });
      }
    }
  }, [
    driveDocument,
    expenseReportsFolder,
    documentsInDrive,
    yearFolders,
    onMoveNode,
  ]);

  // Show loading state while folder is being created
  if (!expenseReportsFolder) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">
          Setting up Expense Reports folder...
        </div>
      </div>
    );
  }

  // Get folder and file nodes from current selection
  const folderNodes = nodesInCurrentFolder.filter((n) => isFolderNodeKind(n));
  const fileNodes = nodesInCurrentFolder.filter((n) => isFileNodeKind(n));
  const hasFolders = folderNodes.length > 0;
  const hasFiles = fileNodes.length > 0;
  const isEmpty = !hasFolders && !hasFiles;

  const hasExpenseReports = expenseReportDocuments.length > 0;

  return (
    <div>
      <div className="text-2xl font-bold text-center mb-4">Expense Reports</div>
      <div className="space-y-6 px-6">
        {/* Stats section - only shown when there are expense reports */}
        {hasExpenseReports && (
          <ExpenseReportsStats
            expenseReportDocuments={expenseReportDocuments}
          />
        )}

        <ExpenseReportsBreadcrumbs rootFolderId={expenseReportsFolder.id} />

        {hasFolders && (
          <div>
            <h3 className="mb-2 text-sm font-bold text-gray-600">Folders</h3>
            <div className="flex flex-wrap gap-4">
              {folderNodes.map((folderNode) => (
                <FolderItem
                  key={folderNode.id}
                  folderNode={folderNode as FolderNode}
                />
              ))}
            </div>
          </div>
        )}

        {hasFiles && (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-600">
              Documents
            </h3>
            <div className="flex flex-wrap gap-4">
              {fileNodes.map((fileNode) => (
                <FileItem key={fileNode.id} fileNode={fileNode} />
              ))}
            </div>
          </div>
        )}

        {isEmpty && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-gray-400 mb-2">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">
              No expense reports yet. Add documents to this folder to get
              started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
