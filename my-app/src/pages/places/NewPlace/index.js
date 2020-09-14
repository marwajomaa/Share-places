import React from "react";

import Input from "../../../common/Input";
import { VALIDATOR_REQUIRE } from "../../../utils/validators";
import "./style.css";

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input
        element="input"
        type="text"
        label="Add new place"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
      />
    </form>
  );
};

export default NewPlace;
