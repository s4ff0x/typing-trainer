import { useState } from "react";
import { Popup } from "@/src/ui-kit";
import { useCreateCategory } from "@/src/features/category/create-category/use-create-category";

interface CreateCategoryPopupProps {
  isOpened: boolean;
  onClose: () => void;
}

export const CreateCategoryPopup: React.FC<CreateCategoryPopupProps> = ({
  isOpened,
  onClose,
}) => {
  const [name, setName] = useState("");
  const { mutation } = useCreateCategory(onClose);

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

        <button
          disabled={!name}
          onClick={() => {
            mutation.mutate({
              name,
            });
            setName("");
          }}
          className="button-outline"
        >
          Add
        </button>
      </div>
    </Popup>
  );
};
