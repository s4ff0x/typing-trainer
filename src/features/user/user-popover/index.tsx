import { useState } from "react";
import { Popover } from "../../../ui-kit/popover";

export const UserPopover: React.FC<{
  username: string;
  avatarUrl: string;
  popoverContent: React.ReactNode;
}> = ({ username, avatarUrl, popoverContent }) => {
  const [reference, setReference] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="flex cursor-pointer items-center space-x-4"
        ref={setReference}
        onClick={() => {
          setIsOpen((s) => !s);
        }}
      >
        <div className="text-l">{username || "Unknown username"}</div>

        {/*TODO: is it okay to use this kind of image in nextjs app ?*/}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className=" h-9 w-9 rounded-full bg-blue-200"
          alt={"avatar"}
          src={avatarUrl}
        />
      </div>
      <Popover
        reference={reference}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {popoverContent}
      </Popover>
    </>
  );
};
