import React from "react";
import logo from "../../assets/Logo.png";
import api from "../../api/api";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";

interface Props {}

/**
 * The primary header for the search view.
 */
const SearchHeader: React.FC<Props> = ({}) => {
  const [, navigate] = useLocation();
  const { t } = useTranslation();
  return (
    <header>
      <img className="logo" src={logo} />
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
