import { useRef } from "react";
import { Collapse } from "bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../assets/DFBay.png";
import Ticker from "./Ticker";
import ReactTicker from "./ReactTicker";

const Header = ({ user, logOut }) => {
  const collapseMenu = useRef();
  user = user || {};
  const shown = Object.keys(user).length > 0 ? `nav-link` : `nav-link disabled`;
  const toggleCollapse = () => {
    const collapseEle = collapseMenu.current;
    const bsCollapse =
      Collapse.getInstance(collapseEle) ?? new Collapse(collapseEle);
    bsCollapse.toggle();
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark shadow">
          <div className="container-fluid ">
            <a
              href="/"
              className="navbar-brand"
              target="_blank"
              rel="noreferrer"
            >
              <img src={logo} alt="DFBay Logo" width="50" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? `nav-link active` : `nav-link`
                    }
                  >
                    Search
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/listings"
                    className={({ isActive }) =>
                      isActive ? `nav-link active` : `nav-link`
                    }
                  >
                    Listings
                  </NavLink>
                </li>
                <li className="nav-item">
                  {Object.keys(user).length === 0 && (
                    <NavLink to="/loginregister" className="nav-link">
                      Login/Register
                    </NavLink>
                  )}
                </li>
                <li className="nav-item">
                  <NavLink
                    to={
                      user.UserType == "standard"
                        ? `/user/${user.id}`
                        : `/admin`
                    }
                    className={({ isActive }) =>
                      isActive ? `${shown} active` : shown
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  {Object.keys(user).length > 0 && (
                    <a href="/" className="nav-link" onClick={logOut}>
                      Log Out
                    </a>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <ReactTicker />
      </header>
    </>
  );
};

export default Header;
