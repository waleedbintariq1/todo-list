import React from "react";

import Navbar from "./My Components/Navbar";
import UserSignup from "./My Components/UserSignup";
import UserLogin from "./My Components/UserLogin";
import HomePage from "./My Components/HomePage";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <UserLogin></UserLogin>
        </Route>

        <Route path="/signup" component={UserSignup} />

        <Route path="/homepage" component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;
