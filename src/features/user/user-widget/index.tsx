import { signIn, signOut, useSession } from "next-auth/react";
import { calcAvatarUrl, calcUsername } from "../lib";
import { UserPopover } from "../user-popover";

export const UserWidget = () => {
  const { data: sessionData } = useSession();

  const username = calcUsername(sessionData?.user?.name);

  return (
    <div>
      {!sessionData && (
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold  no-underline transition hover:bg-white/20"
          onClick={() => signIn()}
        >
          {"Sign in"}
        </button>
      )}
      {sessionData && (
        <UserPopover
          username={username}
          avatarUrl={calcAvatarUrl(username)}
          popoverContent={
            <div>
              <div
                onClick={() => signOut()}
                className={
                  "text-m my-1 cursor-pointer py-3 px-10 text-red-500 hover:bg-gray-100"
                }
              >
                Sign out
              </div>
            </div>
          }
        />
      )}
    </div>
  );
};
