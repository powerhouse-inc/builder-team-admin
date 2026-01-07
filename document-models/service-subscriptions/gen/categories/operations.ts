import { type SignalDispatch } from "document-model";
import {
  type AddCategoryAction,
  type UpdateCategoryAction,
  type DeleteCategoryAction,
} from "./actions.js";
import { type ServiceSubscriptionsState } from "../types.js";

export interface ServiceSubscriptionsCategoriesOperations {
  addCategoryOperation: (
    state: ServiceSubscriptionsState,
    action: AddCategoryAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateCategoryOperation: (
    state: ServiceSubscriptionsState,
    action: UpdateCategoryAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteCategoryOperation: (
    state: ServiceSubscriptionsState,
    action: DeleteCategoryAction,
    dispatch?: SignalDispatch,
  ) => void;
}
