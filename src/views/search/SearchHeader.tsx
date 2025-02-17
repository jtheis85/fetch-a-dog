import React from "react";
import logo from "../../assets/Logo.png";
import MenuSortDirection, {
  Props as PropsMenuSortDirection,
} from "./MenuSortDirection";

import { FaHeart } from "react-icons/fa6";
import MenuAccount from "./MenuAccount";

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
  return (
    <header>
      <img className="logo" src={logo} />
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
            <FaHeart /> Find my Match!
          </>
        </button>
        <MenuAccount />
      </div>
    </header>
  );
};

export default SearchHeader;
