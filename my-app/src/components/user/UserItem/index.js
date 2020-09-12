import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../../common/Avatar";
import Card from "./../../../common/Card";
import "./UserItem.css";

const UserItem = ({ id, image, name, placesCount }) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar image={image} alt={name} />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {placesCount} {placesCount === 1 ? "place" : "places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
