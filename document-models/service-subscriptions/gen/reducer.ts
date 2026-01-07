// TODO: remove eslint-disable rules once refactor is done
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { StateReducer } from "document-model";
import { isDocumentAction, createReducer } from "document-model/core";
import type { ServiceSubscriptionsPHState } from "@powerhousedao/builder-team-admin/document-models/service-subscriptions";

import { serviceSubscriptionsVendorsOperations } from "../src/reducers/vendors.js";
import { serviceSubscriptionsCategoriesOperations } from "../src/reducers/categories.js";
import { serviceSubscriptionsSubscriptionsOperations } from "../src/reducers/subscriptions.js";

import {
  AddVendorInputSchema,
  UpdateVendorInputSchema,
  DeleteVendorInputSchema,
  AddCategoryInputSchema,
  UpdateCategoryInputSchema,
  DeleteCategoryInputSchema,
  AddSubscriptionInputSchema,
  UpdateSubscriptionInputSchema,
  UpdateSubscriptionStatusInputSchema,
  DeleteSubscriptionInputSchema,
  SetTotalSeatsInputSchema,
  AssignMemberInputSchema,
  UnassignMemberInputSchema,
} from "./schema/zod.js";

const stateReducer: StateReducer<ServiceSubscriptionsPHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }

  switch (action.type) {
    case "ADD_VENDOR":
      AddVendorInputSchema().parse(action.input);
      serviceSubscriptionsVendorsOperations.addVendorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_VENDOR":
      UpdateVendorInputSchema().parse(action.input);
      serviceSubscriptionsVendorsOperations.updateVendorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "DELETE_VENDOR":
      DeleteVendorInputSchema().parse(action.input);
      serviceSubscriptionsVendorsOperations.deleteVendorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_CATEGORY":
      AddCategoryInputSchema().parse(action.input);
      serviceSubscriptionsCategoriesOperations.addCategoryOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_CATEGORY":
      UpdateCategoryInputSchema().parse(action.input);
      serviceSubscriptionsCategoriesOperations.updateCategoryOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "DELETE_CATEGORY":
      DeleteCategoryInputSchema().parse(action.input);
      serviceSubscriptionsCategoriesOperations.deleteCategoryOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_SUBSCRIPTION":
      AddSubscriptionInputSchema().parse(action.input);
      serviceSubscriptionsSubscriptionsOperations.addSubscriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_SUBSCRIPTION":
      UpdateSubscriptionInputSchema().parse(action.input);
      serviceSubscriptionsSubscriptionsOperations.updateSubscriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_SUBSCRIPTION_STATUS":
      UpdateSubscriptionStatusInputSchema().parse(action.input);
      serviceSubscriptionsSubscriptionsOperations.updateSubscriptionStatusOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "DELETE_SUBSCRIPTION":
      DeleteSubscriptionInputSchema().parse(action.input);
      serviceSubscriptionsSubscriptionsOperations.deleteSubscriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_TOTAL_SEATS":
      SetTotalSeatsInputSchema().parse(action.input);
      serviceSubscriptionsSubscriptionsOperations.setTotalSeatsOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ASSIGN_MEMBER":
      AssignMemberInputSchema().parse(action.input);
      serviceSubscriptionsSubscriptionsOperations.assignMemberOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UNASSIGN_MEMBER":
      UnassignMemberInputSchema().parse(action.input);
      serviceSubscriptionsSubscriptionsOperations.unassignMemberOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    default:
      return state;
  }
};

export const reducer = createReducer<ServiceSubscriptionsPHState>(stateReducer);
