// TODO: remove eslint-disable rules once refactor is done
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { StateReducer } from "document-model";
import { isDocumentAction, createReducer } from "document-model/core";
import type { ExpenseReportPHState } from "@powerhousedao/builder-team-admin/document-models/expense-report";

import { expenseReportWalletOperations } from "../src/reducers/wallet.js";

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
} from "./schema/zod.js";

const stateReducer: StateReducer<ExpenseReportPHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }

  switch (action.type) {
    case "ADD_WALLET":
      AddWalletInputSchema().parse(action.input);
      expenseReportWalletOperations.addWalletOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_WALLET":
      RemoveWalletInputSchema().parse(action.input);
      expenseReportWalletOperations.removeWalletOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_BILLING_STATEMENT":
      AddBillingStatementInputSchema().parse(action.input);
      expenseReportWalletOperations.addBillingStatementOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_BILLING_STATEMENT":
      RemoveBillingStatementInputSchema().parse(action.input);
      expenseReportWalletOperations.removeBillingStatementOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_LINE_ITEM":
      AddLineItemInputSchema().parse(action.input);
      expenseReportWalletOperations.addLineItemOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_LINE_ITEM":
      UpdateLineItemInputSchema().parse(action.input);
      expenseReportWalletOperations.updateLineItemOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_LINE_ITEM":
      RemoveLineItemInputSchema().parse(action.input);
      expenseReportWalletOperations.removeLineItemOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_LINE_ITEM_GROUP":
      AddLineItemGroupInputSchema().parse(action.input);
      expenseReportWalletOperations.addLineItemGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_LINE_ITEM_GROUP":
      UpdateLineItemGroupInputSchema().parse(action.input);
      expenseReportWalletOperations.updateLineItemGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_LINE_ITEM_GROUP":
      RemoveLineItemGroupInputSchema().parse(action.input);
      expenseReportWalletOperations.removeLineItemGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_GROUP_TOTALS":
      SetGroupTotalsInputSchema().parse(action.input);
      expenseReportWalletOperations.setGroupTotalsOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_GROUP_TOTALS":
      RemoveGroupTotalsInputSchema().parse(action.input);
      expenseReportWalletOperations.removeGroupTotalsOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_PERIOD_START":
      SetPeriodStartInputSchema().parse(action.input);
      expenseReportWalletOperations.setPeriodStartOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_PERIOD_END":
      SetPeriodEndInputSchema().parse(action.input);
      expenseReportWalletOperations.setPeriodEndOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_WALLET":
      UpdateWalletInputSchema().parse(action.input);
      expenseReportWalletOperations.updateWalletOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    default:
      return state;
  }
};

export const reducer = createReducer<ExpenseReportPHState>(stateReducer);
