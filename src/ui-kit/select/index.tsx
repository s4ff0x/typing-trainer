import { Popover } from "../popover";
import { useState } from "react";
import Image from "next/image";
import type { Ref } from "../click-outside";

export interface Option {
  label: string;
  id: number;
}
interface SelectProps {
  options: Option[];
  value: Option | null;
  onSelect: (option: Option) => void;
  emptyLabel?: string;
  className?: string;
  renderOption?: (label: string, fragmentId: number) => React.ReactElement;
}
export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onSelect,
  emptyLabel = "Select",
  className,
  renderOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [reference, setReference] = useState<Ref>(null);

  return (
    <div className={className}>
      <div
        ref={setReference}
        onClick={() => {
          setIsOpen((s) => !s);
        }}
        className="flex h-12
        cursor-pointer select-none
        items-center justify-center rounded
        border border-gray-300 bg-white
        px-6 pr-5 hover:border-gray-400
        "
      >
        <span
          className={
            "max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap"
          }
        >
          {value ? value.label : emptyLabel}
        </span>
        <Image
          className={
            "ml-2 flex items-center justify-center" +
            ` ${isOpen ? "mt-1 rotate-180" : ""}`
          }
          width={20}
          height={20}
          src={"/img/chevron.svg"}
          alt={"select"}
        />
      </div>
      <Popover
        reference={reference}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {options.map((el: Option) => (
          <div
            key={el.id}
            onClick={() => {
              onSelect(el);
              setIsOpen(false);
            }}
            className={
              "text-m my-1 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap py-3 px-10 hover:bg-gray-100"
            }
          >
            {renderOption ? renderOption(el.label, el.id) : el.label}
          </div>
        ))}
      </Popover>
    </div>
  );
};
