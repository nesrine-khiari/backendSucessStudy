// ** react imports
import React from "react";
import { Bell, LogOut, Settings } from "react-feather";
import { Link, useLocation } from "react-router-dom";
// ** assets
import logo from "../../assets/images/logo.webp";
import userIcon from "../../assets/images/user.webp";
// ** styles
import { Disconnect } from "../../redux/user/user.actions";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/styles/PublicNavBar.css";
// ** ==>
function UniversityAuthNavBar() {
  const user_data = useSelector((state) => state.UserReducer.user);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(Disconnect());
  };
  // ** route
  const router = useLocation();
  return (
    <header className="w-100 position-relative d-flex justify-content-evenly">
      <nav className="navbar">
        <div className="left-side">
          <Link to={"/"} className="logo">
            <img src={logo} alt="logo" width="150" />
          </Link>
        </div>
        <div className="right-side">
          <div className="dropdown navbar-link navbar_link_style me-4">
            <button
              className="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Link
                href="#section-3"
                className="button-text nav_link_style title_second color_main"
              >
                Nos destination
              </Link>
            </button>
            <ul className="dropdown-menu w-100 nav_link_ul">
              <li>
                <Link
                  className="dropdown-item nav_link_style_active pb-2 title_second color_main "
                  to="#"
                >
                  France
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item nav_link_style_active pb-2 title_second color_main"
                  to="#"
                >
                  Belgique
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item nav_link_style_active pb-2 title_second color_main"
                  to="#"
                >
                  Espagne
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item nav_link_style_active pb-2 title_second color_main"
                  to="#"
                >
                  Canada
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item nav_link_style_active pb-2 title_second color_main"
                  to="#"
                >
                  Tunisie
                </Link>
              </li>
            </ul>
          </div>
          <Link
            className={`navbar-link navbar_link_style title_second me-4 ${
              router.pathname === "/about-us" ? "active_nav_link" : "color_main"
            }`}
            to="/about-us"
          >
            A propos
          </Link>
          <Link
            className={`navbar-link navbar_link_style title_second  me-4 ${
              router.pathname === "/contact-us"
                ? "active_nav_link"
                : "color_main"
            }`}
            to="/contact-us"
          >
            Contact
          </Link>
          <Link
            className={`navbar-link navbar_link_style title_second  me-4 ${
              router.pathname === "/help-center"
                ? "active_nav_link"
                : "color_main"
            }`}
            to="/help-center"
          >
            FAQ
          </Link>
          <Link
            className="navbar-link navbar_link_style title_second color_main me-4"
            to="/"
          >
            |
          </Link>
          <div className="dropdown navbar-link navbar_link_style me-4">
            <button
              className="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Bell
                size={20}
                className="button-text nav_link_style title_second color_main"
              />
              {/* <Link href="#section-3">Nos destination</Link> */}
            </button>
            <ul className="dropdown-menu w-100 nav_link_ul">
              {/* <li>
            <Link
              className="dropdown-item nav_link_style_active pb-2 title_second color_main "
              to="#"
            >
              France
            </Link>
          </li> */}
            </ul>
          </div>
          <div className="navbar-link navbar_link_style title_second color_main">
            <img
              src={user_data.picture}
              height="35"
              width="35"
              className="user_icon"
              alt=" user icon"
            />
          </div>
          <div className="dropdown navbar-link navbar_link_style ">
            <button
              className="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Link
                href="#section-3"
                className="button-text nav_link_style title_second color_main"
              >
                {user_data.firstName[0]}. {user_data.lastName}
              </Link>
            </button>
            <ul
              className="dropdown-menu nav_link_ul profile-setting"
              style={{ width: "300px!important" }}
            >
              <Link to="/profile">
                <li>
                  <p className="dropdown-item nav_link_style_active py-4 title_second color_main w-100">
                    <Settings /> Paramètres
                  </p>
                </li>
              </Link>
              <li onClick={logout}>
                <span className="dropdown-item nav_link_style_active pb-4 title_second color_main w-100">
                  <LogOut /> Déconnexion
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default UniversityAuthNavBar;
