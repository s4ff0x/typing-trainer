import { useEffect } from "react";

export type Ref = HTMLElement | null;

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref: Ref[], cb: () => void) {
  useEffect(() => {
    if (!ref) return;
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      for (let i = 0; i < ref.length; i++) {
        if (ref[i] && ref[i]?.contains(event.target as HTMLElement)) return;
      }
      cb && cb();
      event.stopPropagation();
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, cb]);
}

/**
 * Component that alerts if you click outside of it
 */
export default function ClickOutside({
  reference,
  children,
  onClickOutside,
}: {
  reference: Ref[];
  children: React.ReactNode;
  onClickOutside: () => void;
}) {
  useOutsideAlerter(reference, onClickOutside);

  return <>{children}</>;
}
