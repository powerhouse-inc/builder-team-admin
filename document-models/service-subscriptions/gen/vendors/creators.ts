import { createAction } from "document-model/core";
import {
  AddVendorInputSchema,
  UpdateVendorInputSchema,
  DeleteVendorInputSchema,
} from "../schema/zod.js";
import type {
  AddVendorInput,
  UpdateVendorInput,
  DeleteVendorInput,
} from "../types.js";
import type {
  AddVendorAction,
  UpdateVendorAction,
  DeleteVendorAction,
} from "./actions.js";

export const addVendor = (input: AddVendorInput) =>
  createAction<AddVendorAction>(
    "ADD_VENDOR",
    { ...input },
    undefined,
    AddVendorInputSchema,
    "global",
  );

export const updateVendor = (input: UpdateVendorInput) =>
  createAction<UpdateVendorAction>(
    "UPDATE_VENDOR",
    { ...input },
    undefined,
    UpdateVendorInputSchema,
    "global",
  );

export const deleteVendor = (input: DeleteVendorInput) =>
  createAction<DeleteVendorAction>(
    "DELETE_VENDOR",
    { ...input },
    undefined,
    DeleteVendorInputSchema,
    "global",
  );
