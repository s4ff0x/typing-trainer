function getEscapedText(text: string): string {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
export const getRegExp = (inputText: string) => {
  const escapedText = getEscapedText(inputText);
  return new RegExp(`(^${escapedText})(.*)`, "");
};

export const calcCurrentLineParts = (
  inputText: string,
  currentLine: string
): {
  finishedPart: string;
  remainingPart: string;
  mistypedPart: string;
} => {
  const getReturnValue = (
    finishedPart = "",
    remainingPart = currentLine,
    mistypedPart = inputText
  ) => ({
    finishedPart,
    remainingPart,
    mistypedPart,
  });

  for (let i = 0; i < inputText.length; i++) {
    const reg = getRegExp(inputText.slice(0, i + 1));
    const match = currentLine.match(reg);

    if (!match || i === inputText.length - 1) {
      const idx = !match ? i : i + 1;

      return getReturnValue(
        inputText.slice(0, idx),
        currentLine.slice(idx, currentLine.length),
        inputText.slice(idx, inputText.length)
      );
    }
  }
  return getReturnValue();
};
