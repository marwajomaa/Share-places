import React, { useEffect, useState } from "react";

import axios from "axios";

import Title from "../../../common/Title";
import ErrorModal from "../../../common/ErrorModal";
import LoadingSpinner from "../../../common/LoadingSpinner";
import UsersList from "../../../components/user/UsersList";

import { useHttpClient } from "../../../hooks/http-hook";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [users, setUsers] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await sendRequest("api/users");
        setUsers(users.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner asOverlay />
      ) : error ? (
        <ErrorModal error={error} onClear={clearError} />
      ) : (
        <>
          <Title label=" All Users" />
          <>
            <UsersList users={users} />
          </>
        </>
      )}
    </>
  );
};

export default Users;
