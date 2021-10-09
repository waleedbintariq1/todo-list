import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import UserSignup from "./UserSignup";
import HomePage from "./HomePage";

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
    console.log("inside login page use effect");
    const token = localStorage.getItem("token");

    // check whether token is available
    if (token != undefined) {
      // check whether token is valid
      axiosLoginConfirm()
        .then((res) => {
          if (res.status == 200) {
            // token is valid
            history.push("/homepage");
          }

          if (res.status == 403) {
            console.log("token is no longer valid");
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    axiosLogin(user)
      .then((res) => {
        if (res.data.authenticated) {
          localStorage.setItem("token", res.data.accessToken);
          props.updateHeader(true);
          history.push("/homepage");
        } else {
          alert("Incorrect login credentials!");
        }
      })
      .catch((err) => console.log(err));

    setEmail("");
    setPassword("");
  };

  return (
    <div className=" container loginContainer">
      <h1 className="text-center">Login</h1>

      <form className="p-5" onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="emailAddress" className="form-label">
            Email Address
          </label>
          <input
            required
            type="text"
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
