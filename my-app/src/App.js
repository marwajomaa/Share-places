import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Users from "./pages/Users";
import MainNavigation from "./common/Navigation/MainNavigation";
import UserPlaces from "./pages/places/UserPlaces";
import NewPlace from "./pages/places/NewPlace";
import UpdatePlace from "./pages/places/UpdatePlace";
import Auth from "./pages/Users/Auth";
import { AuthContext } from "./context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Switch>
            <Route path="/" component={Users} exact />
            <Route path="/:userId/places" component={UserPlaces} exact />
            <Route path="/places/new" component={NewPlace} exact />
            <Route path="/places/:pId" component={UpdatePlace} exact />
            <Route path="/auth" component={Auth} exact />
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
