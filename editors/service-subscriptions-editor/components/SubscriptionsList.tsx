import { useSelectedServiceSubscriptionsDocument } from "../../../document-models/service-subscriptions/hooks.js";
import {
  deleteSubscription,
  updateSubscriptionStatus,
  assignMember,
  unassignMember,
} from "../../../document-models/service-subscriptions/gen/creators.js";
import type {
  ServiceSubscription,
  Vendor,
  Category,
  SubscriptionStatus,
} from "../../../document-models/service-subscriptions/gen/types.js";
import { useState } from "react";

interface SubscriptionsListProps {
  subscriptions: ServiceSubscription[];
  vendors: Vendor[];
  categories: Category[];
  isDarkMode: boolean;
}

export function SubscriptionsList({
  subscriptions,
  vendors,
  categories,
  isDarkMode,
}: SubscriptionsListProps) {
  if (subscriptions.length === 0) {
    return (
      <div
        className={`text-center py-16 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
      >
        <svg
          className="w-12 h-12 mx-auto mb-4 opacity-50"
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect
            x="3"
            y="4"
            width="18"
            height="16"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
          <path
            d="M7 15h4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <div
          className={`text-base font-medium mb-2 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
        >
          No subscriptions yet
        </div>
        <p>Add your first subscription to start tracking.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {subscriptions.map((subscription) => (
        <SubscriptionCard
          key={subscription.id}
          subscription={subscription}
          vendor={vendors.find((v) => v.id === subscription.vendorId)}
          category={categories.find((c) => c.id === subscription.categoryId)}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  );
}

interface SubscriptionCardProps {
  subscription: ServiceSubscription;
  vendor?: Vendor;
  category?: Category;
  isDarkMode: boolean;
}

function SubscriptionCard({
  subscription,
  vendor,
  category,
  isDarkMode,
}: SubscriptionCardProps) {
  const [, dispatch] = useSelectedServiceSubscriptionsDocument();
  const [showAssignModal, setShowAssignModal] = useState(false);

  const handleDelete = () => {
    if (confirm(`Delete subscription "${subscription.name}"?`)) {
      dispatch?.(deleteSubscription({ id: subscription.id }));
    }
  };

  const handleStatusChange = (status: SubscriptionStatus) => {
    dispatch?.(updateSubscriptionStatus({ id: subscription.id, status }));
  };

  const handleAssignMember = (memberId: string) => {
    dispatch?.(assignMember({ subscriptionId: subscription.id, memberId }));
    setShowAssignModal(false);
  };

  const handleUnassignMember = (memberId: string) => {
    dispatch?.(unassignMember({ subscriptionId: subscription.id, memberId }));
  };

  const getStatusClasses = (status: string) => {
    const base =
      "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full uppercase tracking-wide";
    switch (status) {
      case "ACTIVE":
        return `${base} ${isDarkMode ? "bg-green-500/15 text-green-400" : "bg-green-500/10 text-green-600"}`;
      case "TRIAL":
        return `${base} ${isDarkMode ? "bg-indigo-500/15 text-indigo-400" : "bg-indigo-500/10 text-indigo-600"}`;
      case "PENDING":
        return `${base} ${isDarkMode ? "bg-amber-500/15 text-amber-400" : "bg-amber-500/10 text-amber-600"}`;
      default:
        return `${base} ${isDarkMode ? "bg-red-500/15 text-red-400" : "bg-red-500/10 text-red-600"}`;
    }
  };

  const formatCurrency = (amount: number | null, currency: string | null) => {
    if (!amount) return "—";
    return `${currency ?? "$"}${amount.toLocaleString()}`;
  };

  const billingCycleLabels: Record<string, string> = {
    MONTHLY: "/mo",
    QUARTERLY: "/qtr",
    ANNUAL: "/yr",
    BIENNIAL: "/2yr",
    ONE_TIME: "one-time",
    USAGE_BASED: "usage",
  };

  const cardClass = `p-4 rounded-lg border transition-colors ${
    isDarkMode
      ? "bg-gray-800 border-gray-700 hover:border-indigo-500"
      : "bg-white border-gray-200 hover:border-indigo-500 shadow-sm"
  }`;

  return (
    <div className={cardClass}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3
            className={`text-base font-semibold ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
          >
            {subscription.name}
          </h3>
          <div
            className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            {vendor?.name ?? "Unknown vendor"}
            {category && ` • ${category.name}`}
          </div>
        </div>
        <div className={getStatusClasses(subscription.status)}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {subscription.status}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
            Plan
          </span>
          <span
            className={`font-medium ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
          >
            {subscription.planName ?? "—"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
            Cost
          </span>
          <span
            className={`font-medium ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
          >
            {formatCurrency(subscription.amount, subscription.currency)}
            {subscription.amount && (
              <span
                className={`font-normal ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                {" "}
                {billingCycleLabels[subscription.billingCycle]}
              </span>
            )}
          </span>
        </div>
        {subscription.nextBillingDate && (
          <div className="flex justify-between text-sm">
            <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
              Next billing
            </span>
            <span
              className={`font-medium ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
            >
              {subscription.nextBillingDate}
            </span>
          </div>
        )}
        {subscription.loginUrl && (
          <div className="flex justify-between text-sm">
            <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
              Login
            </span>
            <a
              href={subscription.loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:underline"
            >
              Open →
            </a>
          </div>
        )}
      </div>

      {subscription.seats && (
        <div
          className={`mt-3 pt-3 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="flex justify-between items-center mb-2">
            <span
              className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              Seats
            </span>
            <span
              className={`text-xs font-medium ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
            >
              {subscription.seats.assignedMembers.length} /{" "}
              {subscription.seats.total}
            </span>
          </div>
          <div
            className={`h-1.5 rounded-full overflow-hidden ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
          >
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
              style={{
                width: `${(subscription.seats.assignedMembers.length / subscription.seats.total) * 100}%`,
              }}
            />
          </div>
          {subscription.seats.assignedMembers.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {subscription.seats.assignedMembers.map((memberId) => (
                <span
                  key={memberId}
                  className={`text-xs px-2 py-0.5 rounded cursor-pointer ${
                    isDarkMode
                      ? "bg-gray-900 text-gray-400"
                      : "bg-gray-100 text-gray-500"
                  }`}
                  onClick={() => handleUnassignMember(memberId)}
                  title="Click to unassign"
                >
                  {memberId.slice(0, 12)}...
                </span>
              ))}
            </div>
          )}
          {subscription.seats.assignedMembers.length <
            subscription.seats.total && (
            <button
              className={`mt-2 text-xs px-2 py-1 rounded transition-colors ${
                isDarkMode
                  ? "text-gray-400 hover:text-gray-100 hover:bg-gray-700"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
              onClick={() => setShowAssignModal(true)}
            >
              + Assign member
            </button>
          )}
        </div>
      )}

      <div
        className={`flex gap-2 mt-3 pt-3 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
      >
        <select
          className={`flex-1 px-3 py-2 text-sm rounded-lg border cursor-pointer ${
            isDarkMode
              ? "bg-gray-900 border-gray-700 text-gray-100"
              : "bg-gray-50 border-gray-200 text-gray-900"
          }`}
          value={subscription.status}
          onChange={(e) =>
            handleStatusChange(e.target.value as SubscriptionStatus)
          }
        >
          <option value="ACTIVE">Active</option>
          <option value="TRIAL">Trial</option>
          <option value="PENDING">Pending</option>
          <option value="PAUSED">Paused</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="EXPIRED">Expired</option>
        </select>
        <button
          className={`px-2.5 py-1.5 text-xs rounded-lg transition-colors ${
            isDarkMode
              ? "text-red-400 hover:bg-red-500/10"
              : "text-red-600 hover:bg-red-500/10"
          }`}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      {showAssignModal && (
        <AssignMemberModal
          onAssign={handleAssignMember}
          onClose={() => setShowAssignModal(false)}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}

interface AssignMemberModalProps {
  onAssign: (memberId: string) => void;
  onClose: () => void;
  isDarkMode: boolean;
}

function AssignMemberModal({
  onAssign,
  onClose,
  isDarkMode,
}: AssignMemberModalProps) {
  const [memberId, setMemberId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (memberId.trim()) {
      onAssign(memberId.trim());
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 animate-in fade-in duration-150 ${
        isDarkMode ? "bg-black/70" : "bg-black/40"
      }`}
      onClick={onClose}
    >
      <div
        className={`w-full max-w-md rounded-xl border animate-in slide-in-from-bottom-2 duration-200 ${
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
            Assign Member
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
          <div className="p-6">
            <div className="mb-4">
              <label
                className={`block text-sm font-medium mb-1.5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                Member PHID
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none focus:border-indigo-500 ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-500"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                }`}
                placeholder="Enter member PHID"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                autoFocus
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
              Assign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
