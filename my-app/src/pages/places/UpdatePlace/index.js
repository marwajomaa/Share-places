import React from "react";
import { useParams } from "react-router-dom";

import { places } from "../../../constants/places";
import Input from "../../../common/Input";
import Button from "../../../common/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../utils/validators";

const UpdatePlace = () => {
  const placeId = useParams().pId;

  const identifiedPlace = places.find((p) => p.id === placeId);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>No place found!</h2>
      </div>
    );
  }

  return (
    <form className="place-form">
      <Input
        element="input"
        type="text"
        id="title"
        label="Update title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="please enter valid title"
        onInput={() => {}}
        value={identifiedPlace.title}
        valid={true}
      />
      <Input
        element="textarea"
        id="description"
        label="Update description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="please enter valid description (min 5 chars) "
        onInput={() => {}}
        value={identifiedPlace.description}
        valid={true}
      />
      <Button type="submit">Update place</Button>
    </form>
  );
};

export default UpdatePlace;
