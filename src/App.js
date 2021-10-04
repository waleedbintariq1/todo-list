import React from "react";

import Navbar from "./My Components/Navbar";
import HomePage from "./My Components/HomePage";
import UserLogin from "./My Components/UserLogin";
import About from "./My Components/About";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    // <div>
    //   <HomePage></HomePage>
    // </div>

    <Router>
      <div>
        <Navbar></Navbar>
      </div>

      <Switch>
        <Router path="/home">
          <HomePage></HomePage>
        </Router>

        <Router path="/login">
          <UserLogin></UserLogin>
        </Router>

        <Router path="/about">
          <About></About>
        </Router>
      </Switch>
    </Router>
  );
}

export default App;
