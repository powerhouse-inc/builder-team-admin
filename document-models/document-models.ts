import type { DocumentModelModule } from "document-model";
import { ServiceSubscriptions } from "./service-subscriptions/module.js";
import { ExpenseReport } from "./expense-report/module.js";

export const documentModels: DocumentModelModule<any>[] = [
  ExpenseReport,
  ServiceSubscriptions,
];
