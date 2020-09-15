import React from "react";

import Card from "../../../common/Card";
import Button from "../../../common/Button";
import PlaceItem from "../PlaceItem";
import "./style.css";

const PlaceList = ({ places }) => {
  console.log(places);
  if (places.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. maybe add one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {places.map((place) => (
        <PlaceItem key={place.id} place={place} />
      ))}
    </ul>
  );
};

export default PlaceList;
