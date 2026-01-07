import { createAction } from "document-model/core";
import {
  AddWalletInputSchema,
  RemoveWalletInputSchema,
  AddBillingStatementInputSchema,
  RemoveBillingStatementInputSchema,
  AddLineItemInputSchema,
  UpdateLineItemInputSchema,
  RemoveLineItemInputSchema,
  AddLineItemGroupInputSchema,
  UpdateLineItemGroupInputSchema,
  RemoveLineItemGroupInputSchema,
  SetGroupTotalsInputSchema,
  RemoveGroupTotalsInputSchema,
  SetPeriodStartInputSchema,
  SetPeriodEndInputSchema,
  UpdateWalletInputSchema,
} from "../schema/zod.js";
import type {
  AddWalletInput,
  RemoveWalletInput,
  AddBillingStatementInput,
  RemoveBillingStatementInput,
  AddLineItemInput,
  UpdateLineItemInput,
  RemoveLineItemInput,
  AddLineItemGroupInput,
  UpdateLineItemGroupInput,
  RemoveLineItemGroupInput,
  SetGroupTotalsInput,
  RemoveGroupTotalsInput,
  SetPeriodStartInput,
  SetPeriodEndInput,
  UpdateWalletInput,
} from "../types.js";
import type {
  AddWalletAction,
  RemoveWalletAction,
  AddBillingStatementAction,
  RemoveBillingStatementAction,
  AddLineItemAction,
  UpdateLineItemAction,
  RemoveLineItemAction,
  AddLineItemGroupAction,
  UpdateLineItemGroupAction,
  RemoveLineItemGroupAction,
  SetGroupTotalsAction,
  RemoveGroupTotalsAction,
  SetPeriodStartAction,
  SetPeriodEndAction,
  UpdateWalletAction,
} from "./actions.js";

export const addWallet = (input: AddWalletInput) =>
  createAction<AddWalletAction>(
    "ADD_WALLET",
    { ...input },
    undefined,
    AddWalletInputSchema,
    "global",
  );

export const removeWallet = (input: RemoveWalletInput) =>
  createAction<RemoveWalletAction>(
    "REMOVE_WALLET",
    { ...input },
    undefined,
    RemoveWalletInputSchema,
    "global",
  );

export const addBillingStatement = (input: AddBillingStatementInput) =>
  createAction<AddBillingStatementAction>(
    "ADD_BILLING_STATEMENT",
    { ...input },
    undefined,
    AddBillingStatementInputSchema,
    "global",
  );

export const removeBillingStatement = (input: RemoveBillingStatementInput) =>
  createAction<RemoveBillingStatementAction>(
    "REMOVE_BILLING_STATEMENT",
    { ...input },
    undefined,
    RemoveBillingStatementInputSchema,
    "global",
  );

export const addLineItem = (input: AddLineItemInput) =>
  createAction<AddLineItemAction>(
    "ADD_LINE_ITEM",
    { ...input },
    undefined,
    AddLineItemInputSchema,
    "global",
  );

export const updateLineItem = (input: UpdateLineItemInput) =>
  createAction<UpdateLineItemAction>(
    "UPDATE_LINE_ITEM",
    { ...input },
    undefined,
    UpdateLineItemInputSchema,
    "global",
  );

export const removeLineItem = (input: RemoveLineItemInput) =>
  createAction<RemoveLineItemAction>(
    "REMOVE_LINE_ITEM",
    { ...input },
    undefined,
    RemoveLineItemInputSchema,
    "global",
  );

export const addLineItemGroup = (input: AddLineItemGroupInput) =>
  createAction<AddLineItemGroupAction>(
    "ADD_LINE_ITEM_GROUP",
    { ...input },
    undefined,
    AddLineItemGroupInputSchema,
    "global",
  );

export const updateLineItemGroup = (input: UpdateLineItemGroupInput) =>
  createAction<UpdateLineItemGroupAction>(
    "UPDATE_LINE_ITEM_GROUP",
    { ...input },
    undefined,
    UpdateLineItemGroupInputSchema,
    "global",
  );

export const removeLineItemGroup = (input: RemoveLineItemGroupInput) =>
  createAction<RemoveLineItemGroupAction>(
    "REMOVE_LINE_ITEM_GROUP",
    { ...input },
    undefined,
    RemoveLineItemGroupInputSchema,
    "global",
  );

export const setGroupTotals = (input: SetGroupTotalsInput) =>
  createAction<SetGroupTotalsAction>(
    "SET_GROUP_TOTALS",
    { ...input },
    undefined,
    SetGroupTotalsInputSchema,
    "global",
  );

export const removeGroupTotals = (input: RemoveGroupTotalsInput) =>
  createAction<RemoveGroupTotalsAction>(
    "REMOVE_GROUP_TOTALS",
    { ...input },
    undefined,
    RemoveGroupTotalsInputSchema,
    "global",
  );

export const setPeriodStart = (input: SetPeriodStartInput) =>
  createAction<SetPeriodStartAction>(
    "SET_PERIOD_START",
    { ...input },
    undefined,
    SetPeriodStartInputSchema,
    "global",
  );

export const setPeriodEnd = (input: SetPeriodEndInput) =>
  createAction<SetPeriodEndAction>(
    "SET_PERIOD_END",
    { ...input },
    undefined,
    SetPeriodEndInputSchema,
    "global",
  );

export const updateWallet = (input: UpdateWalletInput) =>
  createAction<UpdateWalletAction>(
    "UPDATE_WALLET",
    { ...input },
    undefined,
    UpdateWalletInputSchema,
    "global",
  );
