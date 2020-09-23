import React, { useEffect } from "react";
import { useQuery } from "react-query";

import axios from "axios";

import Title from "../../common/Title";
import LoadingSpinner from "../../common/LoadingSpinner";
import UsersList from "./../../components/user/UsersList";

const Users = () => {
  const [users, setUsers] = React.useState("");
  const { status, data, error, isFetching } = useQuery("users", async () => {
    const { data } = await axios.get("/api/users");
    const users = data.users;
    setUsers(users);
    return users;
  });

  return (
    <>
      {status === "loading" ? (
        <LoadingSpinner asOverlay />
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <Title label=" All Users" />
          <>
            <UsersList users={users} />
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        </>
      )}
    </>
  );
};

export default Users;
