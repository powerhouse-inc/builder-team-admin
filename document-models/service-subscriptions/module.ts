import type { DocumentModelModule } from "document-model";
import { createState } from "document-model";
import { defaultBaseState } from "document-model/core";
import type { ServiceSubscriptionsPHState } from "./gen/index.js";
import { documentModel, reducer } from "./gen/index.js";
import { actions } from "./actions.js";
import { utils } from "./utils.js";

/** Document model module for the Service Subscriptions document type */
export const ServiceSubscriptions: DocumentModelModule<ServiceSubscriptionsPHState> =
  {
    reducer,
    actions,
    utils,
    documentModel: createState(defaultBaseState(), documentModel),
  };
