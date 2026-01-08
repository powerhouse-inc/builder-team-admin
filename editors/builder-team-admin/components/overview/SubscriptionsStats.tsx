import type { ServiceSubscription } from "../../../../document-models/service-subscriptions/gen/types.js";

type SubscriptionsStatsProps = {
  subscriptions: ServiceSubscription[];
};

/**
 * Displays subscription statistics in a 4-column card grid.
 * Shows: Active count, Trial count, Monthly cost estimate, Seats usage.
 */
export function SubscriptionsStats({ subscriptions }: SubscriptionsStatsProps) {
  const activeCount = subscriptions.filter((s) => s.status === "ACTIVE").length;
  const trialCount = subscriptions.filter((s) => s.status === "TRIAL").length;

  // Calculate estimated monthly cost by normalizing all billing cycles
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

  const stats = [
    {
      label: "Active Subscriptions",
      value: activeCount.toString(),
      color: "text-emerald-600",
    },
    {
      label: "Trial Subscriptions",
      value: trialCount.toString(),
      color: "text-amber-600",
    },
    {
      label: "Monthly Cost (est.)",
      value: `$${totalMonthly.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`,
      color: "text-slate-900",
    },
    {
      label: "Seats Used",
      value: `${usedSeats}/${totalSeats}`,
      color: "text-slate-900",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">
        Service Subscriptions
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p
              className={`mt-2 text-3xl font-semibold tracking-tight ${stat.color}`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Empty state placeholder when no subscriptions document exists.
 */
export function SubscriptionsEmptyState() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">
        Service Subscriptions
      </h2>
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <svg
            className="h-6 w-6 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
            />
          </svg>
        </div>
        <p className="text-sm text-slate-500">
          No subscriptions document found. Create one to track your team's
          services.
        </p>
      </div>
    </div>
  );
}
