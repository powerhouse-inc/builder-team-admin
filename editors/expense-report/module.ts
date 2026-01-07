import type { EditorModule } from "document-model";
import { lazy } from "react";

export const ExpenseReport: EditorModule = {
  Component: lazy(() => import("./editor.js")),
  documentTypes: ["powerhouse/expense-report"],
  config: {
    id: "powerhouse-expense-report-editor",
    name: "Expense Report",
  },
};
