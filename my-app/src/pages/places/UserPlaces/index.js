import React from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../../../components/places/PlaceList";

import { places } from "../../../constants/places";

const UserPlaces = () => {
  const userId = useParams().userId;
  const filteredPlaces = places.filter((place) => place.creator === userId);
  console.log(filteredPlaces, "-----------------");
  return <PlaceList places={filteredPlaces} />;
};

export default UserPlaces;
