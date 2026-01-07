import { type SignalDispatch } from "document-model";
import {
  type AddSubscriptionAction,
  type UpdateSubscriptionAction,
  type UpdateSubscriptionStatusAction,
  type DeleteSubscriptionAction,
  type SetTotalSeatsAction,
  type AssignMemberAction,
  type UnassignMemberAction,
} from "./actions.js";
import { type ServiceSubscriptionsState } from "../types.js";

export interface ServiceSubscriptionsSubscriptionsOperations {
  addSubscriptionOperation: (
    state: ServiceSubscriptionsState,
    action: AddSubscriptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateSubscriptionOperation: (
    state: ServiceSubscriptionsState,
    action: UpdateSubscriptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateSubscriptionStatusOperation: (
    state: ServiceSubscriptionsState,
    action: UpdateSubscriptionStatusAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteSubscriptionOperation: (
    state: ServiceSubscriptionsState,
    action: DeleteSubscriptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  setTotalSeatsOperation: (
    state: ServiceSubscriptionsState,
    action: SetTotalSeatsAction,
    dispatch?: SignalDispatch,
  ) => void;
  assignMemberOperation: (
    state: ServiceSubscriptionsState,
    action: AssignMemberAction,
    dispatch?: SignalDispatch,
  ) => void;
  unassignMemberOperation: (
    state: ServiceSubscriptionsState,
    action: UnassignMemberAction,
    dispatch?: SignalDispatch,
  ) => void;
}
