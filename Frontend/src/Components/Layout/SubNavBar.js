import React, { useContext } from "react";
import { MenuContext } from "../../App";
import { Link } from "react-router-dom";

export default function SubNavBar() {
  const { current, setCurrent, listMenu, setFilter, setTp } = useContext(
    MenuContext
  );
  let path = window.location.pathname.split("/");
  console.log("path = ", path[1]);
  if (path[1] === "extsource") setCurrent(1);
  else if (path[1] == "cltpeers") setCurrent(2);
  else if (path[1] == "news") setCurrent(3);
  else if (path[1] == "dashboard") setCurrent(4);
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light sub-navbar-custom "
      style={{ height: "25px", padding: ".5rem 1rem" }}
    >
      <ul className="navbar-nav m-auto ulnavbar" style={{ fontWeight: "bold" }}>
        {listMenu[current].titles.map((menu, index) => {
          return (
            <li
              key={index}
              className="nav-item ml-4"
              onClick={() =>
                listMenu[current].page === 1 ? setFilter(index) : 0
              }
            >
              <Link
                to={`${listMenu[current].url}/${index}`}
                className="nav-link text-uppercase"
              >
                {menu}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
