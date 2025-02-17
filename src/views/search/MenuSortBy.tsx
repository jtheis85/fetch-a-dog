import React from "react";
import { useTranslation } from "react-i18next";

import MenuButton, {
  Props as PropsMenuButton,
} from "../../components/menu-button/MenuButton";

export interface Props extends Pick<PropsMenuButton, "onChange"> {
  sortBy: "breed" | "age" | "name";
}

const MenuSortBy: React.FC<Props> = ({ onChange, sortBy }) => {
  const { t } = useTranslation();
  return (
    <MenuButton
      menuAlignSide="popover-align-side-left"
      menuTop={
        <label style={{ whiteSpace: "nowrap" }}>
          {t("searchMenuTitleSortBy")}
        </label>
      }
      menuOptionContents={{
        breed: "breed",
        age: "age",
        name: "name",
      }}
      toggledKeys={[sortBy]}
      {...{ onChange }}
    >
      <label className="responsive-wide" style={{ opacity: 0.5 }}>
        {t("searchButtonSortBy")}
      </label>
      <label className="responsive-narrow" style={{ opacity: 0.5 }}>
        {t("searchButtonSortByNarrow")}
      </label>
      {sortBy === "breed" ? "breed" : sortBy === "age" ? "age" : "name"}
    </MenuButton>
  );
};

export default MenuSortBy;
