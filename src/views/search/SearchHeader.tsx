import React from "react";

import { FaHeart } from "react-icons/fa6";

import logo from "../../assets/Logo.png";
import logoMobile from "../../assets/Logo-Mobile.png";

import MenuSortDirection, {
  Props as PropsMenuSortDirection,
} from "./MenuSortDirection";
import MenuAccount from "./MenuAccount";
import { useTranslation } from "react-i18next";

interface Props extends PropsMenuSortDirection {
  favorites: { [dogId: string]: Boolean };
  canMatch: boolean;
  onRequestMatch: () => void;
}

/**
 * The primary header for the search view.
 */
const SearchHeader: React.FC<Props> = ({
  canMatch,
  isSortDesc,
  isSortNumeric,
  onChangeSortDir,
  onRequestMatch,
}) => {
  const { t } = useTranslation();
  return (
    <header>
      <img className="logo" src={logo} />
      <img className="logo-mobile" src={logoMobile} />
      <div className="left">
        <MenuSortDirection
          {...{
            isSortDesc,
            isSortNumeric,
            onChangeSortDir,
          }}
        />
      </div>
      <div className="right">
        <button
          disabled={!canMatch}
          className={`button-match ${canMatch ? "primary" : ""}`}
          onClick={onRequestMatch}
        >
          <>
            <FaHeart />{" "}
            <label className="responsive-wide">{t("searchButtonMatch")}</label>
            <label className="responsive-narrow">
              {t("searchButtonMatchNarrow")}
            </label>
          </>
        </button>
        <MenuAccount />
      </div>
    </header>
  );
};

export default SearchHeader;
