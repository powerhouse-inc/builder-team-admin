import { useSelectedServiceSubscriptionsDocument } from "../../../document-models/service-subscriptions/hooks.js";
import { deleteVendor } from "../../../document-models/service-subscriptions/gen/creators.js";
import type { Vendor } from "../../../document-models/service-subscriptions/gen/types.js";

interface VendorsListProps {
  vendors: Vendor[];
  isDarkMode: boolean;
}

export function VendorsList({ vendors, isDarkMode }: VendorsListProps) {
  if (vendors.length === 0) {
    return (
      <div
        className={`text-center py-16 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
      >
        <svg
          className="w-12 h-12 mx-auto mb-4 opacity-50"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          className={`text-base font-medium mb-2 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
        >
          No vendors yet
        </div>
        <p>Add vendors to organize your subscriptions.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} isDarkMode={isDarkMode} />
      ))}
    </div>
  );
}

interface VendorCardProps {
  vendor: Vendor;
  isDarkMode: boolean;
}

function VendorCard({ vendor, isDarkMode }: VendorCardProps) {
  const [, dispatch] = useSelectedServiceSubscriptionsDocument();

  const handleDelete = () => {
    if (confirm(`Delete vendor "${vendor.name}"?`)) {
      dispatch?.(deleteVendor({ id: vendor.id }));
    }
  };

  const cardClass = `p-4 rounded-lg border transition-colors ${
    isDarkMode
      ? "bg-gray-800 border-gray-700 hover:border-indigo-500"
      : "bg-white border-gray-200 hover:border-indigo-500 shadow-sm"
  }`;

  return (
    <div className={cardClass}>
      <div className="mb-3">
        <h3
          className={`text-base font-semibold ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
        >
          {vendor.name}
        </h3>
      </div>

      <div className="flex flex-col gap-2">
        {vendor.website && (
          <div className="flex justify-between text-sm">
            <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
              Website
            </span>
            <a
              href={vendor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:underline"
            >
              {new URL(vendor.website).hostname}
            </a>
          </div>
        )}
        {vendor.supportEmail && (
          <div className="flex justify-between text-sm">
            <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
              Support Email
            </span>
            <a
              href={`mailto:${vendor.supportEmail}`}
              className="text-indigo-500 hover:underline"
            >
              {vendor.supportEmail}
            </a>
          </div>
        )}
        {vendor.supportUrl && (
          <div className="flex justify-between text-sm">
            <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
              Support
            </span>
            <a
              href={vendor.supportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:underline"
            >
              Help Center →
            </a>
          </div>
        )}
      </div>

      <div
        className={`flex gap-2 mt-3 pt-3 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
      >
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
    </div>
  );
}
