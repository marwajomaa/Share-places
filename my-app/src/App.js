import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Users from "./pages/Users";
import MainNavigation from "./common/Navigation/MainNavigation";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <Switch>
        <main>
          <Route path="/">
            <Users />
          </Route>
        </main>
      </Switch>
    </Router>
  );
};

export default App;
