import React, { PropsWithChildren, ReactNode, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

import "./menu-button.css";

interface Props extends PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;

  /**
   * Whether to hide the menu when an option is selected
   */
  isHideOnSelect?: boolean;
  /**
   * Whether the menu's state is controlled by the parent component, or
   * internally within the menu component itself. Requires
   * setIsShowPopoverControlled to work properly.
   */
  isShowPopoverControlled?: boolean;
  /**
   * Whether to show the menu in the top or bottom relative to the button
   */
  menuDirection?: "popover-direction-bottom" | "popover-direction-top";
  /**
   * Arbitrary content to display at the top of the menu before the options
   */
  menuTop?: ReactNode;
  /**
   * The content to display for each menu option, keyed by the optionId
   */
  menuOptionContents: { [key: string]: ReactNode };
  /**
   * Callback for when a menu option is selected, passing back the selected
   * optionId
   */
  onChange: (key: string) => void;
  /**
   * Callback for changing the externally controlled state of whether to show
   * the popover. Requires isShowPopoverControlled to work properly.
   */
  setIsShowPopoverControlled?: (value: boolean) => void;
  /**
   * Which options are currently selected
   */
  toggledKeys: string[];
}

const MenuButton: React.FC<Props> = ({
  className,
  style,

  isHideOnSelect = true,
  isShowPopoverControlled,
  setIsShowPopoverControlled,
  menuDirection = "popover-direction-bottom",
  menuOptionContents,
  menuTop,
  onChange,
  children,
  toggledKeys,
}) => {
  // Setup local state to be used if not provided with state from the parent.
  // Ignored if parent state is provided.
  const [isShowPopoverLocalState, setIsShowPopoverLocalState] = useState(false);
  const isShowPopover =
    isShowPopoverControlled !== undefined
      ? isShowPopoverControlled
      : isShowPopoverLocalState;
  const setIsShowPopover =
    setIsShowPopoverControlled !== undefined
      ? setIsShowPopoverControlled
      : setIsShowPopoverLocalState;
  return (
    <button
      className={`menu-button ${menuDirection} ${className}`}
      {...{ style }}
      onClick={() => setIsShowPopover(!isShowPopover)}
    >
      {children}
      {menuDirection === "popover-direction-top" ? (
        <FaCaretUp className="caret" />
      ) : (
        <FaCaretDown className="caret" />
      )}
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className={`popover ${isShowPopover ? "show" : "hide"}`}
      >
        {menuTop}
        <div className="options">
          {Object.keys(menuOptionContents).map((key) => (
            // TODO: React complains that a button nested inside of another
            // button is not valid HTML. Consider wrapping the button in a
            // position: relative containing div and making the popover a child
            // of that instead.
            <button
              key={key}
              className={`button-menu-option ${
                toggledKeys.includes(key)
                  ? "selected"
                  : toggledKeys.length > 0
                  ? "unselected"
                  : ""
              }`}
              onClick={() => {
                onChange(key);
                isHideOnSelect && setIsShowPopover(false);
              }}
            >
              {menuOptionContents[key]}
            </button>
          ))}
        </div>
      </div>
    </button>
  );
};

export default MenuButton;
