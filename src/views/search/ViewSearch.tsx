import React, { useEffect, useState } from "react";
import api from "../../api/api";
import SearchResultsPage from "./SearchResultsPage";
import { SearchResults } from "../../api/data";

import "./search.css";
import SearchHeader from "./SearchHeader";
import SearchFooter from "./SearchFooter";

interface Props {}

/**
 * The primary search interface for the app
 */
const ViewSearch: React.FC<Props> = ({}) => {
  const [currentPageDogIds, setCurrentPageDogIds] = useState<string[]>([]);
  const [searchTotal, setSearchTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSortDesc, setIsSortDesc] = useState(false);
  const [favorites, setFavorites] = useState<{ [dogId: string]: Boolean }>({});
  const pageSize = 25;
  const pageCount = Math.ceil(searchTotal / pageSize);

  const sortBy = "breed";

  const searchDogs = async () => {
    // TEMP: Just get the first page for now to test
    const resSearch = await api.searchDogs({
      size: pageSize,
      from: currentPage * pageSize,
      sort: sortBy,
      sortDir: isSortDesc ? "desc" : "asc",
    });
    const jsonSearch: SearchResults = await resSearch.json();
    // TODO: Convert to useReducer to avoid multiple setState calls and possible
    // rerenders (although is React batching this now?)
    setSearchTotal(jsonSearch.total);
    setCurrentPageDogIds(jsonSearch.resultIds);
  };

  useEffect(() => {
    searchDogs();
  }, [currentPage, isSortDesc, pageSize, sortBy]);

  return (
    <div className="view-search">
      <SearchHeader
        {...{ isSortDesc, sortBy }}
        isSortNumeric={false}
        onChangeSortDir={(sortDir) => setIsSortDesc(sortDir === "desc")}
      />
      <SearchResultsPage
        dogIds={currentPageDogIds}
        {...{ favorites }}
        toggleFavorite={(dogId) =>
          setFavorites({
            ...favorites,
            [dogId]: !favorites[dogId],
          })
        }
      />
      <SearchFooter {...{ currentPage, pageCount, setCurrentPage }} />
    </div>
  );
};

export default ViewSearch;
