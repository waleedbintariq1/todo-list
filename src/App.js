import React, { useState, useEffect } from "react";

import UserSignup from "./My Components/UserSignup";
import UserLogin from "./My Components/UserLogin";
import HomePage from "./My Components/HomePage";

import Header from "./My Components/Header";
import LoginHeader from "./My Components/LoginHeader";
import Footer from "./My Components/Footer";

import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { axiosLogin, axiosLoginConfirm } from "./axios";

function App() {
  const [tokenFound, setTokenFound] = useState(false);

  useEffect(() => {
    console.log("inside app use effect");
    const token = localStorage.getItem("token");

    // check whether token is available
    if (token !== null) {
      // check whether token is valid
      axiosLoginConfirm()
        .then((res) => {
          setTokenFound(true);
        })
        .catch((err) => {
          if (err.response.status === 403) {
            setTokenFound(false);
          }
        });
    } else {
      console.log("token is null");
    }
  });

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
