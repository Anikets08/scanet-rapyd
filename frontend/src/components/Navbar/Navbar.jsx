import "./Navbar.scss";
import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { useHistory } from "react-router-dom";
const Navbar = () => {
  const history = useHistory();
  var path = "/";

  return (
    <div className="nav-bar container">
      <ul>
        <img
          onClick={() => {
            const newPath = "/";
            path = newPath;
            history.push(path);
          }}
          style={{ cursor: "pointer" }}
          src={logo}
          width="120px"
          alt="logo"
        />
        <div className="bars">
          <li
            onClick={() => {
              const newPath = "/Scan";
              path = newPath;
              history.push(path);
            }}
          >
            XRay
          </li>
          <li
            onClick={() => {
              const newPath = "/Doctor";
              path = newPath;
              history.push(path);
            }}
          >
            Find Doctor
          </li>
          <li
            onClick={() => {
              const newPath = "/Plan";
              path = newPath;
              history.push(path);
            }}
          >
            Plans
          </li>
          <li
            onClick={() => {
              const newPath = "/Model";
              path = newPath;
              history.push(path);
            }}
          >
            Create Model
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
