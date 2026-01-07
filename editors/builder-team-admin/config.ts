import type { PHDriveEditorConfig } from "@powerhousedao/reactor-browser";

/** Editor config for the BuilderTeamAdmin */
export const editorConfig: PHDriveEditorConfig = {
  isDragAndDropEnabled: true,
  allowedDocumentTypes: [
    "powerhouse/service-subscriptions",
    "powerhouse/builders",
    "powerhouse/builder-profile",
  ],
};
