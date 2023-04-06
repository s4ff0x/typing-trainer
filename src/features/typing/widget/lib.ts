import type { Category } from "@prisma/client";

const MAX_LINE_LENGTH = 70;
export const parseFragmentsFromString = (fragmentsString: string) =>
  JSON.parse(fragmentsString || "[]") as string[];
export const getRandomFragment = (
  selectedCategory: Category | null | undefined
) => {
  if (!selectedCategory) return "";
  const fragments = parseFragmentsFromString(selectedCategory.fragments);
  return fragments[Math.floor(Math.random() * fragments.length)] || "";
};

export const getLinesFromFragment = (fragment: string) => {
  return fragment.split("\n").map((el) => el.trim().slice(0, MAX_LINE_LENGTH));
};
