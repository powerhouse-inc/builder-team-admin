import type { DocumentModelModule } from "document-model";
import { createState } from "document-model";
import { defaultBaseState } from "document-model/core";
import type { ExpenseReportPHState } from "./gen/index.js";
import { documentModel, reducer } from "./gen/index.js";
import { actions } from "./actions.js";
import { utils } from "./utils.js";

/** Document model module for the Expense Report document type */
export const ExpenseReport: DocumentModelModule<ExpenseReportPHState> = {
  reducer,
  actions,
  utils,
  documentModel: createState(defaultBaseState(), documentModel),
};
