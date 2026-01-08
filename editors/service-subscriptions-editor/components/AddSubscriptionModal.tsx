import { useState } from "react";
import { generateId } from "document-model/core";
import { useSelectedServiceSubscriptionsDocument } from "../../../document-models/service-subscriptions/hooks.js";
import { addSubscription } from "../../../document-models/service-subscriptions/gen/creators.js";
import type {
  Vendor,
  Category,
  BillingCycle,
  SubscriptionStatus,
} from "../../../document-models/service-subscriptions/gen/types.js";

interface AddSubscriptionModalProps {
  vendors: Vendor[];
  categories: Category[];
  onClose: () => void;
  isDarkMode: boolean;
}

export function AddSubscriptionModal({
  vendors,
  categories,
  onClose,
  isDarkMode,
}: AddSubscriptionModalProps) {
  const [, dispatch] = useSelectedServiceSubscriptionsDocument();
  const [formData, setFormData] = useState({
    name: "",
    vendorId: vendors[0]?.id ?? "",
    categoryId: "",
    billingCycle: "MONTHLY" as BillingCycle,
    amount: "",
    currency: "USD",
    status: "ACTIVE" as SubscriptionStatus,
    planName: "",
    totalSeats: "",
    accountEmail: "",
    accountOwner: "",
    loginUrl: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.vendorId) {
      alert("Name and vendor are required");
      return;
    }

    dispatch?.(
      addSubscription({
        id: generateId(),
        name: formData.name,
        vendorId: formData.vendorId,
        categoryId: formData.categoryId || undefined,
        billingCycle: formData.billingCycle,
        amount: formData.amount ? parseFloat(formData.amount) : undefined,
        currency: formData.currency || undefined,
        status: formData.status,
        planName: formData.planName || undefined,
        seats: formData.totalSeats
          ? { total: parseInt(formData.totalSeats), assignedMembers: [] }
          : undefined,
        accountEmail: formData.accountEmail || undefined,
        accountOwner: formData.accountOwner || undefined,
        loginUrl: formData.loginUrl || undefined,
        notes: formData.notes || undefined,
        tags: [],
      }),
    );

    onClose();
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const inputClass = `w-full px-3 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none focus:border-indigo-500 ${
    isDarkMode
      ? "bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-500"
      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
  }`;

  const labelClass = `block text-sm font-medium mb-1.5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isDarkMode ? "bg-black/70" : "bg-black/40"
      }`}
      onClick={onClose}
    >
      <div
        className={`w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200 shadow-xl"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex justify-between items-center px-6 py-5 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <h2
            className={`text-lg font-semibold ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
          >
            Add Subscription
          </h2>
          <button
            className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
              isDarkMode
                ? "text-gray-400 hover:text-gray-100 hover:bg-gray-700"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            }`}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label className={labelClass}>Name *</label>
              <input
                type="text"
                className={inputClass}
                placeholder="e.g., GitHub Enterprise"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className={labelClass}>Vendor *</label>
                <select
                  className={inputClass}
                  value={formData.vendorId}
                  onChange={(e) => updateField("vendorId", e.target.value)}
                >
                  {vendors.length === 0 && (
                    <option value="">No vendors available</option>
                  )}
                  {vendors.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className={labelClass}>Category</label>
                <select
                  className={inputClass}
                  value={formData.categoryId}
                  onChange={(e) => updateField("categoryId", e.target.value)}
                >
                  <option value="">None</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className={labelClass}>Status</label>
                <select
                  className={inputClass}
                  value={formData.status}
                  onChange={(e) => updateField("status", e.target.value)}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="TRIAL">Trial</option>
                  <option value="PENDING">Pending</option>
                  <option value="PAUSED">Paused</option>
                  <option value="CANCELLED">Cancelled</option>
                  <option value="EXPIRED">Expired</option>
                </select>
              </div>

              <div className="flex-1">
                <label className={labelClass}>Plan Name</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="e.g., Pro, Enterprise"
                  value={formData.planName}
                  onChange={(e) => updateField("planName", e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className={labelClass}>Amount</label>
                <input
                  type="number"
                  className={inputClass}
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => updateField("amount", e.target.value)}
                />
              </div>

              <div className="flex-1">
                <label className={labelClass}>Billing Cycle</label>
                <select
                  className={inputClass}
                  value={formData.billingCycle}
                  onChange={(e) => updateField("billingCycle", e.target.value)}
                >
                  <option value="MONTHLY">Monthly</option>
                  <option value="QUARTERLY">Quarterly</option>
                  <option value="ANNUAL">Annual</option>
                  <option value="BIENNIAL">Biennial</option>
                  <option value="ONE_TIME">One-time</option>
                  <option value="USAGE_BASED">Usage-based</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Total Seats</label>
              <input
                type="number"
                className={inputClass}
                placeholder="Leave empty if not applicable"
                value={formData.totalSeats}
                onChange={(e) => updateField("totalSeats", e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className={labelClass}>Account Owner</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Name"
                  value={formData.accountOwner}
                  onChange={(e) => updateField("accountOwner", e.target.value)}
                />
              </div>

              <div className="flex-1">
                <label className={labelClass}>Account Email</label>
                <input
                  type="email"
                  className={inputClass}
                  placeholder="email@company.com"
                  value={formData.accountEmail}
                  onChange={(e) => updateField("accountEmail", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Login URL</label>
              <input
                type="url"
                className={inputClass}
                placeholder="https://..."
                value={formData.loginUrl}
                onChange={(e) => updateField("loginUrl", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Notes</label>
              <textarea
                className={`${inputClass} resize-y`}
                placeholder="Additional notes..."
                value={formData.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <div
            className={`flex justify-end gap-3 px-6 py-4 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
          >
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-600"
                  : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
              }`}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Add Subscription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
