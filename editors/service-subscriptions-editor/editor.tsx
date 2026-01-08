import { useState } from "react";
import { useSelectedServiceSubscriptionsDocument } from "../../document-models/service-subscriptions/hooks.js";
import { SubscriptionsList } from "./components/SubscriptionsList.js";
import { VendorsList } from "./components/VendorsList.js";
import { CategoriesList } from "./components/CategoriesList.js";
import { AddSubscriptionModal } from "./components/AddSubscriptionModal.js";
import { AddVendorModal } from "./components/AddVendorModal.js";
import { AddCategoryModal } from "./components/AddCategoryModal.js";
import { StatsOverview } from "./components/StatsOverview.js";
import { DocumentToolbar } from "@powerhousedao/design-system/connect";

type Tab = "subscriptions" | "vendors" | "categories";

export default function Editor() {
  const [document] = useSelectedServiceSubscriptionsDocument();
  const [activeTab, setActiveTab] = useState<Tab>("subscriptions");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAddSubscription, setShowAddSubscription] = useState(false);
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);

  if (!document) {
    return (
      <div
        className={`min-h-full p-6 md:p-8 flex flex-col items-center justify-center gap-4 ${
          isDarkMode ? "bg-gray-950 text-gray-400" : "bg-gray-50 text-gray-500"
        }`}
      >
        <div
          className={`w-8 h-8 border-3 rounded-full animate-spin ${
            isDarkMode
              ? "border-gray-700 border-t-indigo-500"
              : "border-gray-300 border-t-indigo-500"
          }`}
        />
        <span>Loading subscriptions...</span>
      </div>
    );
  }

  const { subscriptions, vendors, categories } = document.state.global;

  const tabs: { id: Tab; label: string; count: number }[] = [
    {
      id: "subscriptions",
      label: "Subscriptions",
      count: subscriptions.length,
    },
    { id: "vendors", label: "Vendors", count: vendors.length },
    { id: "categories", label: "Categories", count: categories.length },
  ];

  return (
    <div
      className={`min-h-full p-6 md:p-8 font-sans ${
        isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <DocumentToolbar className="mb-4" />

      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            {document.header.name || "Service Subscriptions"}
          </h1>
          <span
            className={`text-xs px-2.5 py-1 rounded-full border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-gray-400"
                : "bg-white border-gray-200 text-gray-500 shadow-sm"
            }`}
          >
            {subscriptions.length} active subscriptions
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-lg border cursor-pointer transition-all ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-gray-400 hover:text-gray-100 hover:border-indigo-500"
                : "bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:border-indigo-500 shadow-sm"
            }`}
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
          {activeTab === "subscriptions" && (
            <button
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors shadow-sm"
              onClick={() => setShowAddSubscription(true)}
            >
              <PlusIcon />
              Add Subscription
            </button>
          )}
          {activeTab === "vendors" && (
            <button
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors shadow-sm"
              onClick={() => setShowAddVendor(true)}
            >
              <PlusIcon />
              Add Vendor
            </button>
          )}
          {activeTab === "categories" && (
            <button
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors shadow-sm"
              onClick={() => setShowAddCategory(true)}
            >
              <PlusIcon />
              Add Category
            </button>
          )}
        </div>
      </header>

      <StatsOverview subscriptions={subscriptions} isDarkMode={isDarkMode} />

      <nav
        className={`flex gap-1 mb-6 p-1 rounded-lg w-fit border ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200 shadow-sm"
        }`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition-all ${
              activeTab === tab.id
                ? isDarkMode
                  ? "bg-gray-950 text-gray-100"
                  : "bg-gray-50 text-gray-900"
                : isDarkMode
                  ? "text-gray-400 hover:text-gray-100"
                  : "text-gray-500 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.id
                  ? "bg-indigo-500 text-white"
                  : isDarkMode
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </nav>

      <main className="mt-2">
        {activeTab === "subscriptions" && (
          <SubscriptionsList
            subscriptions={subscriptions}
            vendors={vendors}
            categories={categories}
            isDarkMode={isDarkMode}
          />
        )}
        {activeTab === "vendors" && (
          <VendorsList vendors={vendors} isDarkMode={isDarkMode} />
        )}
        {activeTab === "categories" && (
          <CategoriesList categories={categories} isDarkMode={isDarkMode} />
        )}
      </main>

      {showAddSubscription && (
        <AddSubscriptionModal
          vendors={vendors}
          categories={categories}
          onClose={() => setShowAddSubscription(false)}
          isDarkMode={isDarkMode}
        />
      )}
      {showAddVendor && (
        <AddVendorModal
          onClose={() => setShowAddVendor(false)}
          isDarkMode={isDarkMode}
        />
      )}
      {showAddCategory && (
        <AddCategoryModal
          onClose={() => setShowAddCategory(false)}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 3v10M3 8h10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
