import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { calcCurrentLineParts } from "@/src/features/typing/input/lib";
import type { Speed } from "@/src/features/typing/speed/use-speed";
import { useSpeed } from "@/src/features/typing/speed/use-speed";

export const useTypingInput = (
  onFinishLine: (speed: Speed, currentLineText: string) => void,
  currentLineText: string
) => {
  const [inputText, setInputText] = useState("");
  const [focus, setFocus] = useState(false);

  const [valid, setValid] = useState(true);
  const { finishedPart, mistypedPart, remainingPart } = calcCurrentLineParts(
    inputText,
    currentLineText
  );
  const { getLineSpeed } = useSpeed(inputText, currentLineText);
  const reference = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (reference.current) {
      reference.current.focus();
    }
  }, [currentLineText]);

  const resetInput = () => {
    setInputText("");
    setValid(true);
  };

  const performLineChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setValid(true);
    } else if (
      event.target.value === currentLineText.slice(0, event.target.value.length)
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  };
  const getOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    // TODO: resolve ts problem
    // @ts-ignore
    if (event.nativeEvent.data === " " && inputText === currentLineText) {
      onFinishLine(getLineSpeed(), currentLineText); // finishing line
      resetInput();
      return;
    }
    performLineChange(event);
    const value = event.target.value.trimStart();
    setInputText(value);
  };

  return {
    finishedPart,
    remainingPart,
    mistypedPart,
    typingInput: (
      <>
        <div className={"relative w-[100%]"}>
          <div
            onClick={(e) => e.preventDefault()}
            className={"main-input-mask"}
          >
            <span>{finishedPart}</span>
            <span className={"text-red-500"}>{mistypedPart}</span>

            {/* placeholder element */}
            {!focus && !inputText && (
              <span className={"text-gray-300"}>Start typing</span>
            )}
          </div>
          <input
            tabIndex={0}
            value={inputText}
            onChange={(e) => {
              getOnChange(e);
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => {
              resetInput();
              setFocus(false);
            }}
            className={
              "tracking-medium relative w-[100%] flex-shrink-0 rounded-md border-2 border-gray-300 " +
              "bg-transparent p-7 py-5 text-xl font-bold text-[rgba(0,0,0,0)] " +
              `caret-gray-800 outline-none focus:border-gray-500 active:border-gray-500 ${
                !valid ? "focus:border-red-400 active:border-red-400" : ""
              }`
            }
          />
        </div>
      </>
    ),
  };
};
