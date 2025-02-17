import React from "react";
import { Dog } from "../../api/data";

import "./dog-card.css";
import { FaHeart } from "react-icons/fa6";

interface Props {
  dog: Dog;
  isFavorite: boolean;
  onClick: () => void;
}

/**
 * Component for displaying a single dog's information and photo
 */
const Card: React.FC<Props> = ({ dog, isFavorite, onClick }) => {
  return (
    <div
      {...{ onClick }}
      className={`dog-card ${isFavorite ? "favorite" : ""}`}
      // TODO: Is there a better way to merge multiple background images than
      // this?
      style={{
        backgroundImage: `linear-gradient(360deg, hsl(0 0% 100% / 67%) 10%, transparent 33%), url(${dog.img})`,
      }}
    >
      <FaHeart className="icon-favorite" />
      <h2 className="dog-name">
        {dog.name} <span className="dog-age">{dog.age}</span>
      </h2>
      <span className="dog-breed">{dog.breed}</span>
      <span className="dog-zip">{dog.zip_code}</span>
    </div>
  );
};

export default Card;
