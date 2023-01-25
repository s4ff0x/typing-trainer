import React, { useState } from "react";
import { usePopper } from "react-popper";
import Portal from "../portal";
import type { Ref } from "../click-outside";
import ClickOutside from "../click-outside";
import type { Placement } from "@popperjs/core";

interface PopoverProps {
  isOpen: boolean;
  reference: Ref;
  onClose: () => void;
  children: React.ReactNode;
  placement?: Placement;
}

export const Popover: React.FC<PopoverProps> = ({
  isOpen,
  reference,
  onClose,
  placement = "bottom-start",
  children,
}) => {
  const [popperElement, setPopperElement] = useState<Ref>(null);
  const { styles, attributes } = usePopper(reference, popperElement, {
    modifiers: [{ name: "arrow" }],
    placement,
  });

  return (
    <Portal>
      <ClickOutside
        reference={[popperElement, reference]}
        onClickOutside={onClose}
      >
        {isOpen && (
          <div
            ref={setPopperElement}
            className={
              "scrollbar-container box-border max-h-[30vh] max-w-[300px]  " +
              "overflow-y-auto overflow-x-hidden rounded bg-white shadow-md"
            }
            style={styles.popper}
            {...attributes.popper}
          >
            {children}
          </div>
        )}
      </ClickOutside>
    </Portal>
  );
};
