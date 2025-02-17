import React, { PropsWithChildren } from "react";
import { FaTimes } from "react-icons/fa";

import "./dialog.css";

interface Props extends PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;

  /**
   * Whether the dialog is opened
   */
  isOpen: boolean;
  /**
   * A callback for when the dialog is closed
   */
  onClose: () => void;
}

/**
 * A component for displaying a generic centered dialog with a close button and
 * arbitrary content.
 *
 * TODO: Implement a non-controlled, local state version of this for convenience.
 */
const Dialog: React.FC<Props> = ({
  children,
  className,
  isOpen,
  onClose,
  style,
}) => {
  return (
    <dialog open={isOpen} {...{ className, style }}>
      <header>
        <button className="circle close" onClick={onClose}>
          <FaTimes />
        </button>
      </header>
      <section>{children}</section>
    </dialog>
  );
};

export default Dialog;
