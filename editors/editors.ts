import type { EditorModule } from "document-model";
import { ServiceSubscriptionsEditor } from "./service-subscriptions-editor/module.js";
import { BuilderTeamAdmin } from "./builder-team-admin/module.js";
import { ExpenseReport } from "./expense-report/module.js";

export const editors: EditorModule[] = [
  BuilderTeamAdmin,
  ServiceSubscriptionsEditor,
  ExpenseReport,
];
