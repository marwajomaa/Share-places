import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Users from "./pages/Users/AllUsers";
import MainNavigation from "./common/Navigation/MainNavigation";
import UserPlaces from "./pages/places/UserPlaces";
import NewPlace from "./pages/places/NewPlace";
import UpdatePlace from "./pages/places/UpdatePlace";
import Auth from "./pages/Users/Auth";
import { AuthContext } from "./context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  setTimeout(() => console.log(isLoggedIn), 3000);
  const login = useCallback((userId) => {
    setUserId(userId);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" component={Users} exact />
        <Route path="/:userId/places" component={UserPlaces} exact />
        <Route path="/places/new" component={NewPlace} exact />
        <Route path="/places/:pId" component={UpdatePlace} exact />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" component={Users} exact />
        <Route path="/:userId/places" component={UserPlaces} exact />
        <Route path="/auth" component={Auth} exact />
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
