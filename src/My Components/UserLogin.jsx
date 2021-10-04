import React, { useState } from "react";

import "../My CSS/UserLogin.css";

import UserSignup from "./UserSignup";

export default function UserLogin() {
  const [isNewUser, setIsNewUser] = useState(false);

  console.log(isNewUser);

  return isNewUser ? (
    <UserSignup
      changeControl={() => {
        setIsNewUser(!isNewUser);
      }}
    ></UserSignup>
  ) : (
    <div className=" container loginContainer">
      <h1 className="text-center">Login</h1>

      <form className="p-5">
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
            // value={this.state.student.name}
            // onChange={this.handleChange.bind(this)}
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
            // onChange={(e) =>
            //   this.setState((prev) => ({
            //     student: {
            //       ...prev.student,
            //       dob: e.target.valueAsDate,
            //     },
            //   }))
            // }
          />
        </div>

        <button type="submit" className="btn btn-outline-primary">
          Login
        </button>

        <div
          className="mt-5 myLink"
          onClick={() => {
            setIsNewUser(!isNewUser);
          }}
        >
          Already a user?
        </div>
      </form>
    </div>
  );
}
