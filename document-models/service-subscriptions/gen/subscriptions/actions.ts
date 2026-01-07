import { type Action } from "document-model";
import type {
  AddSubscriptionInput,
  UpdateSubscriptionInput,
  UpdateSubscriptionStatusInput,
  DeleteSubscriptionInput,
  SetTotalSeatsInput,
  AssignMemberInput,
  UnassignMemberInput,
} from "../types.js";

export type AddSubscriptionAction = Action & {
  type: "ADD_SUBSCRIPTION";
  input: AddSubscriptionInput;
};
export type UpdateSubscriptionAction = Action & {
  type: "UPDATE_SUBSCRIPTION";
  input: UpdateSubscriptionInput;
};
export type UpdateSubscriptionStatusAction = Action & {
  type: "UPDATE_SUBSCRIPTION_STATUS";
  input: UpdateSubscriptionStatusInput;
};
export type DeleteSubscriptionAction = Action & {
  type: "DELETE_SUBSCRIPTION";
  input: DeleteSubscriptionInput;
};
export type SetTotalSeatsAction = Action & {
  type: "SET_TOTAL_SEATS";
  input: SetTotalSeatsInput;
};
export type AssignMemberAction = Action & {
  type: "ASSIGN_MEMBER";
  input: AssignMemberInput;
};
export type UnassignMemberAction = Action & {
  type: "UNASSIGN_MEMBER";
  input: UnassignMemberInput;
};

export type ServiceSubscriptionsSubscriptionsAction =
  | AddSubscriptionAction
  | UpdateSubscriptionAction
  | UpdateSubscriptionStatusAction
  | DeleteSubscriptionAction
  | SetTotalSeatsAction
  | AssignMemberAction
  | UnassignMemberAction;
