import React, { useContext } from "react";
import logo from "../../logo.svg";
import { Link } from "react-router-dom";
import { MenuContext } from "../../App";

export default function NavBar() {
  const { current, setCurrent } = useContext(MenuContext);

  const toggleClass = () => {
    setCurrent(0);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-dark"
      style={{ height: "40px" }}
    >
      <a className="navbar-brand" href="/">
        <img
          style={{ width: "10%", padding: 0, margin: "5px 15px" }}
          src={logo}
          alt="ocp logo"
        ></img>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li
            className={
              current == 0
                ? "nav-item nav-item-custom ml-5 active"
                : "nav-item nav-item-custom ml-5"
            }
            onClick={() => toggleClass()}
          >
            <Link
              className="nav-link nav-link-custom text-white text-uppercase"
              to="/0"
            >
              apps
            </Link>
          </li>
          <li
            className={
              current == 1
                ? "nav-item nav-item-custom ml-5 active"
                : "nav-item nav-item-custom ml-5"
            }
            onClick={() => setCurrent(1)}
          >
            <Link
              className="nav-link nav-link-custom text-white text-uppercase"
              to="/extsource/0"
            >
              external sources
            </Link>
          </li>
          <li
            className={
              current == 2
                ? "nav-item nav-item-custom ml-5 active"
                : "nav-item nav-item-custom ml-5"
            }
            onClick={() => setCurrent(2)}
          >
            <Link
              className="nav-link nav-link-custom text-white text-uppercase"
              to="/cltpeers/0"
            >
              clients &amp; peers
            </Link>
          </li>
          <li
            className={
              current == 3
                ? "nav-item nav-item-custom ml-5 active"
                : "nav-item nav-item-custom ml-5"
            }
            onClick={() => setCurrent(3)}
          >
            <Link
              className="nav-link nav-link-custom text-white text-uppercase"
              to="/news"
            >
              my news
            </Link>
          </li>
          <li
            className={
              current == 4
                ? "nav-item nav-item-custom ml-5 active"
                : "nav-item nav-item-custom ml-5"
            }
            onClick={() => setCurrent(4)}
          >
            <Link
              className="nav-link nav-link-custom text-white text-uppercase"
              to="/dashboard/0"
            >
              bi dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
