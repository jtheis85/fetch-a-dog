import React, { ReactNode, useEffect, useState } from "react";
import MenuButton from "../../components/menu-button/MenuButton";
import api from "../../api/api";
import { useTranslation } from "react-i18next";

export type BreedInclusion = { [breedName: string]: Boolean };

export interface Props {
  breedInclusion: BreedInclusion;
  setBreedInclusion: (value: BreedInclusion) => void;
  includedBreeds: string[];
  isShowBreedPopover: boolean;
  setIsShowBreedPopover: (value: boolean) => void;
}

/**
 * Control for filtering by dog breed
 */
const MenuFilter: React.FC<Props> = ({
  breedInclusion,
  includedBreeds,
  isShowBreedPopover,
  setBreedInclusion,
  setIsShowBreedPopover,
}) => {
  const { t } = useTranslation();

  const [allBreeds, setAllBreeds] = useState<string[]>([]);
  const [searchBreeds, setSearchBreeds] = useState("");

  const getBreeds = async () => {
    const resBreeds = await api.dogBreeds();
    const jsonBreeds = await resBreeds.json();
    setAllBreeds(jsonBreeds);
  };

  useEffect(() => {
    getBreeds();
  }, []);

  return (
    <MenuButton
      menuAlignSide="popover-align-side-left"
      className="filter-breed"
      isShowPopoverControlled={isShowBreedPopover}
      setIsShowPopoverControlled={setIsShowBreedPopover}
      isHideOnSelect={false}
      menuTop={
        <>
          <label style={{ whiteSpace: "nowrap" }}>
            {t("searchMenuTitleFilterBreeds")}
          </label>
          <input
            placeholder="Search..."
            value={searchBreeds}
            onChange={(e) => setSearchBreeds(e.target.value)}
          ></input>
          <button
            disabled={includedBreeds.length === 0}
            onClick={() => setBreedInclusion({})}
          >
            {t("searchButtonAllBreeds")}
          </button>
        </>
      }
      menuOptionContents={allBreeds.reduce(
        (acc: { [key: string]: ReactNode }, cur) => {
          if (cur.toLowerCase().includes(searchBreeds.toLowerCase())) {
            acc[cur] = <>{cur}</>;
          }
          return acc;
        },
        {}
      )}
      toggledKeys={includedBreeds}
      onChange={(key) => {
        if (includedBreeds.length === 1 && breedInclusion[key]) {
          // Deselecting the only chosen one? Reset it all
          setBreedInclusion({});
        } else {
          setBreedInclusion({
            ...breedInclusion,
            [key]: !breedInclusion[key],
          });
        }
      }}
    >
      {includedBreeds.length === 0 ? "All" : includedBreeds.length}{" "}
      <span style={{ opacity: 0.5 }}>
        {includedBreeds.length === 1 ? "breed" : "breeds"}
      </span>
    </MenuButton>
  );
};

export default MenuFilter;
