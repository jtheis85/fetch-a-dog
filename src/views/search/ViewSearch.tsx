import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import api from "../../api/api";

import DogCard from "../../components/dog-card/DogCard";

interface Props {}

/**
 * The primary search interface for the app
 */
const ViewSearch: React.FC<Props> = ({}) => {
  const [, navigate] = useLocation();
  const { t } = useTranslation();

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
      <DogCard
        dog={{
          img: "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_10976.jpg",
          name: "Emory",
          age: 10,
          breed: "Chihuahua",
          zip_code: "48333",
          id: "VXGFTIcBOvEgQ5OCx40W",
        }}
      />
    </div>
  );
};

export default ViewSearch;
