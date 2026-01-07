import {
  Sidebar,
  SidebarProvider,
  type SidebarNode,
} from "@powerhousedao/document-engineering";
import {
  setSelectedNode,
  showCreateDocumentModal,
  useDocumentsInSelectedDrive,
} from "@powerhousedao/reactor-browser";
import { CreditCard, FileText, User, Users } from "lucide-react";
import { useMemo, useState } from "react";

const ICON_SIZE = 16;

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
 * Navigation sections for the Builder Team Admin drive.
 * Each section maps to a document type (or placeholder for future implementation).
 */
const NAVIGATION_SECTIONS: SidebarNode[] = [
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

type FolderTreeProps = {
  onCustomViewChange?: (view: CustomView) => void;
};

/**
 * Sidebar navigation component with hardcoded navigation sections.
 * Displays Builder Profile, Team Members, Service Subscriptions, and Expense Reports.
 * Clicking a section navigates to an existing document or creates one if none exists.
 */
export function FolderTree({ onCustomViewChange }: FolderTreeProps) {
  const [activeNodeId, setActiveNodeId] = useState<string>(
    NAVIGATION_SECTIONS[0].id,
  );

  const documentsInDrive = useDocumentsInSelectedDrive();

  // Check if builder profile document exists - don't show sidebar if it doesn't
  const hasBuilderProfile = useMemo(() => {
    if (!documentsInDrive) return false;
    return documentsInDrive.some(
      (doc) => doc.header.documentType === "powerhouse/builder-profile",
    );
  }, [documentsInDrive]);

  // Don't render if no builder profile exists
  if (!hasBuilderProfile) {
    return null;
  }

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

  const handleActiveNodeChange = (node: SidebarNode) => {
    setActiveNodeId(node.id);

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
    <SidebarProvider nodes={NAVIGATION_SECTIONS}>
      <Sidebar
        className="pt-1"
        nodes={NAVIGATION_SECTIONS}
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
