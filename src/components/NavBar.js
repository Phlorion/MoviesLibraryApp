import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav__container">
      <p className="prevent-select">MoviesLib</p>
      <ul className="nav__navigation">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/movies"}>Library</Link>
        </li>
        <li>
          <div className="nav__search_wrapper">
            <input className="nav__search" placeholder="Search..."></input>
            <button className="nav__search_btn">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </li>
        <li>
          <Link to={"/"}>About</Link>
        </li>
        <li>
          <Link to={"/"}>Help</Link>
        </li>
      </ul>
      <div className="nav__account_container"></div>
    </div>
  );
};

export default NavBar;
