import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "../My CSS/Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/login" className="btn btn-outline-primary">
        Login
      </Link>
      <Link to="/signup" className="btn btn-outline-primary">
        Signup
      </Link>
      <Link to="/about" className="btn btn-outline-primary">
        About
      </Link>
    </div>
  );
}
