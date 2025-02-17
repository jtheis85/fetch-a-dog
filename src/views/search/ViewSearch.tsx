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
  // TODO: This has gotten a bit ugly. Should consider a reducer or possibly
  // Redux for managing all this state.
  const [currentPageDogIds, setCurrentPageDogIds] = useState<string[]>([]);
  const [searchTotal, setSearchTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortBy, setSortBy] = useState<"breed" | "age" | "name">("breed");
  const [isSortDesc, setIsSortDesc] = useState(false);
  const [favorites, setFavorites] = useState<{ [dogId: string]: Boolean }>({});
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [isShowBreedPopover, setIsShowBreedPopover] = useState(false);
  const [breedInclusion, setBreedInclusion] = useState<{
    [breedName: string]: Boolean;
  }>({});

  const pageSize = 25;
  const pageCount = Math.ceil(searchTotal / pageSize);
  const favoritesList = Object.keys(favorites).filter((key) => favorites[key]);
  const canMatch = favoritesList.length > 0;
  const includedBreeds = Object.keys(breedInclusion).filter(
    (key) => breedInclusion[key]
  );

  const searchDogs = async () => {
    // TEMP: Just get the first page for now to test
    const resSearch = await api.searchDogs({
      ...(includedBreeds.length > 0 ? { breeds: includedBreeds } : {}),
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
  }, [breedInclusion, currentPage, isSortDesc, pageSize, sortBy]);

  return (
    <div className="view-search">
      <SearchHeader
        {...{
          breedInclusion,
          canMatch,
          favorites,
          includedBreeds,
          isShowBreedPopover,
          isSortDesc,
          setBreedInclusion,
          setIsShowBreedPopover,
          sortBy,
        }}
        isSortNumeric={sortBy === "age"}
        onChangeSortBy={(sortBy) =>
          setSortBy(sortBy as "breed" | "age" | "name")
        }
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
