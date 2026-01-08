import type { ServiceSubscriptionsVendorsOperations } from "../../gen/vendors/operations.js";

export const serviceSubscriptionsVendorsOperations: ServiceSubscriptionsVendorsOperations =
  {
    addVendorOperation(state, action) {
      state.vendors.push({
        id: action.input.id,
        name: action.input.name,
        website: action.input.website || null,
        supportEmail: action.input.supportEmail || null,
        supportUrl: action.input.supportUrl || null,
      });
    },
    updateVendorOperation(state, action) {
      const vendor = state.vendors.find((v) => v.id === action.input.id);
      if (!vendor) return;
      if (action.input.name) vendor.name = action.input.name;
      if (action.input.website) vendor.website = action.input.website;
      if (action.input.supportEmail)
        vendor.supportEmail = action.input.supportEmail;
      if (action.input.supportUrl) vendor.supportUrl = action.input.supportUrl;
    },
    deleteVendorOperation(state, action) {
      const vendorIndex = state.vendors.findIndex(
        (v) => v.id === action.input.id,
      );
      if (vendorIndex === -1) return;
      state.vendors.splice(vendorIndex, 1);
    },
  };
