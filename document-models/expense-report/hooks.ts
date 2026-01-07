import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import {
  useDocumentsInSelectedDrive,
  useDocumentsInSelectedFolder,
  useDocumentById,
  useSelectedDocument,
} from "@powerhousedao/reactor-browser";
import type {
  ExpenseReportDocument,
  ExpenseReportAction,
} from "@powerhousedao/builder-team-admin/document-models/expense-report";
import { isExpenseReportDocument } from "./gen/document-schema.js";

/** Hook to get a ExpenseReport document by its id */
export function useExpenseReportDocumentById(
  documentId: string | null | undefined,
):
  | [ExpenseReportDocument, DocumentDispatch<ExpenseReportAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isExpenseReportDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected ExpenseReport document */
export function useSelectedExpenseReportDocument():
  | [ExpenseReportDocument, DocumentDispatch<ExpenseReportAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useSelectedDocument();
  if (!isExpenseReportDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get all ExpenseReport documents in the selected drive */
export function useExpenseReportDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isExpenseReportDocument);
}

/** Hook to get all ExpenseReport documents in the selected folder */
export function useExpenseReportDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isExpenseReportDocument);
}
