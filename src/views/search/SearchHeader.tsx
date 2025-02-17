import React from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import logo from "../../assets/Logo.png";
import api from "../../api/api";
import MenuSortDirection, {
  Props as PropsMenuSortDirection,
} from "./MenuSortDirection";

import { FaHeart } from "react-icons/fa6";

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
  const [, navigate] = useLocation();
  const { t } = useTranslation();

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
        <button
          onClick={async () => {
            const res = await api.logout();

            // If we get a 401 back, the user's token has likely expired, and
            // they need to log in again anyway.
            // TODO: Consider unconditionally navigating to login to prevent
            // cases where the user is stuck not being able to get there due
            // to a server error that logging in again would fix.
            if (res.ok || res.status === 401) {
              navigate("/login");
            }
          }}
        >
          {t("searchButtonSignOut")}
        </button>
      </div>
    </header>
  );
};

export default SearchHeader;
