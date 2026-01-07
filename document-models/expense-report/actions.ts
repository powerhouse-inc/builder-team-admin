import { baseActions } from "document-model";
import { walletActions } from "./gen/creators.js";

/** Actions for the ExpenseReport document model */
export const actions = { ...baseActions, ...walletActions };
