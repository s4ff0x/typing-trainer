export const calcUsername = (username: string | undefined | null) =>
  username || "unknownUsername";
export const calcAvatarUrl = (username: string) =>
  `https://www.gravatar.com/avatar/${username}?d=identicon`;
