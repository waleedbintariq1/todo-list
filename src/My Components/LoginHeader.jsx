import React from "react";
import { Link } from "react-router-dom";

import "../My CSS/LoginHeader.css";

export default function LoginHeader(props) {
  return (
    <div className="loginHeader">
      <h2 className="logo">Todo App</h2>

      <div className="innerLoginHeader">
        <Link
          className="navLink"
          to="/"
          onClick={() => {
            // to clear token
            localStorage.clear();

            // to change header of the app
            props.updateHeader(false);
          }}
        >
          Logout
        </Link>
      </div>
    </div>
  );
}
