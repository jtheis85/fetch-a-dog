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
  const [isSortDesc, setIsSortDesc] = useState(false);
  const [favorites, setFavorites] = useState<{ [dogId: string]: Boolean }>({});

  const sortBy = "breed";

  const searchDogs = async () => {
    // TEMP: Just get the first page for now to test
    const resSearch = await api.searchDogs({
      sort: sortBy,
      sortDir: isSortDesc ? "desc" : "asc",
    });
    const jsonSearch: SearchResults = await resSearch.json();
    setCurrentPageDogIds(jsonSearch.resultIds);
  };

  useEffect(() => {
    searchDogs();
  }, [isSortDesc]);

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
    </div>
  );
};

export default ViewSearch;
