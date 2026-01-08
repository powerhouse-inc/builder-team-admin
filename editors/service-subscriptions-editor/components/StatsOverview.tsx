import type { ServiceSubscription } from "../../../document-models/service-subscriptions/gen/types.js";

interface StatsOverviewProps {
  subscriptions: ServiceSubscription[];
  isDarkMode: boolean;
}

export function StatsOverview({
  subscriptions,
  isDarkMode,
}: StatsOverviewProps) {
  const activeCount = subscriptions.filter((s) => s.status === "ACTIVE").length;
  const trialCount = subscriptions.filter((s) => s.status === "TRIAL").length;

  const totalMonthly = subscriptions.reduce((sum, sub) => {
    if (!sub.amount) return sum;
    const amount = sub.amount;
    switch (sub.billingCycle) {
      case "MONTHLY":
        return sum + amount;
      case "QUARTERLY":
        return sum + amount / 3;
      case "ANNUAL":
        return sum + amount / 12;
      case "BIENNIAL":
        return sum + amount / 24;
      default:
        return sum;
    }
  }, 0);

  const totalSeats = subscriptions.reduce(
    (sum, sub) => sum + (sub.seats?.total ?? 0),
    0,
  );
  const usedSeats = subscriptions.reduce(
    (sum, sub) => sum + (sub.seats?.assignedMembers.length ?? 0),
    0,
  );

  const cardClass = `p-4 rounded-lg border ${
    isDarkMode
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-200 shadow-sm"
  }`;

  const labelClass = `text-sm mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className={cardClass}>
        <div className={labelClass}>Active Subscriptions</div>
        <div className="text-3xl font-semibold tracking-tight text-green-500">
          {activeCount}
        </div>
      </div>
      <div className={cardClass}>
        <div className={labelClass}>Trial Subscriptions</div>
        <div className="text-3xl font-semibold tracking-tight text-amber-500">
          {trialCount}
        </div>
      </div>
      <div className={cardClass}>
        <div className={labelClass}>Monthly Cost (est.)</div>
        <div
          className={`text-3xl font-semibold tracking-tight ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
        >
          $
          {totalMonthly.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </div>
      </div>
      <div className={cardClass}>
        <div className={labelClass}>Seats Used</div>
        <div
          className={`text-3xl font-semibold tracking-tight ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
        >
          {usedSeats}/{totalSeats}
        </div>
      </div>
    </div>
  );
}
