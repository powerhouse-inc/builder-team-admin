import { type EditorModule } from "document-model";
import { lazy } from "react";

export const BuilderTeamAdmin: EditorModule = {
  Component: lazy(() => import("./editor.js")),
  documentTypes: ["powerhouse/document-drive"],
  config: {
    id: "builder-team-admin",
    name: "builder-team-admin",
  },
};
