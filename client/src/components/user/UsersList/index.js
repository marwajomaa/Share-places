import React from "react";
import UserItem from "../UserItem";
import Card from "../../../common/Card";
import "./style.css";

const UsersList = ({ users }) => {
  if (!users) {
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
      {users.map((user) => (
        <UserItem key={user.id} {...user} />
      ))}
    </ul>
  );
};

export default UsersList;
