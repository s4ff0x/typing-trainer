import type { FC } from "react";
import { Textarea } from "@/src/ui-kit";
import type { ChangeEvent } from "react";
import Image from "next/image";
interface IFragmentFormProps {
  onDelete: () => void;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}
export const FragmentForm: FC<IFragmentFormProps> = ({
  onDelete,
  onChange,
  value,
}) => {
  return (
    <div className={"relative"}>
      <button className={"absolute right-4 top-4 z-10"} onClick={onDelete}>
        <Image
          width={20}
          height={20}
          src={"/img/trash-outline.svg"}
          alt={"delete"}
        />
      </button>
      <Textarea
        onChange={onChange}
        value={value}
        placeholder={"Paste your fragment here"}
      />
    </div>
  );
};
