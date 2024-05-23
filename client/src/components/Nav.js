import React from "react";
import "../styles/Nav.css";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const reactNavigator = useNavigate();
  return (
    <nav className={"container"}>
      <img src={logo} alt="logo" />
      <ul>
        <li>Home</li>
        <li>Community</li>
        <li>Events</li>
        <li>Blogs</li>
        <li>About Us</li>
      </ul>
      <button
        onClick={() => {
          reactNavigator("/newsletter");
        }}
      >
        Subscribe Newsletter
      </button>
      <button
        onClick={() => {
          reactNavigator("/login");
        }}
      >
        Login
      </button>
    </nav>
  );
};

export default Nav;
