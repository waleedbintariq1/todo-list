import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import { axiosSignup, axiosLoginConfirm } from "../axios";

import "../My CSS/UserLogin.css";

export default function UserSignup(props) {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("inside signup page use effect");

    const token = localStorage.getItem("token");

    // check whether token is available
    if (token !== null) {
      // check whether token is valid
      axiosLoginConfirm()
        .then((res) => {
          if (res.status) {
            // token is valid
            history.push("/homepage");
          }
        })
        .catch((err) => {
          if (err.response.status === 403) {
            console.log("token is no longer valid");
          }
        });
    } else {
      console.log("token is null");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    axiosSignup(user)
      .then(() => alert("Signup successful!"))
      .catch((err) => alert("Email already in use!"));

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className=" container loginContainer">
      <h1 className="loginHeading">Signup</h1>

      <form className="p-5" onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

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
          Signup
        </button>

        <div
          className="mt-5 myLink"
          onClick={() => {
            history.push("/");
          }}
        >
          Already a user?
        </div>
      </form>
    </div>
  );
}
