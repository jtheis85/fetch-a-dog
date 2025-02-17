import React from "react";
import { Dog } from "../../api/data";

import "./dog-card.css";

interface Props {
  dog: Dog;
}

/**
 * Component for displaying a single dog's information and photo
 */
const Card: React.FC<Props> = ({ dog }) => {
  return (
    <div
      className="dog-card"
      // TODO: Is there a better way to merge multiple background images than
      // this?
      style={{
        backgroundImage: `linear-gradient(360deg, hsl(0 0% 100% / 67%) 10%, transparent 33%), url(${dog.img})`,
      }}
    >
      <h2 className="dog-name">
        {dog.name} <span className="dog-age">{dog.age}</span>
      </h2>
      <span className="dog-breed">{dog.breed}</span>
      <span className="dog-zip">{dog.zip_code}</span>
    </div>
  );
};

export default Card;
