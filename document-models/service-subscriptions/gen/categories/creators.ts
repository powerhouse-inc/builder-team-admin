import { createAction } from "document-model/core";
import {
  AddCategoryInputSchema,
  UpdateCategoryInputSchema,
  DeleteCategoryInputSchema,
} from "../schema/zod.js";
import type {
  AddCategoryInput,
  UpdateCategoryInput,
  DeleteCategoryInput,
} from "../types.js";
import type {
  AddCategoryAction,
  UpdateCategoryAction,
  DeleteCategoryAction,
} from "./actions.js";

export const addCategory = (input: AddCategoryInput) =>
  createAction<AddCategoryAction>(
    "ADD_CATEGORY",
    { ...input },
    undefined,
    AddCategoryInputSchema,
    "global",
  );

export const updateCategory = (input: UpdateCategoryInput) =>
  createAction<UpdateCategoryAction>(
    "UPDATE_CATEGORY",
    { ...input },
    undefined,
    UpdateCategoryInputSchema,
    "global",
  );

export const deleteCategory = (input: DeleteCategoryInput) =>
  createAction<DeleteCategoryAction>(
    "DELETE_CATEGORY",
    { ...input },
    undefined,
    DeleteCategoryInputSchema,
    "global",
  );
