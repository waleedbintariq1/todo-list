import React, { useState } from "react";

import UserSignup from "./My Components/UserSignup";
import UserLogin from "./My Components/UserLogin";
import HomePage from "./My Components/HomePage";

import Header from "./My Components/Header";
import LoginHeader from "./My Components/LoginHeader";
import Footer from "./My Components/Footer";

import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";

function App() {
  const token = localStorage.getItem("token");

  const [tokenFound, setTokenFound] = useState(false);

  return (
    <Router>
      <div className="app">
        {tokenFound ? (
          <LoginHeader
            className="mainHeader"
            updateHeader={(value) => {
              setTokenFound(value);
            }}
          />
        ) : (
          <Header className="mainHeader" />
        )}
        <Switch className="content">
          <Route exact path="/">
            <UserLogin
              updateHeader={(value) => {
                setTokenFound(value);
              }}
            ></UserLogin>
          </Route>
          <Route path="/signup" component={UserSignup} />
          <Route path="/homepage">
            <HomePage></HomePage>
          </Route>
        </Switch>
        <Footer className="footer"></Footer>
      </div>
    </Router>
  );
}

export default App;
