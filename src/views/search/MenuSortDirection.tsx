import React from "react";
import MenuButton, {
  Props as PropsMenuButton,
} from "../../components/menu-button/MenuButton";
import { useTranslation } from "react-i18next";

import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaUpAlt } from "react-icons/fa";
import { FaSortNumericDown } from "react-icons/fa";
import { FaSortNumericUpAlt } from "react-icons/fa";

export interface Props extends Pick<PropsMenuButton, "onChange"> {
  /**
   * Whether the current sort direction is descending
   */
  isSortDesc: boolean;
  /**
   * Whether the current sort is numeric or not
   */
  isSortNumeric: boolean;
}

/**
 * Menu button for changing sort direction
 */
const MenuSortDirection: React.FC<Props> = ({
  isSortDesc,
  isSortNumeric,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <MenuButton
      menuAlignSide="popover-align-side-left"
      menuTop={
        <label style={{ whiteSpace: "nowrap" }}>
          {t("searchMenuTitleSortDir")}
        </label>
      }
      menuOptionContents={{
        asc: (
          <>
            {isSortNumeric ? <FaSortNumericDown /> : <FaSortAlphaDown />}{" "}
            {t("searchMenuItemSortDirAsc")}
          </>
        ),
        desc: (
          <>
            {isSortNumeric ? <FaSortNumericUpAlt /> : <FaSortAlphaUpAlt />}{" "}
            {t("searchMenuItemSortDirDesc")}
          </>
        ),
      }}
      toggledKeys={[isSortDesc ? "desc" : "asc"]}
      {...{ onChange }}
    >
      {isSortDesc ? (
        isSortNumeric ? (
          <FaSortNumericUpAlt />
        ) : (
          <FaSortAlphaUpAlt />
        )
      ) : isSortNumeric ? (
        <FaSortNumericDown />
      ) : (
        <FaSortAlphaDown />
      )}
    </MenuButton>
  );
};

export default MenuSortDirection;
