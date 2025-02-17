import React from "react";

import { FaHeart } from "react-icons/fa6";

import logo from "../../assets/Logo.png";
import logoMobile from "../../assets/Logo-Mobile.png";

import MenuSortDirection, {
  Props as PropsMenuSortDir,
} from "./MenuSortDirection";
import MenuSortBy, { Props as PropsMenuSortBy } from "./MenuSortBy";
import MenuAccount from "./MenuAccount";
import { useTranslation } from "react-i18next";
import MenuFilter, { Props as PropsMenuFilter } from "./MenuFilter";

interface Props
  extends PropsMenuFilter,
    Omit<PropsMenuSortDir, "onChange">,
    Omit<PropsMenuSortBy, "onChange"> {
  favorites: { [dogId: string]: Boolean };
  canMatch: boolean;
  onRequestMatch: () => void;
  /**
   * Callback for when the sort type changes
   */
  onChangeSortBy: PropsMenuSortBy["onChange"];
  /**
   * Callback for when the sort direction changes
   */
  onChangeSortDir: PropsMenuSortDir["onChange"];
}

/**
 * The primary header for the search view.
 */
const SearchHeader: React.FC<Props> = ({
  canMatch,
  isSortDesc,
  isSortNumeric,
  onChangeSortBy,
  onChangeSortDir,
  onRequestMatch,
  sortBy,

  breedInclusion,
  includedBreeds,
  isShowBreedPopover,
  setBreedInclusion,
  setIsShowBreedPopover,
}) => {
  const { t } = useTranslation();
  return (
    <header>
      <img className="logo" src={logo} />
      <img className="logo-mobile" src={logoMobile} />
      <div className="left">
        <MenuFilter
          {...{
            breedInclusion,
            includedBreeds,
            isShowBreedPopover,
            setBreedInclusion,
            setIsShowBreedPopover,
          }}
        />
        <MenuSortDirection
          {...{
            isSortDesc,
            isSortNumeric,
          }}
          onChange={onChangeSortDir}
        />
        <MenuSortBy {...{ sortBy }} onChange={onChangeSortBy} />
      </div>
      <div className="right">
        <button
          disabled={!canMatch}
          className={`button-match ${canMatch ? "primary" : ""}`}
          onClick={onRequestMatch}
        >
          <>
            <FaHeart />
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
