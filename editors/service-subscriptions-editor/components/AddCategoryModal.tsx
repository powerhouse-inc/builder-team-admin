import { useState } from "react";
import { generateId } from "document-model/core";
import { useSelectedServiceSubscriptionsDocument } from "../../../document-models/service-subscriptions/hooks.js";
import { addCategory } from "../../../document-models/service-subscriptions/gen/creators.js";

interface AddCategoryModalProps {
  onClose: () => void;
  isDarkMode: boolean;
}

export function AddCategoryModal({
  onClose,
  isDarkMode,
}: AddCategoryModalProps) {
  const [, dispatch] = useSelectedServiceSubscriptionsDocument();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      alert("Name is required");
      return;
    }

    dispatch?.(
      addCategory({
        id: generateId(),
        name: formData.name,
        description: formData.description || undefined,
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
        className={`w-full max-w-md rounded-xl border ${
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
            Add Category
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
                placeholder="e.g., Development Tools, Cloud Infrastructure"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                autoFocus
              />
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea
                className={`${inputClass} resize-y`}
                placeholder="Optional description..."
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
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
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
