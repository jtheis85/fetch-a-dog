import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import api from "../../api/api";
import SearchResultsPage from "./SearchResultsPage";
import { SearchResults } from "../../api/data";

import "./search.css";

interface Props {}

/**
 * The primary search interface for the app
 */
const ViewSearch: React.FC<Props> = ({}) => {
  const [, navigate] = useLocation();
  const { t } = useTranslation();

  const [currentPageDogIds, setCurrentPageDogIds] = useState<string[]>([]);

  const searchDogs = async () => {
    // TEMP: Just get the first page for now to test
    const resSearch = await api.searchDogs();
    const jsonSearch: SearchResults = await resSearch.json();
    setCurrentPageDogIds(jsonSearch.resultIds);
  };

  useEffect(() => {
    searchDogs();
  }, []);

  return (
    <div className="view-search">
      <header>
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
      </header>
      <SearchResultsPage dogIds={currentPageDogIds} />
    </div>
  );
};

export default ViewSearch;
