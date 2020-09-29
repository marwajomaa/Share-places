import React, { useCallback, useReducer, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../../common/Input";
import Button from "../../../common/Button";
import ErrorModal from "../../../common/ErrorModal";
import LoadingSpinner from "../../../common/LoadingSpinner";
import Title from "../../../common/Title";
import { useForm } from "../../../hooks/form-hook";
import { useHttpClient } from "../../../hooks/http-hook";
import { AuthContext } from "../../../context/auth-context";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../utils/validators";
import "./style.css";

const NewPlace = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { userId } = auth;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = async (e) => {
    e.preventDefault();
    const data = {
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
      address: formState.inputs.address.value,
      creator: userId,
    };

    try {
      const res = await sendRequest("/api/places", "POST", data);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner asOverlay />
      ) : error ? (
        <ErrorModal error={error} onClear={clearError} />
      ) : (
        <>
          <Title label="Add New Place" />
          <form className="place-form" onSubmit={placeSubmitHandler}>
            <Input
              id="title"
              element="input"
              type="text"
              label="Add new place"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid place."
              onInput={inputHandler}
            />
            <Input
              id="description"
              element="textarea"
              type="text"
              label="Description"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid description (at least 5 characters)."
              onInput={inputHandler}
            />
            <Input
              id="address"
              element="input"
              type="text"
              label="Address"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid address."
              onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isFormValid}>
              ADD PLACE
            </Button>
          </form>
        </>
      )}
    </>
  );
};

export default NewPlace;
