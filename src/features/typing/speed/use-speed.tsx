import { useCallback, useEffect, useRef } from "react";

export interface Speed {
  cpm: number;
  wpm: number;
  chars: number;
}

const getSpeedByTimeDelta = (
  startTime: number | null,
  endTime: number,
  text: string
): Speed => {
  if (!startTime) {
    return { cpm: -1, wpm: -1, chars: -1 };
  }

  const deltaInSeconds = (endTime - startTime) / 1000;
  const charsPerMinute = Math.round((text.length / deltaInSeconds) * 60);
  const wordsPerMinute = Math.round(charsPerMinute / 5);

  return {
    cpm: charsPerMinute,
    wpm: wordsPerMinute,
    chars: text.length,
  };
};

export const useSpeed = (inputText: string, currentLineText: string) => {
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (inputText && startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    } else if (!inputText) {
      startTimeRef.current = null;
    }
  }, [inputText]);

  useEffect(() => {
    if (!currentLineText) {
      startTimeRef.current = null;
    }
  }, [currentLineText]);

  const getLineSpeed = useCallback(() => {
    return getSpeedByTimeDelta(startTimeRef.current, Date.now(), inputText);
  }, [inputText]);

  return { getLineSpeed };
};
