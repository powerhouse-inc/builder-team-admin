import { createAction } from "document-model/core";
import {
  AddSubscriptionInputSchema,
  UpdateSubscriptionInputSchema,
  UpdateSubscriptionStatusInputSchema,
  DeleteSubscriptionInputSchema,
  SetTotalSeatsInputSchema,
  AssignMemberInputSchema,
  UnassignMemberInputSchema,
} from "../schema/zod.js";
import type {
  AddSubscriptionInput,
  UpdateSubscriptionInput,
  UpdateSubscriptionStatusInput,
  DeleteSubscriptionInput,
  SetTotalSeatsInput,
  AssignMemberInput,
  UnassignMemberInput,
} from "../types.js";
import type {
  AddSubscriptionAction,
  UpdateSubscriptionAction,
  UpdateSubscriptionStatusAction,
  DeleteSubscriptionAction,
  SetTotalSeatsAction,
  AssignMemberAction,
  UnassignMemberAction,
} from "./actions.js";

export const addSubscription = (input: AddSubscriptionInput) =>
  createAction<AddSubscriptionAction>(
    "ADD_SUBSCRIPTION",
    { ...input },
    undefined,
    AddSubscriptionInputSchema,
    "global",
  );

export const updateSubscription = (input: UpdateSubscriptionInput) =>
  createAction<UpdateSubscriptionAction>(
    "UPDATE_SUBSCRIPTION",
    { ...input },
    undefined,
    UpdateSubscriptionInputSchema,
    "global",
  );

export const updateSubscriptionStatus = (
  input: UpdateSubscriptionStatusInput,
) =>
  createAction<UpdateSubscriptionStatusAction>(
    "UPDATE_SUBSCRIPTION_STATUS",
    { ...input },
    undefined,
    UpdateSubscriptionStatusInputSchema,
    "global",
  );

export const deleteSubscription = (input: DeleteSubscriptionInput) =>
  createAction<DeleteSubscriptionAction>(
    "DELETE_SUBSCRIPTION",
    { ...input },
    undefined,
    DeleteSubscriptionInputSchema,
    "global",
  );

export const setTotalSeats = (input: SetTotalSeatsInput) =>
  createAction<SetTotalSeatsAction>(
    "SET_TOTAL_SEATS",
    { ...input },
    undefined,
    SetTotalSeatsInputSchema,
    "global",
  );

export const assignMember = (input: AssignMemberInput) =>
  createAction<AssignMemberAction>(
    "ASSIGN_MEMBER",
    { ...input },
    undefined,
    AssignMemberInputSchema,
    "global",
  );

export const unassignMember = (input: UnassignMemberInput) =>
  createAction<UnassignMemberAction>(
    "UNASSIGN_MEMBER",
    { ...input },
    undefined,
    UnassignMemberInputSchema,
    "global",
  );
