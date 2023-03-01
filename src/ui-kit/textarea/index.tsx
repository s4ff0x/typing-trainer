import type { ChangeEvent, FC } from "react";

interface ITextareaProps {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  placeholder?: string;
}
export const Textarea: FC<ITextareaProps> = ({
  onChange,
  value,
  placeholder,
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input-primary min-h-[200px] overflow-hidden`}
    ></textarea>
  );
};
