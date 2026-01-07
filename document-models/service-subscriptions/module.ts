import type { DocumentModelModule } from "document-model";
import { createState } from "document-model";
import { defaultBaseState } from "document-model/core";
import type { ServiceSubscriptionsPHState } from "@powerhousedao/builder-team-admin/document-models/service-subscriptions";
import {
  actions,
  documentModel,
  reducer,
  utils,
} from "@powerhousedao/builder-team-admin/document-models/service-subscriptions";

/** Document model module for the Todo List document type */
export const ServiceSubscriptions: DocumentModelModule<ServiceSubscriptionsPHState> =
  {
    reducer,
    actions,
    utils,
    documentModel: createState(defaultBaseState(), documentModel),
  };
