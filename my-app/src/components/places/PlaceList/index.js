import React from "react";

import Card from "../../../common/Card";
import PlaceItem from "../PlaceItem";
import "./style.css";

const PlaceList = ({ places }) => {
  console.log(places);
  if (places.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. maybe add one?</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {places.map((place) => (
        <PlaceItem key={place.id} {...place} />
      ))}
    </ul>
  );
};

export default PlaceList;
