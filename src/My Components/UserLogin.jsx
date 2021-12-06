import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "../My CSS/UserLogin.css";

import { axiosLogin, axiosLoginConfirm } from "../axios";

export default function UserLogin(props) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // the following will run to check whether token is empty or not
  // if token is empty, then render the login page
  // else, render homepage

  // this is done to prevent user from going to login screen by using the back button
  // or by entering the login url

  // if user is already logged in, they should be redirected to homepage
  useEffect(() => {
    // if user refreshes page on homepage, then this code ensures that the correct-
    // header component is displayed

    console.log("inside login page use effect");
    const token = localStorage.getItem("token");

    // check whether token is available
    if (token !== null) {
      if (token.length > 0) {
        // check whether token is valid
        axiosLoginConfirm()
          .then((res) => {
            history.push("/homepage");
          })
          .catch((err) => {
            console.log("token is no longer valid");
          });
      }
    } else {
      console.log("token is null");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    localStorage.setItem("userEmail", user.email);

    axiosLogin(user)
      .then((res) => {
        if (res.data.authenticated) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("email", res.data.user.email);
          localStorage.setItem("password", res.data.user.password);

          // to update the header of the app
          props.updateHeader(true);

          history.push("/homepage");
        }
      })
      .catch((err) => {
        alert("Incorrect login credentials!");
        console.log(err);
      });

    setEmail("");
    setPassword("");
  };

  return (
    <div className="container loginContainer">
      <h1 className="loginHeading">Login</h1>

      <form className="p-5" onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="emailAddress" className="form-label">
            Email Address
          </label>
          <input
            required
            type="email"
            className="form-control"
            id="emailAddress"
            name="emailAddress"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            required
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <div
          className="mt-5 myLink"
          onClick={() => {
            history.push("/signup");
          }}
        >
          Not already a user?
        </div>
      </form>
    </div>
  );
}
