import React from "react";

import Title from "../../common/Title";
import UsersList from "./../../components/user/UsersList";
import { users } from "../../constants/users";
const Users = () => {
  return (
    <>
      <Title label=" All Users" />
      <UsersList items={users} />
    </>
  );
};

export default Users;
