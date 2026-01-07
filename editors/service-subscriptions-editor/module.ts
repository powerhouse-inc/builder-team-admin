import type { EditorModule } from "document-model";
import { lazy } from "react";

/** Document editor module for the Todo List document type */
export const ServiceSubscriptionsEditor: EditorModule = {
  Component: lazy(() => import("./editor.js")),
  documentTypes: ["powerhouse/service-subscriptions"],
  config: {
    id: "service-subscriptions-editor",
    name: "ServiceSubscriptionsEditor",
  },
};
