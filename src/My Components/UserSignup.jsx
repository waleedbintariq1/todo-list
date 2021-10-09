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
    const token = localStorage.getItem("token");

    // check whether token is available
    if (token != undefined) {
      // check whether token is valid
      axiosLoginConfirm()
        .then((res) => {
          if (res.status) {
            // token is valid
            history.push("/homepage");
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    axiosSignup(user)
      .then((res) => {
        if (res.data) {
          alert("Signup successful!");
        } else {
          alert("Email already in use!");
        }
      })
      .catch((err) => console.log(err));

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className=" container loginContainer">
      <h1 className="text-center">Signup</h1>

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
