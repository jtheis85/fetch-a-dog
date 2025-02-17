import React, { useEffect, useState } from "react";
import DogCard from "../../components/dog-card/DogCard";
import { Dog } from "../../api/data";
import api from "../../api/api";

interface Props {
  dogIds: string[];
  favorites: { [dogId: string]: Boolean };
  toggleFavorite: (dogId: string) => void;
}

/**
 * Displays a grid of dog cards based on the provided search result IDs
 */
const SearchResultsPage: React.FC<Props> = ({
  dogIds,
  favorites,
  toggleFavorite,
}) => {
  const [dogData, setDogData] = useState<{ [id: string]: Dog }>({});

  const getDogData = async () => {
    const resDogs = await api.getDogDetails(dogIds);
    const jsonDogs = await resDogs.json();

    // Map the list of dogs into an object keyed by dogId
    const newDogData = jsonDogs.reduce(
      (acc: { [key: string]: Dog }, cur: Dog) => {
        acc[cur.id] = cur;
        return acc;
      },
      {} as { [id: string]: Dog }
    );

    setDogData({ ...dogData, ...newDogData });
  };

  useEffect(() => {
    getDogData();
  }, [dogIds]);

  return (
    <section className="results">
      {dogIds
        .map((dogId) => dogData[dogId])
        .filter(Boolean)
        .map((dog) => (
          <DogCard
            key={dog.id}
            {...{ dog }}
            isFavorite={!!favorites[dog.id]}
            onClick={() => toggleFavorite(dog.id)}
          />
        ))}
    </section>
  );
};

export default SearchResultsPage;
