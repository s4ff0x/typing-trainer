import { api } from "@/src/utils/api";

export const useCreateCategory = (onCreate: () => void) => {
  const utils = api.useContext();
  const mutation = api.category.create.useMutation({
    onMutate: async () => {
      await utils.category.getAll.cancel(); // TODO: should be awaited ?
      onCreate();
    },
    onSettled: async () => {
      await utils.category.getAll.invalidate(); // TODO: should be awaited ?
    },
  });

  return { mutation };
};
