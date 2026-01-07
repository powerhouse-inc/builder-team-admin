import {
  Sidebar,
  SidebarProvider,
  type SidebarNode,
} from "@powerhousedao/document-engineering";
import {
  setSelectedNode,
  showCreateDocumentModal,
  useDocumentsInSelectedDrive,
  useSelectedDrive,
  isFolderNodeKind,
  isFileNodeKind,
} from "@powerhousedao/reactor-browser";
import type { Node, FolderNode, FileNode } from "document-drive";
import { CreditCard, FileText, User, Users, Folder } from "lucide-react";
import { useMemo, useState } from "react";

const ICON_SIZE = 16;
const EXPENSE_REPORTS_FOLDER_NAME = "Expense Reports";

/** Custom view types that don't correspond to document models */
export type CustomView = "team-members" | "expense-reports" | null;

/**
 * Maps navigation section IDs to their corresponding document types.
 * When a section is clicked, the corresponding document type will be created or navigated to.
 * A null value indicates the section uses a custom view instead.
 */
const SECTION_TO_DOCUMENT_TYPE: Record<string, string | null> = {
  "builder-profile": "powerhouse/builder-profile",
  "team-members": null, // Uses custom TeamMembers component
  "service-subscriptions": "powerhouse/service-subscriptions",
  "expense-reports": null, // Uses custom ExpenseReports component
};

/**
 * Maps navigation section IDs to custom view identifiers.
 */
const SECTION_TO_CUSTOM_VIEW: Record<string, CustomView> = {
  "team-members": "team-members",
  "expense-reports": "expense-reports",
};

/**
 * Base navigation sections for the Builder Team Admin drive.
 * The expense-reports section will have dynamic children added based on folder contents.
 */
const BASE_NAVIGATION_SECTIONS: SidebarNode[] = [
  {
    id: "builder-profile",
    title: "Builder Profile",
    icon: <User size={ICON_SIZE} />,
  },
  {
    id: "team-members",
    title: "Team Members",
    icon: <Users size={ICON_SIZE} />,
  },
  {
    id: "service-subscriptions",
    title: "Service Subscriptions",
    icon: <CreditCard size={ICON_SIZE} />,
  },
  {
    id: "expense-reports",
    title: "Expense Reports",
    icon: <FileText size={ICON_SIZE} />,
  },
];

/**
 * Recursively builds SidebarNode children from folder contents.
 * Folders get folder icons, files get document icons.
 */
function buildSidebarNodesFromFolder(
  parentId: string,
  allNodes: Node[],
): SidebarNode[] {
  // Find all nodes that are direct children of the parent folder
  const childNodes = allNodes.filter((node) => {
    if (isFolderNodeKind(node)) {
      return (node as FolderNode).parentFolder === parentId;
    }
    if (isFileNodeKind(node)) {
      return (node as FileNode).parentFolder === parentId;
    }
    return false;
  });

  return childNodes.map((node) => {
    const isFolder = isFolderNodeKind(node);
    const sidebarNode: SidebarNode = {
      id: node.id,
      title: node.name,
      icon: isFolder ? (
        <Folder size={ICON_SIZE} />
      ) : (
        <FileText size={ICON_SIZE} />
      ),
    };

    // Recursively add children for folders
    if (isFolder) {
      const children = buildSidebarNodesFromFolder(node.id, allNodes);
      if (children.length > 0) {
        sidebarNode.children = children;
      }
    }

    return sidebarNode;
  });
}

type FolderTreeProps = {
  onCustomViewChange?: (view: CustomView) => void;
};

/**
 * Sidebar navigation component with hardcoded navigation sections.
 * Displays Builder Profile, Team Members, Service Subscriptions, and Expense Reports.
 * Clicking a section navigates to an existing document or creates one if none exists.
 * The Expense Reports section dynamically shows folder contents as child nodes.
 */
export function FolderTree({ onCustomViewChange }: FolderTreeProps) {
  const [activeNodeId, setActiveNodeId] = useState<string>(
    BASE_NAVIGATION_SECTIONS[0].id,
  );

  const documentsInDrive = useDocumentsInSelectedDrive();
  const [driveDocument] = useSelectedDrive();

  // Find the "Expense Reports" folder in the drive
  const expenseReportsFolder = useMemo(() => {
    if (!driveDocument) return null;
    const nodes = driveDocument.state.global.nodes;
    return nodes.find(
      (node: Node): node is FolderNode =>
        isFolderNodeKind(node) && node.name === EXPENSE_REPORTS_FOLDER_NAME,
    );
  }, [driveDocument]);

  // Build a set of all node IDs that are within the Expense Reports folder tree
  const expenseReportsNodeIds = useMemo(() => {
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

  // Build navigation sections with dynamic expense reports children
  const navigationSections = useMemo(() => {
    if (!expenseReportsFolder || !driveDocument) {
      return BASE_NAVIGATION_SECTIONS;
    }

    const allNodes = driveDocument.state.global.nodes;
    const expenseReportsChildren = buildSidebarNodesFromFolder(
      expenseReportsFolder.id,
      allNodes,
    );

    // Replace the expense-reports section with one that has children
    return BASE_NAVIGATION_SECTIONS.map((section) => {
      if (
        section.id === "expense-reports" &&
        expenseReportsChildren.length > 0
      ) {
        return {
          ...section,
          children: expenseReportsChildren,
        };
      }
      return section;
    });
  }, [expenseReportsFolder, driveDocument]);

  // Check if builder profile document exists - don't show sidebar if it doesn't
  const hasBuilderProfile = useMemo(() => {
    if (!documentsInDrive) return false;
    return documentsInDrive.some(
      (doc) => doc.header.documentType === "powerhouse/builder-profile",
    );
  }, [documentsInDrive]);

  // Create a map of document type to existing document (first one found)
  const existingDocumentsByType = useMemo(() => {
    const map: Record<string, string | undefined> = {};
    if (!documentsInDrive) return map;

    for (const doc of documentsInDrive) {
      const docType = doc.header.documentType;
      // Only store the first document of each type (singleton pattern)
      if (!map[docType]) {
        map[docType] = doc.header.id;
      }
    }
    return map;
  }, [documentsInDrive]);

  // Don't render if no builder profile exists
  if (!hasBuilderProfile) {
    return null;
  }

  const handleActiveNodeChange = (node: SidebarNode) => {
    setActiveNodeId(node.id);

    // Check if this is a child node within the Expense Reports folder
    if (expenseReportsNodeIds.has(node.id)) {
      // Check if it's a folder or a document
      const driveNode = driveDocument?.state.global.nodes.find(
        (n: Node) => n.id === node.id,
      );

      if (driveNode && isFolderNodeKind(driveNode)) {
        // It's a folder - navigate to it within the expense reports view
        onCustomViewChange?.("expense-reports");
        setSelectedNode(node.id);
      } else if (driveNode && isFileNodeKind(driveNode)) {
        // It's a document - open the document editor
        onCustomViewChange?.(null);
        setSelectedNode(node.id);
      }
      return;
    }

    // Check if this section has a custom view
    const customView = SECTION_TO_CUSTOM_VIEW[node.id];
    if (customView) {
      onCustomViewChange?.(customView);
      setSelectedNode(""); // Deselect any document so custom view can render
      return;
    }

    // Clear custom view when navigating to a document
    onCustomViewChange?.(null);

    const documentType = SECTION_TO_DOCUMENT_TYPE[node.id];
    if (!documentType) return;

    const existingDocId = existingDocumentsByType[documentType];
    if (existingDocId) {
      // Navigate to the existing document
      setSelectedNode(existingDocId);
    } else {
      // Create a new document
      showCreateDocumentModal(documentType);
    }
  };

  return (
    <SidebarProvider nodes={navigationSections}>
      <Sidebar
        className="pt-1"
        nodes={navigationSections}
        activeNodeId={activeNodeId}
        onActiveNodeChange={handleActiveNodeChange}
        sidebarTitle="Builder Team Admin"
        showSearchBar={false}
        resizable={true}
        allowPinning={false}
        showStatusFilter={false}
        initialWidth={256}
        defaultLevel={2}
        handleOnTitleClick={() => {
          onCustomViewChange?.(null);
          setSelectedNode("");
        }}
      />
    </SidebarProvider>
  );
}
