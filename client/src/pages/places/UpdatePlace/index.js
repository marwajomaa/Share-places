import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal as AntdModal } from "antd";

import LoadingSpinner from "../../../common/LoadingSpinner";
import ErrorModal from "../../../common/ErrorModal";
import Input from "../../../common/Input";
import Button from "../../../common/Button";
import Card from "../../../common/Card";
import Title from "../../../common/Title";
import { useForm } from "../../../hooks/form-hook";
import { useHttpClient } from "../../../hooks/http-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../utils/validators";

const UpdatePlace = () => {
  const placeId = useParams().pId;
  const [loadedPlace, setLoadedPlace] = useState();
  // const [isLoading, setIsLoading] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchPlace = async () => {
      try {
        const res = await sendRequest(`/api/places/${placeId}`, { signal })
          .then((response) => {
            return response;
          })
          .catch((e) => {
            console.warn(`Fetch 1 error: ${e.message}`);
          });
        console.log(res.data.place);
        await setLoadedPlace(res.data.place);
        setFormData(
          {
            title: {
              value: res.data.place.title,
              isValid: true,
            },
            description: {
              value: res.data.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
    return () => {
      controller.abort();
    };
  }, [sendRequest, placeId, setFormData]);

  if (!loadedPlace && !error) {
    return (
      <div className="center" style={{ maxWidth: "400px", margin: "0 auto" }}>
        <Card>
          <h2>No place found!</h2>
        </Card>
      </div>
    );
  }

  const placeUpdateSubmitHandler = async (e) => {
    e.preventDefault();
    const data = {
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
    };

    try {
      const res = await sendRequest(`/api/places/${placeId}`, "PATCH", data);
      return AntdModal.success({
        content: "Place has been successfully updated",
      });
    } catch {}
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner asOverlay />
      ) : error ? (
        <ErrorModal error={error} onClear={clearError} />
      ) : (
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
              initialValue={loadedPlace.title}
              initialValid={true}
            />
            <Input
              element="textarea"
              id="description"
              label="Update description"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
              errorText="please enter valid description (min 5 chars) "
              onInput={inputHandler}
              initialValue={loadedPlace.description}
              initialValid={true}
            />
            <Button type="submit" disabled={!formState.isFormValid}>
              Update place
            </Button>
          </form>
        </>
      )}
    </>
  );
};

export default UpdatePlace;
