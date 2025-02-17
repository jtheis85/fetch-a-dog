import React from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import logo from "../../assets/Logo.png";
import api from "../../api/api";
import MenuSortDirection, {
  Props as PropsMenuSortDirection,
} from "./MenuSortDirection";

interface Props extends PropsMenuSortDirection {}

/**
 * The primary header for the search view.
 */
const SearchHeader: React.FC<Props> = ({
  isSortDesc,
  isSortNumeric,
  onChangeSortDir,
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
          onClick={async () => {
            const res = await api.logout();

            if (res.ok) {
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
