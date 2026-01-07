/**
 * Factory methods for creating ServiceSubscriptionsDocument instances
 */
import type { PHAuthState, PHDocumentState, PHBaseState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model/core";
import type {
  ServiceSubscriptionsDocument,
  ServiceSubscriptionsLocalState,
  ServiceSubscriptionsGlobalState,
  ServiceSubscriptionsPHState,
} from "./types.js";
import { createDocument } from "./utils.js";

export function defaultGlobalState(): ServiceSubscriptionsGlobalState {
  return { subscriptions: [], vendors: [], categories: [] };
}

export function defaultLocalState(): ServiceSubscriptionsLocalState {
  return {};
}

export function defaultPHState(): ServiceSubscriptionsPHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<ServiceSubscriptionsGlobalState>,
): ServiceSubscriptionsGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  } as ServiceSubscriptionsGlobalState;
}

export function createLocalState(
  state?: Partial<ServiceSubscriptionsLocalState>,
): ServiceSubscriptionsLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as ServiceSubscriptionsLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<ServiceSubscriptionsGlobalState>,
  localState?: Partial<ServiceSubscriptionsLocalState>,
): ServiceSubscriptionsPHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a ServiceSubscriptionsDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createServiceSubscriptionsDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<ServiceSubscriptionsGlobalState>;
    local?: Partial<ServiceSubscriptionsLocalState>;
  }>,
): ServiceSubscriptionsDocument {
  const document = createDocument(
    state
      ? createState(
          createBaseState(state.auth, state.document),
          state.global,
          state.local,
        )
      : undefined,
  );

  return document;
}
