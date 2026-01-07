import type { PHDocument, PHBaseState } from "document-model";
import type { ServiceSubscriptionsAction } from "./actions.js";
import type { ServiceSubscriptionsState as ServiceSubscriptionsGlobalState } from "./schema/types.js";

type ServiceSubscriptionsLocalState = Record<PropertyKey, never>;
type ServiceSubscriptionsPHState = PHBaseState & {
  global: ServiceSubscriptionsGlobalState;
  local: ServiceSubscriptionsLocalState;
};
type ServiceSubscriptionsDocument = PHDocument<ServiceSubscriptionsPHState>;

export * from "./schema/types.js";

export type {
  ServiceSubscriptionsGlobalState,
  ServiceSubscriptionsLocalState,
  ServiceSubscriptionsPHState,
  ServiceSubscriptionsAction,
  ServiceSubscriptionsDocument,
};
