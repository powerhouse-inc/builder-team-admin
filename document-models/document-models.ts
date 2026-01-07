import type { DocumentModelModule } from "document-model";
import { ServiceSubscriptions } from "./service-subscriptions/module.js";

export const documentModels: DocumentModelModule<any>[] = [
  ServiceSubscriptions,
];
