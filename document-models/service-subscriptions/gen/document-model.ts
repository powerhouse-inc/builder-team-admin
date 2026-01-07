import type { DocumentModelGlobalState } from "document-model";

export const documentModel: DocumentModelGlobalState = {
  author: {
    name: "Powerhouse",
    website: "https://www.powerhouse.inc/",
  },
  description:
    "Manage team service subscriptions to various vendors including billing, seats allocation with team member tracking, and subscription lifecycle management.",
  extension: "phss",
  id: "powerhouse/service-subscriptions",
  name: "ServiceSubscriptions",
  specifications: [
    {
      changeLog: [],
      modules: [
        {
          description: "Manage vendor directory for service subscriptions",
          id: "vendors-module",
          name: "Vendors",
          operations: [
            {
              description: "Add a new vendor to the directory",
              errors: [],
              examples: [],
              id: "add-vendor-op",
              name: "ADD_VENDOR",
              reducer:
                "state.vendors.push({\n  id: action.input.id,\n  name: action.input.name,\n  website: action.input.website || null,\n  supportEmail: action.input.supportEmail || null,\n  supportUrl: action.input.supportUrl || null\n});",
              schema:
                "input AddVendorInput {\n  id: OID!\n  name: String!\n  website: URL\n  supportEmail: EmailAddress\n  supportUrl: URL\n}",
              scope: "global",
              template: "Add a new vendor to the directory",
            },
            {
              description: "Update an existing vendor",
              errors: [],
              examples: [],
              id: "update-vendor-op",
              name: "UPDATE_VENDOR",
              reducer:
                "const vendor = state.vendors.find(v => v.id === action.input.id);\nif (!vendor) return;\nif (action.input.name) vendor.name = action.input.name;\nif (action.input.website) vendor.website = action.input.website;\nif (action.input.supportEmail) vendor.supportEmail = action.input.supportEmail;\nif (action.input.supportUrl) vendor.supportUrl = action.input.supportUrl;",
              schema:
                "input UpdateVendorInput {\n  id: OID!\n  name: String\n  website: URL\n  supportEmail: EmailAddress\n  supportUrl: URL\n}",
              scope: "global",
              template: "Update an existing vendor",
            },
            {
              description: "Remove a vendor from the directory",
              errors: [],
              examples: [],
              id: "delete-vendor-op",
              name: "DELETE_VENDOR",
              reducer:
                "const vendorIndex = state.vendors.findIndex(v => v.id === action.input.id);\nif (vendorIndex === -1) return;\nstate.vendors.splice(vendorIndex, 1);",
              schema: "input DeleteVendorInput {\n  id: OID!\n}",
              scope: "global",
              template: "Remove a vendor from the directory",
            },
          ],
        },
        {
          description: "Manage subscription categories for organization",
          id: "categories-module",
          name: "Categories",
          operations: [
            {
              description: "Add a new category for organizing subscriptions",
              errors: [],
              examples: [],
              id: "add-category-op",
              name: "ADD_CATEGORY",
              reducer:
                "state.categories.push({\n  id: action.input.id,\n  name: action.input.name,\n  description: action.input.description || null\n});",
              schema:
                "input AddCategoryInput {\n  id: OID!\n  name: String!\n  description: String\n}",
              scope: "global",
              template: "Add a new category for organizing subscriptions",
            },
            {
              description: "Update an existing category",
              errors: [],
              examples: [],
              id: "update-category-op",
              name: "UPDATE_CATEGORY",
              reducer:
                "const category = state.categories.find(c => c.id === action.input.id);\nif (!category) return;\nif (action.input.name) category.name = action.input.name;\nif (action.input.description) category.description = action.input.description;",
              schema:
                "input UpdateCategoryInput {\n  id: OID!\n  name: String\n  description: String\n}",
              scope: "global",
              template: "Update an existing category",
            },
            {
              description: "Remove a category",
              errors: [],
              examples: [],
              id: "delete-category-op",
              name: "DELETE_CATEGORY",
              reducer:
                "const categoryIndex = state.categories.findIndex(c => c.id === action.input.id);\nif (categoryIndex === -1) return;\nstate.categories.splice(categoryIndex, 1);",
              schema: "input DeleteCategoryInput {\n  id: OID!\n}",
              scope: "global",
              template: "Remove a category",
            },
          ],
        },
        {
          description:
            "Manage service subscriptions including billing, status, and seat assignments",
          id: "subscriptions-module",
          name: "Subscriptions",
          operations: [
            {
              description: "Add a new service subscription",
              errors: [],
              examples: [],
              id: "add-subscription-op",
              name: "ADD_SUBSCRIPTION",
              reducer:
                "state.subscriptions.push({\n  id: action.input.id,\n  name: action.input.name,\n  vendorId: action.input.vendorId,\n  categoryId: action.input.categoryId || null,\n  billingCycle: action.input.billingCycle,\n  amount: action.input.amount || null,\n  currency: action.input.currency || null,\n  nextBillingDate: action.input.nextBillingDate || null,\n  status: action.input.status,\n  startDate: action.input.startDate || null,\n  endDate: action.input.endDate || null,\n  autoRenew: action.input.autoRenew || null,\n  planName: action.input.planName || null,\n  seats: action.input.seats ? {\n    total: action.input.seats.total,\n    assignedMembers: action.input.seats.assignedMembers || []\n  } : null,\n  accountEmail: action.input.accountEmail || null,\n  accountOwner: action.input.accountOwner || null,\n  loginUrl: action.input.loginUrl || null,\n  notes: action.input.notes || null,\n  tags: action.input.tags || []\n});",
              schema:
                "input SeatsAllocationInput {\n  total: Int!\n  assignedMembers: [PHID!]!\n}\n\ninput AddSubscriptionInput {\n  id: OID!\n  name: String!\n  vendorId: OID!\n  categoryId: OID\n  billingCycle: BillingCycle!\n  amount: Amount_Money\n  currency: Currency\n  nextBillingDate: Date\n  status: SubscriptionStatus!\n  startDate: Date\n  endDate: Date\n  autoRenew: Boolean\n  planName: String\n  seats: SeatsAllocationInput\n  accountEmail: EmailAddress\n  accountOwner: String\n  loginUrl: URL\n  notes: String\n  tags: [String!]\n}",
              scope: "global",
              template: "Add a new service subscription",
            },
            {
              description: "Update an existing subscription's details",
              errors: [],
              examples: [],
              id: "update-subscription-op",
              name: "UPDATE_SUBSCRIPTION",
              reducer:
                "const subscription = state.subscriptions.find(s => s.id === action.input.id);\nif (!subscription) return;\nif (action.input.name) subscription.name = action.input.name;\nif (action.input.vendorId) subscription.vendorId = action.input.vendorId;\nif (action.input.categoryId) subscription.categoryId = action.input.categoryId;\nif (action.input.billingCycle) subscription.billingCycle = action.input.billingCycle;\nif (action.input.amount) subscription.amount = action.input.amount;\nif (action.input.currency) subscription.currency = action.input.currency;\nif (action.input.nextBillingDate) subscription.nextBillingDate = action.input.nextBillingDate;\nif (action.input.startDate) subscription.startDate = action.input.startDate;\nif (action.input.endDate) subscription.endDate = action.input.endDate;\nif (action.input.autoRenew !== undefined && action.input.autoRenew !== null) subscription.autoRenew = action.input.autoRenew;\nif (action.input.planName) subscription.planName = action.input.planName;\nif (action.input.accountEmail) subscription.accountEmail = action.input.accountEmail;\nif (action.input.accountOwner) subscription.accountOwner = action.input.accountOwner;\nif (action.input.loginUrl) subscription.loginUrl = action.input.loginUrl;\nif (action.input.notes) subscription.notes = action.input.notes;\nif (action.input.tags) subscription.tags = action.input.tags;",
              schema:
                "input UpdateSubscriptionInput {\n  id: OID!\n  name: String\n  vendorId: OID\n  categoryId: OID\n  billingCycle: BillingCycle\n  amount: Amount_Money\n  currency: Currency\n  nextBillingDate: Date\n  startDate: Date\n  endDate: Date\n  autoRenew: Boolean\n  planName: String\n  accountEmail: EmailAddress\n  accountOwner: String\n  loginUrl: URL\n  notes: String\n  tags: [String!]\n}",
              scope: "global",
              template: "Update an existing subscription's details",
            },
            {
              description: "Update a subscription's status",
              errors: [],
              examples: [],
              id: "update-subscription-status-op",
              name: "UPDATE_SUBSCRIPTION_STATUS",
              reducer:
                "const subscription = state.subscriptions.find(s => s.id === action.input.id);\nif (!subscription) return;\nsubscription.status = action.input.status;",
              schema:
                "input UpdateSubscriptionStatusInput {\n  id: OID!\n  status: SubscriptionStatus!\n}",
              scope: "global",
              template: "Update a subscription's status",
            },
            {
              description: "Remove a subscription",
              errors: [],
              examples: [],
              id: "delete-subscription-op",
              name: "DELETE_SUBSCRIPTION",
              reducer:
                "const subscriptionIndex = state.subscriptions.findIndex(s => s.id === action.input.id);\nif (subscriptionIndex === -1) return;\nstate.subscriptions.splice(subscriptionIndex, 1);",
              schema: "input DeleteSubscriptionInput {\n  id: OID!\n}",
              scope: "global",
              template: "Remove a subscription",
            },
            {
              description: "Set the total number of seats for a subscription",
              errors: [],
              examples: [],
              id: "set-total-seats-op",
              name: "SET_TOTAL_SEATS",
              reducer:
                "const subscription = state.subscriptions.find(s => s.id === action.input.subscriptionId);\nif (!subscription) return;\nif (!subscription.seats) {\n  subscription.seats = { total: action.input.total, assignedMembers: [] };\n} else {\n  subscription.seats.total = action.input.total;\n}",
              schema:
                "input SetTotalSeatsInput {\n  subscriptionId: OID!\n  total: Int!\n}",
              scope: "global",
              template: "Set the total number of seats for a subscription",
            },
            {
              description: "Assign a team member to a subscription seat",
              errors: [],
              examples: [],
              id: "assign-member-op",
              name: "ASSIGN_MEMBER",
              reducer:
                "const subscription = state.subscriptions.find(s => s.id === action.input.subscriptionId);\nif (!subscription) return;\nif (!subscription.seats) return;\nif (subscription.seats.assignedMembers.includes(action.input.memberId)) return;\nif (subscription.seats.assignedMembers.length >= subscription.seats.total) return;\nsubscription.seats.assignedMembers.push(action.input.memberId);",
              schema:
                "input AssignMemberInput {\n  subscriptionId: OID!\n  memberId: PHID!\n}",
              scope: "global",
              template: "Assign a team member to a subscription seat",
            },
            {
              description: "Remove a team member from a subscription seat",
              errors: [],
              examples: [],
              id: "unassign-member-op",
              name: "UNASSIGN_MEMBER",
              reducer:
                "const subscription = state.subscriptions.find(s => s.id === action.input.subscriptionId);\nif (!subscription) return;\nif (!subscription.seats) return;\nconst memberIndex = subscription.seats.assignedMembers.indexOf(action.input.memberId);\nif (memberIndex === -1) return;\nsubscription.seats.assignedMembers.splice(memberIndex, 1);",
              schema:
                "input UnassignMemberInput {\n  subscriptionId: OID!\n  memberId: PHID!\n}",
              scope: "global",
              template: "Remove a team member from a subscription seat",
            },
          ],
        },
      ],
      state: {
        global: {
          examples: [],
          initialValue:
            '"{\\"subscriptions\\":[],\\"vendors\\":[],\\"categories\\":[]}"',
          schema:
            "enum BillingCycle {\n  MONTHLY\n  QUARTERLY\n  ANNUAL\n  BIENNIAL\n  ONE_TIME\n  USAGE_BASED\n}\n\nenum SubscriptionStatus {\n  ACTIVE\n  TRIAL\n  PENDING\n  PAUSED\n  CANCELLED\n  EXPIRED\n}\n\ntype SeatsAllocation {\n  total: Int!\n  assignedMembers: [PHID!]!\n}\n\ntype ServiceSubscription {\n  id: OID!\n  name: String!\n  vendorId: OID!\n  categoryId: OID\n  billingCycle: BillingCycle!\n  amount: Amount_Money\n  currency: Currency\n  nextBillingDate: Date\n  status: SubscriptionStatus!\n  startDate: Date\n  endDate: Date\n  autoRenew: Boolean\n  planName: String\n  seats: SeatsAllocation\n  accountEmail: EmailAddress\n  accountOwner: String\n  loginUrl: URL\n  notes: String\n  tags: [String!]!\n}\n\ntype Vendor {\n  id: OID!\n  name: String!\n  website: URL\n  supportEmail: EmailAddress\n  supportUrl: URL\n}\n\ntype Category {\n  id: OID!\n  name: String!\n  description: String\n}\n\ntype ServiceSubscriptionsState {\n  subscriptions: [ServiceSubscription!]!\n  vendors: [Vendor!]!\n  categories: [Category!]!\n}",
        },
        local: {
          examples: [],
          initialValue: '""',
          schema: "",
        },
      },
      version: 1,
    },
  ],
};
