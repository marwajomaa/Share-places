import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { places } from "../../../constants/places";
import Input from "../../../common/Input";
import Button from "../../../common/Button";
import Card from "../../../common/Card";
import Title from "../../../common/Title";
import { useForm } from "../../../hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../utils/validators";

const UpdatePlace = () => {
  const placeId = useParams().pId;
  const identifiedPlace = places.find((p) => p.id === placeId);
  const [isLoading, setIsLoading] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    true
  );

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  if (!identifiedPlace) {
    return (
      <div className="center" style={{ maxWidth: "400px", margin: "0 auto" }}>
        <Card>
          <h2>No place found!</h2>
        </Card>
      </div>
    );
  }

  const placeUpdateSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs, formState.isFormValid);
  };

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <Title label="Update place" />
      <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input
          element="input"
          type="text"
          id="title"
          label="Update title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="please enter valid title"
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
        />
        <Input
          element="textarea"
          id="description"
          label="Update description"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText="please enter valid description (min 5 chars) "
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isFormValid}>
          Update place
        </Button>
      </form>
    </>
  );
};

export default UpdatePlace;
