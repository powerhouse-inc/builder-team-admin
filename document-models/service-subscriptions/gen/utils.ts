import type { DocumentModelUtils } from "document-model";
import {
  baseCreateDocument,
  baseSaveToFileHandle,
  baseLoadFromInput,
  defaultBaseState,
  generateId,
} from "document-model/core";
import type {
  ServiceSubscriptionsGlobalState,
  ServiceSubscriptionsLocalState,
} from "./types.js";
import type { ServiceSubscriptionsPHState } from "./types.js";
import { reducer } from "./reducer.js";
import { serviceSubscriptionsDocumentType } from "./document-type.js";
import {
  isServiceSubscriptionsDocument,
  assertIsServiceSubscriptionsDocument,
  isServiceSubscriptionsState,
  assertIsServiceSubscriptionsState,
} from "./document-schema.js";

export const initialGlobalState: ServiceSubscriptionsGlobalState = {
  subscriptions: [],
  vendors: [],
  categories: [],
};
export const initialLocalState: ServiceSubscriptionsLocalState = {};

export const utils: DocumentModelUtils<ServiceSubscriptionsPHState> = {
  fileExtension: "phss",
  createState(state) {
    return {
      ...defaultBaseState(),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    const document = baseCreateDocument(utils.createState, state);

    document.header.documentType = serviceSubscriptionsDocumentType;

    // for backwards compatibility, but this is NOT a valid signed document id
    document.header.id = generateId();

    return document;
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInput(input, reducer);
  },
  isStateOfType(state) {
    return isServiceSubscriptionsState(state);
  },
  assertIsStateOfType(state) {
    return assertIsServiceSubscriptionsState(state);
  },
  isDocumentOfType(document) {
    return isServiceSubscriptionsDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsServiceSubscriptionsDocument(document);
  },
};

export const createDocument = utils.createDocument;
export const createState = utils.createState;
export const saveToFileHandle = utils.saveToFileHandle;
export const loadFromInput = utils.loadFromInput;
export const isStateOfType = utils.isStateOfType;
export const assertIsStateOfType = utils.assertIsStateOfType;
export const isDocumentOfType = utils.isDocumentOfType;
export const assertIsDocumentOfType = utils.assertIsDocumentOfType;
