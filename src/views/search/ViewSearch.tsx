import React, { useEffect, useState } from "react";
import api from "../../api/api";
import SearchResultsPage from "./SearchResultsPage";
import { SearchResults } from "../../api/data";

import "./search.css";
import SearchHeader from "./SearchHeader";

interface Props {}

/**
 * The primary search interface for the app
 */
const ViewSearch: React.FC<Props> = ({}) => {
  const [currentPageDogIds, setCurrentPageDogIds] = useState<string[]>([]);

  const searchDogs = async () => {
    // TEMP: Just get the first page for now to test
    const resSearch = await api.searchDogs({ sort: "breed", sortDir: "asc" });
    const jsonSearch: SearchResults = await resSearch.json();
    setCurrentPageDogIds(jsonSearch.resultIds);
  };

  useEffect(() => {
    searchDogs();
  }, []);

  return (
    <div className="view-search">
      <SearchHeader />
      <SearchResultsPage dogIds={currentPageDogIds} />
    </div>
  );
};

export default ViewSearch;
