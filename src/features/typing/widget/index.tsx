import { api } from "@/src/utils/api";
import { useTypingInput } from "@/src/features/typing/input";
import {
  getLinesFromFragment,
  getRandomFragment,
} from "@/src/features/typing/widget/lib";
import { useEffect, useMemo, useState } from "react";
import { FirstLine, Line } from "@/src/features/typing/lines";

export const TypingWidget = () => {
  const selectedCategory = api.category.getSelected.useQuery().data;
  const [lines, setLines] = useState<string[]>([]);

  const currentFragment = useMemo(
    () => getRandomFragment(selectedCategory),
    [selectedCategory]
  );
  useEffect(() => {
    setLines(getLinesFromFragment(currentFragment));
  }, [currentFragment]);

  const popLine = () => {
    setLines((prev) => {
      const linesPopped = prev.slice(1, prev.length);
      if (typeof prev[0] === "string") linesPopped.push(prev[0]);
      return linesPopped;
    });
  };
  const currentLineText = lines[0] || "";

  const { typingInput, finishedPart, remainingPart } = useTypingInput(
    (speed) => {
      console.log("finished", speed);
      popLine();
    },
    currentLineText
  );
  return (
    <div className="mx-auto mt-20 flex w-[960px] flex-col gap-4">
      {typingInput}
      <div className={"mb-1"}></div>
      <FirstLine finishedPart={finishedPart} remainingPart={remainingPart} />
      {lines.slice(1, 3).map((el, idx) => (
        <Line text={el} key={idx} />
      ))}
    </div>
  );
};
