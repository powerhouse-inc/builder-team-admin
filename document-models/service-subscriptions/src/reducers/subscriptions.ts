import type { ServiceSubscriptionsSubscriptionsOperations } from "@powerhousedao/builder-team-admin/document-models/service-subscriptions";

export const serviceSubscriptionsSubscriptionsOperations: ServiceSubscriptionsSubscriptionsOperations =
  {
    addSubscriptionOperation(state, action) {
      state.subscriptions.push({
        id: action.input.id,
        name: action.input.name,
        vendorId: action.input.vendorId,
        categoryId: action.input.categoryId || null,
        billingCycle: action.input.billingCycle,
        amount: action.input.amount || null,
        currency: action.input.currency || null,
        nextBillingDate: action.input.nextBillingDate || null,
        status: action.input.status,
        startDate: action.input.startDate || null,
        endDate: action.input.endDate || null,
        autoRenew: action.input.autoRenew || null,
        planName: action.input.planName || null,
        seats: action.input.seats
          ? {
              total: action.input.seats.total,
              assignedMembers: action.input.seats.assignedMembers || [],
            }
          : null,
        accountEmail: action.input.accountEmail || null,
        accountOwner: action.input.accountOwner || null,
        loginUrl: action.input.loginUrl || null,
        notes: action.input.notes || null,
        tags: action.input.tags || [],
      });
    },
    updateSubscriptionOperation(state, action) {
      const subscription = state.subscriptions.find(
        (s) => s.id === action.input.id,
      );
      if (!subscription) return;
      if (action.input.name) subscription.name = action.input.name;
      if (action.input.vendorId) subscription.vendorId = action.input.vendorId;
      if (action.input.categoryId)
        subscription.categoryId = action.input.categoryId;
      if (action.input.billingCycle)
        subscription.billingCycle = action.input.billingCycle;
      if (action.input.amount) subscription.amount = action.input.amount;
      if (action.input.currency) subscription.currency = action.input.currency;
      if (action.input.nextBillingDate)
        subscription.nextBillingDate = action.input.nextBillingDate;
      if (action.input.startDate)
        subscription.startDate = action.input.startDate;
      if (action.input.endDate) subscription.endDate = action.input.endDate;
      if (
        action.input.autoRenew !== undefined &&
        action.input.autoRenew !== null
      )
        subscription.autoRenew = action.input.autoRenew;
      if (action.input.planName) subscription.planName = action.input.planName;
      if (action.input.accountEmail)
        subscription.accountEmail = action.input.accountEmail;
      if (action.input.accountOwner)
        subscription.accountOwner = action.input.accountOwner;
      if (action.input.loginUrl) subscription.loginUrl = action.input.loginUrl;
      if (action.input.notes) subscription.notes = action.input.notes;
      if (action.input.tags) subscription.tags = action.input.tags;
    },
    updateSubscriptionStatusOperation(state, action) {
      const subscription = state.subscriptions.find(
        (s) => s.id === action.input.id,
      );
      if (!subscription) return;
      subscription.status = action.input.status;
    },
    deleteSubscriptionOperation(state, action) {
      const subscriptionIndex = state.subscriptions.findIndex(
        (s) => s.id === action.input.id,
      );
      if (subscriptionIndex === -1) return;
      state.subscriptions.splice(subscriptionIndex, 1);
    },
    setTotalSeatsOperation(state, action) {
      const subscription = state.subscriptions.find(
        (s) => s.id === action.input.subscriptionId,
      );
      if (!subscription) return;
      if (!subscription.seats) {
        subscription.seats = { total: action.input.total, assignedMembers: [] };
      } else {
        subscription.seats.total = action.input.total;
      }
    },
    assignMemberOperation(state, action) {
      const subscription = state.subscriptions.find(
        (s) => s.id === action.input.subscriptionId,
      );
      if (!subscription) return;
      if (!subscription.seats) return;
      if (subscription.seats.assignedMembers.includes(action.input.memberId))
        return;
      if (subscription.seats.assignedMembers.length >= subscription.seats.total)
        return;
      subscription.seats.assignedMembers.push(action.input.memberId);
    },
    unassignMemberOperation(state, action) {
      const subscription = state.subscriptions.find(
        (s) => s.id === action.input.subscriptionId,
      );
      if (!subscription) return;
      if (!subscription.seats) return;
      const memberIndex = subscription.seats.assignedMembers.indexOf(
        action.input.memberId,
      );
      if (memberIndex === -1) return;
      subscription.seats.assignedMembers.splice(memberIndex, 1);
    },
  };
