/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import {
  reducer,
  utils,
  isServiceSubscriptionsDocument,
  addSubscription,
  AddSubscriptionInputSchema,
  updateSubscription,
  UpdateSubscriptionInputSchema,
  updateSubscriptionStatus,
  UpdateSubscriptionStatusInputSchema,
  deleteSubscription,
  DeleteSubscriptionInputSchema,
  setTotalSeats,
  SetTotalSeatsInputSchema,
  assignMember,
  AssignMemberInputSchema,
  unassignMember,
  UnassignMemberInputSchema,
} from "@powerhousedao/builder-team-admin/document-models/service-subscriptions";

describe("Subscriptions Operations", () => {
  it("should handle addSubscription operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddSubscriptionInputSchema());

    const updatedDocument = reducer(document, addSubscription(input));

    expect(isServiceSubscriptionsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_SUBSCRIPTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle updateSubscription operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateSubscriptionInputSchema());

    const updatedDocument = reducer(document, updateSubscription(input));

    expect(isServiceSubscriptionsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_SUBSCRIPTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle updateSubscriptionStatus operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateSubscriptionStatusInputSchema());

    const updatedDocument = reducer(document, updateSubscriptionStatus(input));

    expect(isServiceSubscriptionsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_SUBSCRIPTION_STATUS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle deleteSubscription operation", () => {
    const document = utils.createDocument();
    const input = generateMock(DeleteSubscriptionInputSchema());

    const updatedDocument = reducer(document, deleteSubscription(input));

    expect(isServiceSubscriptionsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_SUBSCRIPTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setTotalSeats operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetTotalSeatsInputSchema());

    const updatedDocument = reducer(document, setTotalSeats(input));

    expect(isServiceSubscriptionsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_TOTAL_SEATS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle assignMember operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AssignMemberInputSchema());

    const updatedDocument = reducer(document, assignMember(input));

    expect(isServiceSubscriptionsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ASSIGN_MEMBER",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle unassignMember operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UnassignMemberInputSchema());

    const updatedDocument = reducer(document, unassignMember(input));

    expect(isServiceSubscriptionsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UNASSIGN_MEMBER",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
