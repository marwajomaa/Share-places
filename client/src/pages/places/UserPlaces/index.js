import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../../../components/places/PlaceList";
import Title from "../../../common/Title";
import Card from "../../../common/Card";
import ErrorModal from "../../../common/ErrorModal";
import LoadingSpinner from "../../../common/LoadingSpinner";
import { AuthContext } from "../../../context/auth-context";
import { useHttpClient } from "../../../hooks/http-hook";

const UserPlaces = () => {
  const auth = useContext(AuthContext);
  const { userId } = auth;

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userPlaces, setUserPlaces] = useState();

  useEffect(async () => {
    try {
      const userPlaces = await sendRequest(`/api/places/user/${userId}`);
      setUserPlaces(userPlaces.data.data);
    } catch (err) {
      console.warn(err.message);
    }
  }, [sendRequest]);

  if (!userPlaces) {
    return (
      <div className="center" style={{ maxWidth: "400px", margin: "0 auto" }}>
        <Card>
          <h2>No places found! You don't add any places!!!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <LoadingSpinner asOverlay />
      ) : error ? (
        <ErrorModal error={error} onClear={clearError} />
      ) : (
        <>
          <Title label="Your Places" />
          <PlaceList places={userPlaces} />
        </>
      )}
    </>
  );
};

export default UserPlaces;
