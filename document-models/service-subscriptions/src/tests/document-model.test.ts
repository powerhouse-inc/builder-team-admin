/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect } from "vitest";
import {
  utils,
  initialGlobalState,
  initialLocalState,
  serviceSubscriptionsDocumentType,
  isServiceSubscriptionsDocument,
  assertIsServiceSubscriptionsDocument,
  isServiceSubscriptionsState,
  assertIsServiceSubscriptionsState,
} from "@powerhousedao/builder-team-admin/document-models/service-subscriptions";
import { ZodError } from "zod";

describe("ServiceSubscriptions Document Model", () => {
  it("should create a new ServiceSubscriptions document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(serviceSubscriptionsDocumentType);
  });

  it("should create a new ServiceSubscriptions document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isServiceSubscriptionsDocument(document)).toBe(true);
    expect(isServiceSubscriptionsState(document.state)).toBe(true);
  });
  it("should reject a document that is not a ServiceSubscriptions document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsServiceSubscriptionsDocument(wrongDocumentType)).toThrow();
      expect(isServiceSubscriptionsDocument(wrongDocumentType)).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
  const wrongState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongState.state.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isServiceSubscriptionsState(wrongState.state)).toBe(false);
    expect(assertIsServiceSubscriptionsState(wrongState.state)).toThrow();
    expect(isServiceSubscriptionsDocument(wrongState)).toBe(false);
    expect(assertIsServiceSubscriptionsDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isServiceSubscriptionsState(wrongInitialState.state)).toBe(false);
    expect(
      assertIsServiceSubscriptionsState(wrongInitialState.state),
    ).toThrow();
    expect(isServiceSubscriptionsDocument(wrongInitialState)).toBe(false);
    expect(assertIsServiceSubscriptionsDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isServiceSubscriptionsDocument(missingIdInHeader)).toBe(false);
    expect(assertIsServiceSubscriptionsDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isServiceSubscriptionsDocument(missingNameInHeader)).toBe(false);
    expect(assertIsServiceSubscriptionsDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isServiceSubscriptionsDocument(missingCreatedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsServiceSubscriptionsDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(
      isServiceSubscriptionsDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toBe(false);
    expect(
      assertIsServiceSubscriptionsDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
