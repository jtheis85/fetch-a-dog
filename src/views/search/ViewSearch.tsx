import React, { useEffect, useState } from "react";
import api from "../../api/api";
import SearchResultsPage from "./SearchResultsPage";
import { Dog, SearchResults } from "../../api/data";

import "./search.css";
import SearchHeader from "./SearchHeader";
import SearchFooter from "./SearchFooter";
import DialogDogMatch from "./DialogDogMatch";

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
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

  const pageSize = 25;
  const sortBy = "breed";
  const pageCount = Math.ceil(searchTotal / pageSize);
  const favoritesList = Object.keys(favorites).filter((key) => favorites[key]);
  const canMatch = favoritesList.length > 0;

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
        {...{ canMatch, favorites, isSortDesc, sortBy }}
        isSortNumeric={false}
        onChangeSortDir={(sortDir) => setIsSortDesc(sortDir === "desc")}
        onRequestMatch={async () => {
          const res = await api.matchDog(favoritesList);
          const json: { match: string } = await res.json();

          const resDogs = await api.getDogDetails([json.match]);
          const jsonDogs = await resDogs.json();

          // TODO: Be a little more careful here. There should only be one dog
          // in the results, but maybe handle if there aren't for some reason?
          setMatchedDog(jsonDogs[0]);
        }}
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
      <DialogDogMatch key={matchedDog?.id} dog={matchedDog} />
      <SearchFooter {...{ currentPage, pageCount, setCurrentPage }} />
    </div>
  );
};

export default ViewSearch;
