import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import shelfie_icon from "../../icons/shelfie_icon.png";

function Header() {
  return (
    <nav>
      <div className="iconTitle">
        <img src={shelfie_icon} />
        <span className="title">SHELFIE</span>
      </div>
      <button className="headerButton">
        <Link className="link" to="/">
          Dashboard
        </Link>
      </button>
      <button className="headerButton">
        <Link className="link" to="/add">
          Add Inventory
        </Link>
      </button>
    </nav>
  );
}

export default Header;
