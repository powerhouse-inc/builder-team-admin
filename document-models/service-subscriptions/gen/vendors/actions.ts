import { type Action } from "document-model";
import type {
  AddVendorInput,
  UpdateVendorInput,
  DeleteVendorInput,
} from "../types.js";

export type AddVendorAction = Action & {
  type: "ADD_VENDOR";
  input: AddVendorInput;
};
export type UpdateVendorAction = Action & {
  type: "UPDATE_VENDOR";
  input: UpdateVendorInput;
};
export type DeleteVendorAction = Action & {
  type: "DELETE_VENDOR";
  input: DeleteVendorInput;
};

export type ServiceSubscriptionsVendorsAction =
  | AddVendorAction
  | UpdateVendorAction
  | DeleteVendorAction;
