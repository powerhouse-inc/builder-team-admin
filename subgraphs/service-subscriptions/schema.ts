import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Queries: ServiceSubscriptions Document
  """
  type ServiceSubscriptionsQueries {
    getDocument(docId: PHID!, driveId: PHID): ServiceSubscriptions
    getDocuments(driveId: String!): [ServiceSubscriptions!]
  }

  type Query {
    ServiceSubscriptions: ServiceSubscriptionsQueries
  }

  """
  Mutations: ServiceSubscriptions
  """
  type Mutation {
    ServiceSubscriptions_createDocument(name: String!, driveId: String): String

    ServiceSubscriptions_addVendor(
      driveId: String
      docId: PHID
      input: ServiceSubscriptions_AddVendorInput
    ): Int
    ServiceSubscriptions_updateVendor(
      driveId: String
      docId: PHID
      input: ServiceSubscriptions_UpdateVendorInput
    ): Int
    ServiceSubscriptions_deleteVendor(
      driveId: String
      docId: PHID
      input: ServiceSubscriptions_DeleteVendorInput
    ): Int
    ServiceSubscriptions_addCategory(
      driveId: String
      docId: PHID
      input: ServiceSubscriptions_AddCategoryInput
    ): Int
    ServiceSubscriptions_updateCategory(
      driveId: String
      docId: PHID
      input: ServiceSubscriptions_UpdateCategoryInput
    ): Int
    ServiceSubscriptions_deleteCategory(
      driveId: String
      docId: PHID
      input: ServiceSubscriptions_DeleteCategoryInput
    ): Int
    ServiceSubscriptions_addSubscription(
      driveId: String
      docId: PHID
      input: ServiceSubscriptions_AddSubscriptionInput
    ): Int
    ServiceSubscriptions_updateSubscription(
      driveId: String
      docId: PHID
      input: ServiceSubscriptions_UpdateSubscriptionInput
    ): Int
    ServiceSubscriptions_updateSubscriptionStatus(
      driveId: String
      docId: PHID
      input: ServiceSubscriptions_UpdateSubscriptionStatusInput
    ): Int
    ServiceSubscriptions_deleteSubscription(
      driveId: String
      docId: PHID
      input: ServiceSubscriptions_DeleteSubscriptionInput
    ): Int
    ServiceSubscriptions_setTotalSeats(
      driveId: String
      docId: PHID
      input: ServiceSubscriptions_SetTotalSeatsInput
    ): Int
    ServiceSubscriptions_assignMember(
      driveId: String
      docId: PHID
      input: ServiceSubscriptions_AssignMemberInput
    ): Int
    ServiceSubscriptions_unassignMember(
      driveId: String
      docId: PHID
      input: ServiceSubscriptions_UnassignMemberInput
    ): Int
  }

  """
  Module: Vendors
  """
  input ServiceSubscriptions_AddVendorInput {
    id: OID!
    name: String!
    website: URL
    supportEmail: EmailAddress
    supportUrl: URL
  }
  input ServiceSubscriptions_UpdateVendorInput {
    id: OID!
    name: String
    website: URL
    supportEmail: EmailAddress
    supportUrl: URL
  }
  input ServiceSubscriptions_DeleteVendorInput {
    id: OID!
  }

  """
  Module: Categories
  """
  input ServiceSubscriptions_AddCategoryInput {
    id: OID!
    name: String!
    description: String
  }
  input ServiceSubscriptions_UpdateCategoryInput {
    id: OID!
    name: String
    description: String
  }
  input ServiceSubscriptions_DeleteCategoryInput {
    id: OID!
  }

  """
  Module: Subscriptions
  """
  input ServiceSubscriptions_SeatsAllocationInput {
    total: Int!
    assignedMembers: [PHID!]!
  }

  input ServiceSubscriptions_AddSubscriptionInput {
    id: OID!
    name: String!
    vendorId: OID!
    categoryId: OID
    billingCycle: ServiceSubscriptions_BillingCycle!
    amount: Amount_Money
    currency: Currency
    nextBillingDate: Date
    status: ServiceSubscriptions_SubscriptionStatus!
    startDate: Date
    endDate: Date
    autoRenew: Boolean
    planName: String
    seats: ServiceSubscriptions_SeatsAllocationInput
    accountEmail: EmailAddress
    accountOwner: String
    loginUrl: URL
    notes: String
    tags: [String!]
  }
  input ServiceSubscriptions_UpdateSubscriptionInput {
    id: OID!
    name: String
    vendorId: OID
    categoryId: OID
    billingCycle: ServiceSubscriptions_BillingCycle
    amount: Amount_Money
    currency: Currency
    nextBillingDate: Date
    startDate: Date
    endDate: Date
    autoRenew: Boolean
    planName: String
    accountEmail: EmailAddress
    accountOwner: String
    loginUrl: URL
    notes: String
    tags: [String!]
  }
  input ServiceSubscriptions_UpdateSubscriptionStatusInput {
    id: OID!
    status: ServiceSubscriptions_SubscriptionStatus!
  }
  input ServiceSubscriptions_DeleteSubscriptionInput {
    id: OID!
  }
  input ServiceSubscriptions_SetTotalSeatsInput {
    subscriptionId: OID!
    total: Int!
  }
  input ServiceSubscriptions_AssignMemberInput {
    subscriptionId: OID!
    memberId: PHID!
  }
  input ServiceSubscriptions_UnassignMemberInput {
    subscriptionId: OID!
    memberId: PHID!
  }
`;
