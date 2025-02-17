import React from "react";
import MenuButton from "../../components/menu-button/MenuButton";
import { useTranslation } from "react-i18next";

import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaUpAlt } from "react-icons/fa";
import { FaSortNumericDown } from "react-icons/fa";
import { FaSortNumericUpAlt } from "react-icons/fa";

export interface Props {
  /**
   * Whether the current sort direction is descending
   */
  isSortDesc: boolean;
  /**
   * Whether the current sort is numeric or not
   */
  isSortNumeric: boolean;
  /**
   * Callback for when the sort direction changes
   */
  onChangeSortDir: (sortBy: string) => void;
}

/**
 * Menu button for changing sort direction
 */
const MenuSortDirection: React.FC<Props> = ({
  isSortDesc,
  isSortNumeric,
  onChangeSortDir,
}) => {
  const { t } = useTranslation();

  return (
    <MenuButton
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
      onChange={onChangeSortDir}
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
