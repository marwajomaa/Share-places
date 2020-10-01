import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Modal as AntdModal } from "antd";

import Card from "../../../common/Card";
import Button from "../../../common/Button";
import Avatar from "../../../common/Avatar";
import Modal from "../../../common/Modal";
import Map from "../../../common/Map";
import { AuthContext } from "../../../context/auth-context";
import { useHttpClient } from "../../../hooks/http-hook";
import "./style.css";

const PlaceItem = ({ place }) => {
  const placeId = useParams().pId;
  const auth = useContext(AuthContext);
  const { isLoggedIn } = auth;
  const { _id: pId, imageUrl, title, description, address } = place;
  const [showMap, setShowMap] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const { error, sendRequest, clearError } = useHttpClient();

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const openWarningModalHandler = () => setShowWarningModal(true);

  const closeWarningModalHandler = () => setShowWarningModal(false);

  const deletePlace = async () => {
    let res;
    try {
      res = await sendRequest(`/api/places/${pId}`, "DELETE");
      setShowWarningModal(false);
      return AntdModal.success({
        content: "Place has been successfully deleted",
      });
    } catch {}
  };

  return (
    <>
      {/* <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <Map lat={place.location.lat} lon={place.location.lon} />
        </div>
      </Modal> */}
      <Modal
        show={showWarningModal}
        onCancel={closeWarningModalHandler}
        header="Are you sure you want to delete this place?"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button onClick={closeWarningModalHandler}>Close</Button>
            <Button onClick={deletePlace} inverse>
              Confirm
            </Button>
          </>
        }
      >
        <div>
          <p style={{ padding: "20px 10px" }}>
            This place will be deleted permanently. Do you want to delete this
            place?
          </p>
        </div>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <Avatar src={imageUrl} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {isLoggedIn && (
              <>
                <Button to={`/places/${pId}`}>EDIT</Button>
                <Button danger onClick={openWarningModalHandler}>
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
