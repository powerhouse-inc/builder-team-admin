import type { ExpenseReportWalletOperations } from "@powerhousedao/builder-team-admin/document-models/expense-report";

export const expenseReportWalletOperations: ExpenseReportWalletOperations = {
  addWalletOperation(state, action) {
    // Add new wallet to the wallets array
    const newWallet = {
      name: action.input.name ?? null,
      wallet: action.input.wallet,
      totals: [],
      billingStatements: [],
      lineItems: [],
      accountDocumentId: null,
      accountTransactionsDocumentId: null,
    };
    state.wallets.push(newWallet);
  },

  removeWalletOperation(state, action) {
    // Remove wallet by address
    const index = state.wallets.findIndex(
      (w) => w.wallet === action.input.wallet,
    );
    if (index !== -1) {
      state.wallets.splice(index, 1);
    }
  },

  addBillingStatementOperation(state, action) {
    // Add billing statement reference to wallet
    const wallet = state.wallets.find((w) => w.wallet === action.input.wallet);
    if (wallet) {
      if (!wallet.billingStatements) {
        wallet.billingStatements = [];
      }
      wallet.billingStatements.push(action.input.billingStatementId);
    }
  },

  removeBillingStatementOperation(state, action) {
    // Remove billing statement reference from wallet
    const wallet = state.wallets.find((w) => w.wallet === action.input.wallet);
    if (wallet && wallet.billingStatements) {
      const index = wallet.billingStatements.indexOf(
        action.input.billingStatementId,
      );
      if (index !== -1) {
        wallet.billingStatements.splice(index, 1);
      }
    }
  },

  addLineItemOperation(state, action) {
    // Add line item to wallet
    const wallet = state.wallets.find((w) => w.wallet === action.input.wallet);
    if (wallet) {
      if (!wallet.lineItems) {
        wallet.lineItems = [];
      }
      // Convert InputMaybe (undefined | null | T) to Maybe (null | T)
      const lineItem = {
        id: action.input.lineItem.id,
        label: action.input.lineItem.label ?? null,
        group: action.input.lineItem.group ?? null,
        budget: action.input.lineItem.budget ?? null,
        actuals: action.input.lineItem.actuals ?? null,
        forecast: action.input.lineItem.forecast ?? null,
        payments: action.input.lineItem.payments ?? null,
        comments: action.input.lineItem.comments ?? null,
      };
      wallet.lineItems.push(lineItem);
    }
  },

  updateLineItemOperation(state, action) {
    // Update line item in wallet
    const wallet = state.wallets.find((w) => w.wallet === action.input.wallet);
    if (wallet && wallet.lineItems) {
      const lineItem = wallet.lineItems.find(
        (item) => item && item.id === action.input.lineItemId,
      );
      if (lineItem) {
        if (action.input.label !== undefined && action.input.label !== null) {
          lineItem.label = action.input.label;
        }
        if (action.input.group !== undefined && action.input.group !== null) {
          lineItem.group = action.input.group;
        }
        if (action.input.budget !== undefined && action.input.budget !== null) {
          lineItem.budget = action.input.budget;
        }
        if (
          action.input.actuals !== undefined &&
          action.input.actuals !== null
        ) {
          lineItem.actuals = action.input.actuals;
        }
        if (
          action.input.forecast !== undefined &&
          action.input.forecast !== null
        ) {
          lineItem.forecast = action.input.forecast;
        }
        if (
          action.input.payments !== undefined &&
          action.input.payments !== null
        ) {
          lineItem.payments = action.input.payments;
        }
        if (
          action.input.comments !== undefined &&
          action.input.comments !== null
        ) {
          lineItem.comments = action.input.comments;
        }
      }
    }
  },

  removeLineItemOperation(state, action) {
    // Remove line item from wallet
    const wallet = state.wallets.find((w) => w.wallet === action.input.wallet);
    if (wallet && wallet.lineItems) {
      const index = wallet.lineItems.findIndex(
        (item) => item && item.id === action.input.lineItemId,
      );
      if (index !== -1) {
        wallet.lineItems.splice(index, 1);
      }
    }
  },

  addLineItemGroupOperation(state, action) {
    // Add new line item group
    const newGroup = {
      id: action.input.id,
      label: action.input.label || null,
      parentId: action.input.parentId || null,
    };
    state.groups.push(newGroup);
  },

  updateLineItemGroupOperation(state, action) {
    // Update line item group
    const group = state.groups.find((g) => g.id === action.input.id);
    if (group) {
      if (action.input.label !== undefined && action.input.label !== null) {
        group.label = action.input.label;
      }
      if (
        action.input.parentId !== undefined &&
        action.input.parentId !== null
      ) {
        group.parentId = action.input.parentId;
      }
    }
  },

  removeLineItemGroupOperation(state, action) {
    // Remove line item group
    const index = state.groups.findIndex((g) => g.id === action.input.id);
    if (index !== -1) {
      state.groups.splice(index, 1);
    }
  },

  setGroupTotalsOperation(state, action) {
    // Set or update group totals for wallet
    const wallet = state.wallets.find((w) => w.wallet === action.input.wallet);
    if (wallet) {
      if (!wallet.totals) {
        wallet.totals = [];
      }

      // Find existing totals for this group
      const existingIndex = wallet.totals.findIndex(
        (t) => t && t.group === action.input.groupTotals.group,
      );

      const totals = {
        group: action.input.groupTotals.group,
        totalBudget: action.input.groupTotals.totalBudget || null,
        totalForecast: action.input.groupTotals.totalForecast || null,
        totalActuals: action.input.groupTotals.totalActuals || null,
        totalPayments: action.input.groupTotals.totalPayments || null,
      };

      if (existingIndex !== -1) {
        wallet.totals[existingIndex] = totals;
      } else {
        wallet.totals.push(totals);
      }
    }
  },

  removeGroupTotalsOperation(state, action) {
    // Remove group totals from wallet
    const wallet = state.wallets.find((w) => w.wallet === action.input.wallet);
    if (wallet && wallet.totals) {
      const index = wallet.totals.findIndex(
        (t) => t && t.group === action.input.groupId,
      );
      if (index !== -1) {
        wallet.totals.splice(index, 1);
      }
    }
  },

  setPeriodStartOperation(state, action) {
    // Set period start date
    state.periodStart = action.input.periodStart;
  },

  setPeriodEndOperation(state, action) {
    // Set period end date
    state.periodEnd = action.input.periodEnd;
  },
  updateWalletOperation(state, action, dispatch) {
    // Update wallet name and document IDs
    const wallet = state.wallets.find((w) => w.wallet === action.input.address);
    if (wallet) {
      if (action.input.name !== undefined && action.input.name !== null) {
        wallet.name = action.input.name;
      }
      if (
        action.input.accountDocumentId !== undefined &&
        action.input.accountDocumentId !== null
      ) {
        wallet.accountDocumentId = action.input.accountDocumentId;
      }
      if (
        action.input.accountTransactionsDocumentId !== undefined &&
        action.input.accountTransactionsDocumentId !== null
      ) {
        wallet.accountTransactionsDocumentId =
          action.input.accountTransactionsDocumentId;
      }
    }
  },
};
