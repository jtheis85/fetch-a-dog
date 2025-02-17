import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import api from "../../api/api";

interface Props {}

/**
 * The primary search interface for the app
 */
const ViewSearch: React.FC<Props> = ({}) => {
  const [, navigate] = useLocation();
  const { t } = useTranslation();

  return (
    <button
      className="primary"
      onClick={async () => {
        const res = await api.logout();

        if (res.ok) {
          navigate("/login");
        }
      }}
    >
      {t("searchButtonSignOut")}
    </button>
  );
};

export default ViewSearch;
