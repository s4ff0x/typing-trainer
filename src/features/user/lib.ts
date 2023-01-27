import { useSession } from "next-auth/react";

export const calcUsername = (username: string | undefined | null) =>
  username || "unknownUsername";
export const calcAvatarUrl = (username: string) =>
  `https://www.gravatar.com/avatar/${username}?d=identicon`;

export const useIsAuthed = () => {
  const { data: sessionData } = useSession();
  const id = sessionData?.user?.id;

  return !!id;
};
