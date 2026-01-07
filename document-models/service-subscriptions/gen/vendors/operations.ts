import { type SignalDispatch } from "document-model";
import {
  type AddVendorAction,
  type UpdateVendorAction,
  type DeleteVendorAction,
} from "./actions.js";
import { type ServiceSubscriptionsState } from "../types.js";

export interface ServiceSubscriptionsVendorsOperations {
  addVendorOperation: (
    state: ServiceSubscriptionsState,
    action: AddVendorAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateVendorOperation: (
    state: ServiceSubscriptionsState,
    action: UpdateVendorAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteVendorOperation: (
    state: ServiceSubscriptionsState,
    action: DeleteVendorAction,
    dispatch?: SignalDispatch,
  ) => void;
}
