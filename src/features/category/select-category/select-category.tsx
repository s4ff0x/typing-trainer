import { api } from "@/src/utils/api";
import type { Option } from "@/src/ui-kit/select";
import { Select } from "@/src/ui-kit/select";
import type { Category } from "@prisma/client";
import { useState } from "react";

export const SelectCategory = () => {
  const categories = api.category.getAll.useQuery();
  const [selectedCategory, setSelectedCategory] = useState<Option>({
    label: "unknown category",
    id: NaN, // TODO: is it a bad practice? (question to the audience)
  });

  console.log(categories);

  const { label, id } = selectedCategory;
  return (
    <Select
      value={{
        label,
        id,
      }}
      onSelect={(item: Option) => {
        setSelectedCategory(item);
      }}
      renderOption={(label) => {
        return (
          <span className={"flex w-full items-center justify-between"}>
            <span className={"mr-2"}>{label}</span>
          </span>
        );
      }}
      options={
        categories?.data?.map((el: Category) => ({
          label: el.name,
          id: el.id,
        })) || []
      }
    />
  );
};
