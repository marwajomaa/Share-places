import React from "react";
import UserItem from "../UserItem";
import Card from "../../../common/Card";
import "./style.css";

const UsersList = (props) => {
  if (!props.items) {
    return (
      <div className="center">
        <Card>
          <h2>NO users found</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul>
      {props.items.map((user) => (
        <UserItem key={user.id} id={user.id} {...user} />
      ))}
    </ul>
  );
};

export default UsersList;
