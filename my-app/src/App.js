import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

import Users from "./pages/Users";
import MainNavigation from "./common/Navigation/MainNavigation";
import UserPlaces from "./pages/places/UserPlaces";
import NewPlace from "./pages/places/NewPlace";
import UpdatePlace from "./pages/places/UpdatePlace";
import Auth from "./pages/Users/Auth";

const App = () => {
  return (
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
  );
};

export default App;
