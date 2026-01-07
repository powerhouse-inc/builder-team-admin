import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { serviceSubscriptionsDocumentType } from "./document-type.js";
import { ServiceSubscriptionsStateSchema } from "./schema/zod.js";
import type {
  ServiceSubscriptionsDocument,
  ServiceSubscriptionsPHState,
} from "./types.js";

/** Schema for validating the header object of a ServiceSubscriptions document */
export const ServiceSubscriptionsDocumentHeaderSchema =
  BaseDocumentHeaderSchema.extend({
    documentType: z.literal(serviceSubscriptionsDocumentType),
  });

/** Schema for validating the state object of a ServiceSubscriptions document */
export const ServiceSubscriptionsPHStateSchema = BaseDocumentStateSchema.extend(
  {
    global: ServiceSubscriptionsStateSchema(),
  },
);

export const ServiceSubscriptionsDocumentSchema = z.object({
  header: ServiceSubscriptionsDocumentHeaderSchema,
  state: ServiceSubscriptionsPHStateSchema,
  initialState: ServiceSubscriptionsPHStateSchema,
});

/** Simple helper function to check if a state object is a ServiceSubscriptions document state object */
export function isServiceSubscriptionsState(
  state: unknown,
): state is ServiceSubscriptionsPHState {
  return ServiceSubscriptionsPHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a ServiceSubscriptions document state object */
export function assertIsServiceSubscriptionsState(
  state: unknown,
): asserts state is ServiceSubscriptionsPHState {
  ServiceSubscriptionsPHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a ServiceSubscriptions document */
export function isServiceSubscriptionsDocument(
  document: unknown,
): document is ServiceSubscriptionsDocument {
  return ServiceSubscriptionsDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a ServiceSubscriptions document */
export function assertIsServiceSubscriptionsDocument(
  document: unknown,
): asserts document is ServiceSubscriptionsDocument {
  ServiceSubscriptionsDocumentSchema.parse(document);
}
