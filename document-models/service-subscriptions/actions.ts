import { baseActions } from "document-model";
import {
  vendorsActions,
  categoriesActions,
  subscriptionsActions,
} from "./gen/creators.js";

/** Actions for the ServiceSubscriptions document model */
export const actions = {
  ...baseActions,
  ...vendorsActions,
  ...categoriesActions,
  ...subscriptionsActions,
};
