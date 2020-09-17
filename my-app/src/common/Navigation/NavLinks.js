import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import Button from "../Button";
import "./NavLinks.css";

const NavLinks = () => {
  const auth = useContext(AuthContext);
  const { isLoggedIn, logout } = auth;

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to="/u1/places">MY PLACES</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to="/places/new" exact>
            ADD PLACE
          </NavLink>
        </li>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">LOGIN</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <Button onClick={logout}>LOGOUT</Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
