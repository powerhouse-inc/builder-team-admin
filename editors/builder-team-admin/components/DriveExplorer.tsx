import type { EditorProps } from "document-model";
import { FolderTree, type CustomView } from "./FolderTree.js";
import { DriveContents } from "./DriveContents.js";
import { ContributorsSection } from "./team-members.js";
import {
  useDocumentsInSelectedDrive,
  showCreateDocumentModal,
} from "@powerhousedao/reactor-browser";
import { useMemo, useState } from "react";
import { ExpenseReports } from "./expense-reports.js";

/**
 * Main drive explorer component with sidebar navigation and content area.
 * Layout: Left sidebar (folder tree) + Right content area (files/folders + document editor)
 */
export function DriveExplorer({ children }: EditorProps) {
  // if a document is selected then it's editor will be passed as children
  const showDocumentEditor = !!children;
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  const [customView, setCustomView] = useState<CustomView>(null);

  // Check if builder profile document exists
  const hasBuilderProfile = useMemo(() => {
    if (!documentsInSelectedDrive) return false;
    return documentsInSelectedDrive.some(
      (doc) => doc.header.documentType === "powerhouse/builder-profile",
    );
  }, [documentsInSelectedDrive]);

  // If no builder profile exists, show only the intro dialog
  if (!hasBuilderProfile) {
    return (
      <div className="flex h-full items-center justify-center px-4 py-12">
        <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200/50 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 p-12 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
          {/* Decorative background elements */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-400/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-gradient-to-br from-indigo-300/20 to-purple-300/20 blur-2xl" />

          {/* Content */}
          <div className="relative z-10 text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-3 shadow-lg shadow-blue-500/30">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>

            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">
              Create your Builder Team Profile
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-slate-600">
              Get started by creating your builder profile to manage your team,
              services, and build your presence in the Achra ecosystem.
            </p>

            <button
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 active:scale-100"
              onClick={() =>
                showCreateDocumentModal("powerhouse/builder-profile")
              }
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Create Builder Profile</span>
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render the appropriate content based on state
  const renderContent = () => {
    // Document editor takes priority
    if (showDocumentEditor) {
      return children;
    }

    // Custom views
    if (customView === "team-members") {
      return <ContributorsSection />;
    }

    if (customView === "expense-reports") {
      return <ExpenseReports />;
    }

    // Default: folder contents
    return <DriveContents />;
  };

  // Normal layout when builder profile exists
  return (
    <div className="flex h-full">
      <FolderTree onCustomViewChange={setCustomView} />
      <div className="flex-1 overflow-y-auto p-4">{renderContent()}</div>
    </div>
  );
}
