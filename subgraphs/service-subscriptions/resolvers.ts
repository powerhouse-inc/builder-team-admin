import type { BaseSubgraph } from "@powerhousedao/reactor-api";
import { addFile } from "document-drive";
import { setName } from "document-model";
import {
  actions,
  serviceSubscriptionsDocumentType,
} from "@powerhousedao/builder-team-admin/document-models/service-subscriptions";

import type {
  ServiceSubscriptionsDocument,
  AddVendorInput,
  UpdateVendorInput,
  DeleteVendorInput,
  AddCategoryInput,
  UpdateCategoryInput,
  DeleteCategoryInput,
  AddSubscriptionInput,
  UpdateSubscriptionInput,
  UpdateSubscriptionStatusInput,
  DeleteSubscriptionInput,
  SetTotalSeatsInput,
  AssignMemberInput,
  UnassignMemberInput,
} from "@powerhousedao/builder-team-admin/document-models/service-subscriptions";

export const getResolvers = (
  subgraph: BaseSubgraph,
): Record<string, unknown> => {
  const reactor = subgraph.reactor;

  return {
    Query: {
      ServiceSubscriptions: async () => {
        return {
          getDocument: async (args: { docId: string; driveId: string }) => {
            const { docId, driveId } = args;

            if (!docId) {
              throw new Error("Document id is required");
            }

            if (driveId) {
              const docIds = await reactor.getDocuments(driveId);
              if (!docIds.includes(docId)) {
                throw new Error(
                  `Document with id ${docId} is not part of ${driveId}`,
                );
              }
            }

            const doc =
              await reactor.getDocument<ServiceSubscriptionsDocument>(docId);
            return {
              driveId: driveId,
              ...doc,
              ...doc.header,
              created: doc.header.createdAtUtcIso,
              lastModified: doc.header.lastModifiedAtUtcIso,
              state: doc.state.global,
              stateJSON: doc.state.global,
              revision: doc.header?.revision?.global ?? 0,
            };
          },
          getDocuments: async (args: { driveId: string }) => {
            const { driveId } = args;
            const docsIds = await reactor.getDocuments(driveId);
            const docs = await Promise.all(
              docsIds.map(async (docId) => {
                const doc =
                  await reactor.getDocument<ServiceSubscriptionsDocument>(
                    docId,
                  );
                return {
                  driveId: driveId,
                  ...doc,
                  ...doc.header,
                  created: doc.header.createdAtUtcIso,
                  lastModified: doc.header.lastModifiedAtUtcIso,
                  state: doc.state.global,
                  stateJSON: doc.state.global,
                  revision: doc.header?.revision?.global ?? 0,
                };
              }),
            );

            return docs.filter(
              (doc) =>
                doc.header.documentType === serviceSubscriptionsDocumentType,
            );
          },
        };
      },
    },
    Mutation: {
      ServiceSubscriptions_createDocument: async (
        _: unknown,
        args: { name: string; driveId?: string },
      ) => {
        const { driveId, name } = args;
        const document = await reactor.addDocument(
          serviceSubscriptionsDocumentType,
        );

        if (driveId) {
          await reactor.addAction(
            driveId,
            addFile({
              name,
              id: document.header.id,
              documentType: serviceSubscriptionsDocumentType,
            }),
          );
        }

        if (name) {
          await reactor.addAction(document.header.id, setName(name));
        }

        return document.header.id;
      },

      ServiceSubscriptions_addVendor: async (
        _: unknown,
        args: { docId: string; input: AddVendorInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<ServiceSubscriptionsDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(docId, actions.addVendor(input));

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addVendor");
        }

        return true;
      },

      ServiceSubscriptions_updateVendor: async (
        _: unknown,
        args: { docId: string; input: UpdateVendorInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<ServiceSubscriptionsDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updateVendor(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to updateVendor");
        }

        return true;
      },

      ServiceSubscriptions_deleteVendor: async (
        _: unknown,
        args: { docId: string; input: DeleteVendorInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<ServiceSubscriptionsDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.deleteVendor(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to deleteVendor");
        }

        return true;
      },

      ServiceSubscriptions_addCategory: async (
        _: unknown,
        args: { docId: string; input: AddCategoryInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<ServiceSubscriptionsDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addCategory(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addCategory");
        }

        return true;
      },

      ServiceSubscriptions_updateCategory: async (
        _: unknown,
        args: { docId: string; input: UpdateCategoryInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<ServiceSubscriptionsDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updateCategory(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to updateCategory");
        }

        return true;
      },

      ServiceSubscriptions_deleteCategory: async (
        _: unknown,
        args: { docId: string; input: DeleteCategoryInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<ServiceSubscriptionsDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.deleteCategory(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to deleteCategory");
        }

        return true;
      },

      ServiceSubscriptions_addSubscription: async (
        _: unknown,
        args: { docId: string; input: AddSubscriptionInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<ServiceSubscriptionsDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addSubscription(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addSubscription");
        }

        return true;
      },

      ServiceSubscriptions_updateSubscription: async (
        _: unknown,
        args: { docId: string; input: UpdateSubscriptionInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<ServiceSubscriptionsDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updateSubscription(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to updateSubscription",
          );
        }

        return true;
      },

      ServiceSubscriptions_updateSubscriptionStatus: async (
        _: unknown,
        args: { docId: string; input: UpdateSubscriptionStatusInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<ServiceSubscriptionsDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updateSubscriptionStatus(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to updateSubscriptionStatus",
          );
        }

        return true;
      },

      ServiceSubscriptions_deleteSubscription: async (
        _: unknown,
        args: { docId: string; input: DeleteSubscriptionInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<ServiceSubscriptionsDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.deleteSubscription(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to deleteSubscription",
          );
        }

        return true;
      },

      ServiceSubscriptions_setTotalSeats: async (
        _: unknown,
        args: { docId: string; input: SetTotalSeatsInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<ServiceSubscriptionsDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setTotalSeats(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to setTotalSeats");
        }

        return true;
      },

      ServiceSubscriptions_assignMember: async (
        _: unknown,
        args: { docId: string; input: AssignMemberInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<ServiceSubscriptionsDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.assignMember(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to assignMember");
        }

        return true;
      },

      ServiceSubscriptions_unassignMember: async (
        _: unknown,
        args: { docId: string; input: UnassignMemberInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<ServiceSubscriptionsDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.unassignMember(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to unassignMember");
        }

        return true;
      },
    },
  };
};
