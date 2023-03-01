import { api } from "@/src/utils/api";

export const useCategoryMutations = (onSettled: () => void = () => null) => {
  const utils = api.useContext();
  const createMutation = api.category.create.useMutation({
    onSettled: async () => {
      await utils.category.getAll.invalidate();
      await utils.category.getSelected.invalidate();
      onSettled();
    },
  });
  const updateMutation = api.category.update.useMutation({
    onSettled: async () => {
      await utils.category.getAll.invalidate();
      await utils.category.getSelected.invalidate();
      onSettled();
    },
  });
  const selectMutation = api.category.select.useMutation({
    onSettled: async () => {
      await utils.category.getSelected.invalidate();
    },
  });
  return { createMutation, updateMutation, selectMutation };
};
