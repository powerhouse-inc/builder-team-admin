import type { ServiceSubscriptionsCategoriesOperations } from "../../gen/categories/operations.js";

export const serviceSubscriptionsCategoriesOperations: ServiceSubscriptionsCategoriesOperations =
  {
    addCategoryOperation(state, action) {
      state.categories.push({
        id: action.input.id,
        name: action.input.name,
        description: action.input.description || null,
      });
    },
    updateCategoryOperation(state, action) {
      const category = state.categories.find((c) => c.id === action.input.id);
      if (!category) return;
      if (action.input.name) category.name = action.input.name;
      if (action.input.description)
        category.description = action.input.description;
    },
    deleteCategoryOperation(state, action) {
      const categoryIndex = state.categories.findIndex(
        (c) => c.id === action.input.id,
      );
      if (categoryIndex === -1) return;
      state.categories.splice(categoryIndex, 1);
    },
  };
