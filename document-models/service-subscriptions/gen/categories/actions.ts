import { type Action } from "document-model";
import type {
  AddCategoryInput,
  UpdateCategoryInput,
  DeleteCategoryInput,
} from "../types.js";

export type AddCategoryAction = Action & {
  type: "ADD_CATEGORY";
  input: AddCategoryInput;
};
export type UpdateCategoryAction = Action & {
  type: "UPDATE_CATEGORY";
  input: UpdateCategoryInput;
};
export type DeleteCategoryAction = Action & {
  type: "DELETE_CATEGORY";
  input: DeleteCategoryInput;
};

export type ServiceSubscriptionsCategoriesAction =
  | AddCategoryAction
  | UpdateCategoryAction
  | DeleteCategoryAction;
