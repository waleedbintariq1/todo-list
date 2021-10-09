import React from "react";
import { Link } from "react-router-dom";

import "../My CSS/Header.css";

export default function Header() {
  return (
    <div className="Header">
      <h2 className="logo">Todo App</h2>

      <div className="innerHeader">
        <Link className="navLink" to="/">
          Login
        </Link>
        <Link className="navLink" to="/signup">
          Signup
        </Link>
      </div>
    </div>
  );
}
