import React from "react";

interface FirstLineProps {
  finishedPart: string;
  remainingPart: string;
}
interface LineProps {
  text: string;
}

export const FirstLine: React.FC<FirstLineProps> = React.memo(
  ({ finishedPart, remainingPart }) => {
    return (
      <pre className={`text-xl font-bold text-gray-800`}>
        <span className={"text-gray-200"}>{finishedPart}</span>

        <span className={"relative"}>
          <span
            className={"absolute left-0 bottom-0 w-2 border border-black"}
          />
          {remainingPart}
        </span>
      </pre>
    );
  }
);

export const Line: React.FC<LineProps> = React.memo(({ text }) => {
  return <pre className={`text-xl font-semibold text-gray-400`}>{text}</pre>;
});
