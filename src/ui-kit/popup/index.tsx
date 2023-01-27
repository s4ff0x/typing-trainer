import Portal from "../portal";

interface PopupProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpened: boolean;
}

export const Popup: React.FC<PopupProps> = ({
  children,
  onClose,
  isOpened,
}) => {
  if (!isOpened) {
    return null;
  }

  return (
    <Portal>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-20"
        role="dialog"
      >
        <div
          className="absolute top-0 left-0 right-0 bottom-0"
          tabIndex={0}
          role="button"
          onClick={onClose}
        />
        <div
          className="content z-1 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};
