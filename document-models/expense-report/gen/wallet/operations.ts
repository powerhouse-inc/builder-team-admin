import { type SignalDispatch } from "document-model";
import {
  type AddWalletAction,
  type RemoveWalletAction,
  type AddBillingStatementAction,
  type RemoveBillingStatementAction,
  type AddLineItemAction,
  type UpdateLineItemAction,
  type RemoveLineItemAction,
  type AddLineItemGroupAction,
  type UpdateLineItemGroupAction,
  type RemoveLineItemGroupAction,
  type SetGroupTotalsAction,
  type RemoveGroupTotalsAction,
  type SetPeriodStartAction,
  type SetPeriodEndAction,
  type UpdateWalletAction,
} from "./actions.js";
import { type ExpenseReportState } from "../types.js";

export interface ExpenseReportWalletOperations {
  addWalletOperation: (
    state: ExpenseReportState,
    action: AddWalletAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeWalletOperation: (
    state: ExpenseReportState,
    action: RemoveWalletAction,
    dispatch?: SignalDispatch,
  ) => void;
  addBillingStatementOperation: (
    state: ExpenseReportState,
    action: AddBillingStatementAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeBillingStatementOperation: (
    state: ExpenseReportState,
    action: RemoveBillingStatementAction,
    dispatch?: SignalDispatch,
  ) => void;
  addLineItemOperation: (
    state: ExpenseReportState,
    action: AddLineItemAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateLineItemOperation: (
    state: ExpenseReportState,
    action: UpdateLineItemAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeLineItemOperation: (
    state: ExpenseReportState,
    action: RemoveLineItemAction,
    dispatch?: SignalDispatch,
  ) => void;
  addLineItemGroupOperation: (
    state: ExpenseReportState,
    action: AddLineItemGroupAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateLineItemGroupOperation: (
    state: ExpenseReportState,
    action: UpdateLineItemGroupAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeLineItemGroupOperation: (
    state: ExpenseReportState,
    action: RemoveLineItemGroupAction,
    dispatch?: SignalDispatch,
  ) => void;
  setGroupTotalsOperation: (
    state: ExpenseReportState,
    action: SetGroupTotalsAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeGroupTotalsOperation: (
    state: ExpenseReportState,
    action: RemoveGroupTotalsAction,
    dispatch?: SignalDispatch,
  ) => void;
  setPeriodStartOperation: (
    state: ExpenseReportState,
    action: SetPeriodStartAction,
    dispatch?: SignalDispatch,
  ) => void;
  setPeriodEndOperation: (
    state: ExpenseReportState,
    action: SetPeriodEndAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateWalletOperation: (
    state: ExpenseReportState,
    action: UpdateWalletAction,
    dispatch?: SignalDispatch,
  ) => void;
}
