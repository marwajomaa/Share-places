import React from "react";

import UsersList from "./../../components/user/UsersList";
import { users } from "../../constants/users";
const Users = () => {
  return <UsersList items={users} />;
};

export default Users;
