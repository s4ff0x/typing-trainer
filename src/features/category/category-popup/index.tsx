import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { Popup } from "@/src/ui-kit";
import { useCategoryMutations } from "@/src/features/category/use-category-mutations";
import { FragmentForm } from "@/src/features/fragment/fragment-form";
import { api } from "@/src/utils/api";

interface CategoryPopupProps {
  isOpened: boolean;
  categoryId: number | null;
  onClose: () => void;
}

export const CategoryPopup: React.FC<CategoryPopupProps> = ({
  isOpened,
  onClose,
  categoryId,
}) => {
  const categories = api.category.getAll.useQuery();
  const category = categories?.data?.find((el) => el.id === categoryId);
  const [name, setName] = useState("");
  const [fragments, setFragments] = useState<string[]>([]);

  useEffect(() => {
    setName(category?.name || "");
  }, [category?.name]);

  useEffect(() => {
    setFragments(
      (JSON.parse((category?.fragments as string) || "[]") as string[]) || []
    );
  }, [category?.fragments]);

  const { createMutation, updateMutation } = useCategoryMutations(onClose);

  return (
    <Popup onClose={onClose} isOpened={isOpened}>
      <div className={"popup-box"}>
        <div className={"mb-6 flex items-center"}>
          <h2 className={"text-3xl"}>Add new category</h2>
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={"Name"}
          className={"input-primary"}
        />
        {fragments.map((fragment, idx) => (
          <FragmentForm
            key={idx}
            onDelete={() => {
              setFragments(fragments.filter((_, idxInner) => idxInner !== idx));
            }}
            value={fragment}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setFragments((fragments) =>
                fragments.map((fragmentInner, idxInner) =>
                  idxInner === idx ? e.target.value : fragmentInner
                )
              );
            }}
          />
        ))}

        <button
          onClick={() => {
            setFragments([...fragments, ""]);
          }}
          className="button-outline button-small block"
        >
          Add Fragment
        </button>
        <button
          disabled={!name}
          onClick={() => {
            if (typeof categoryId === "number" && category) {
              updateMutation.mutate({
                name,
                categoryId,
                fragments: JSON.stringify(fragments),
              });
            } else {
              createMutation.mutate({
                name,
                fragments: JSON.stringify(fragments),
              });
            }
            setName("");
            setFragments([]);
          }}
          className="button-outline mt-10"
        >
          Save Category
        </button>
      </div>
    </Popup>
  );
};
