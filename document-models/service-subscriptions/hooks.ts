import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import {
  useDocumentsInSelectedDrive,
  useDocumentsInSelectedFolder,
  useDocumentById,
  useSelectedDocument,
} from "@powerhousedao/reactor-browser";
import type {
  ServiceSubscriptionsDocument,
  ServiceSubscriptionsAction,
} from "@powerhousedao/builder-team-admin/document-models/service-subscriptions";
import { isServiceSubscriptionsDocument } from "./gen/document-schema.js";

/** Hook to get a ServiceSubscriptions document by its id */
export function useServiceSubscriptionsDocumentById(
  documentId: string | null | undefined,
):
  | [ServiceSubscriptionsDocument, DocumentDispatch<ServiceSubscriptionsAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isServiceSubscriptionsDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected ServiceSubscriptions document */
export function useSelectedServiceSubscriptionsDocument():
  | [ServiceSubscriptionsDocument, DocumentDispatch<ServiceSubscriptionsAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useSelectedDocument();
  if (!isServiceSubscriptionsDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get all ServiceSubscriptions documents in the selected drive */
export function useServiceSubscriptionsDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isServiceSubscriptionsDocument);
}

/** Hook to get all ServiceSubscriptions documents in the selected folder */
export function useServiceSubscriptionsDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isServiceSubscriptionsDocument);
}
