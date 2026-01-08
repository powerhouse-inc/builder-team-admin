import { useSelectedServiceSubscriptionsDocument } from "../../../document-models/service-subscriptions/hooks.js";
import { deleteCategory } from "../../../document-models/service-subscriptions/gen/creators.js";
import type { Category } from "../../../document-models/service-subscriptions/gen/types.js";

interface CategoriesListProps {
  categories: Category[];
  isDarkMode: boolean;
}

export function CategoriesList({
  categories,
  isDarkMode,
}: CategoriesListProps) {
  if (categories.length === 0) {
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
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          className={`text-base font-medium mb-2 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
        >
          No categories yet
        </div>
        <p>Add categories to organize your subscriptions.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  );
}

interface CategoryCardProps {
  category: Category;
  isDarkMode: boolean;
}

function CategoryCard({ category, isDarkMode }: CategoryCardProps) {
  const [, dispatch] = useSelectedServiceSubscriptionsDocument();

  const handleDelete = () => {
    if (confirm(`Delete category "${category.name}"?`)) {
      dispatch?.(deleteCategory({ id: category.id }));
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
          {category.name}
        </h3>
      </div>

      {category.description && (
        <div className="flex flex-col gap-2">
          <p
            className={`text-sm m-0 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            {category.description}
          </p>
        </div>
      )}

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
