// ** react imports
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
// ** assets
import logo from "../../assets/images/logo.webp";
// ** styles
import "../../assets/styles/PublicNavBar.css";
import { Disconnect } from "../../redux/user/user.actions";
// ** ==>
function PublicNavBar() {
  const user = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(Disconnect());
  };
  // ** route
  const router = useLocation();
  // ** =>
  return (
    <header className="w-100 position-relative d-flex justify-content-evenly">
      <nav className="navbar">
        <div className="left-side">
          <Link to={"/"} className="logo">
            <img src={logo} alt="logo" width="150" />
          </Link>
        </div>
        <div className="right-side">
          <div className="dropdown navbar-link navbar_link_style me-5 ">
            <button
              className="btn dropdown-toggle border-0"
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
            className={`navbar-link navbar_link_style title_second me-5 ${
              router.pathname === "/about-us" ? "active_nav_link" : "color_main"
            }`}
            to="/about-us"
          >
            A propos
          </Link>
          <Link
            className={`navbar-link navbar_link_style title_second  me-5 ${
              router.pathname === "/contact-us"
                ? "active_nav_link"
                : "color_main"
            }`}
            to="/contact-us"
          >
            Contact
          </Link>
          <Link
            className={`navbar-link navbar_link_style title_second  me-5 ${
              router.pathname === "/help-center"
                ? "active_nav_link"
                : "color_main"
            }`}
            to="/help-center"
          >
            FAQ
          </Link>
          <Link
            className="navbar-link navbar_link_style title_second color_main me-5"
            to="/"
          >
            |
          </Link>

          {user.is_connected ? (
            <div
              className="btn main_btn fw-bold title_second color_main signup_btn_styling"
              onClick={logout}
            >
              Deconnexion
            </div>
          ) : (
            <>
              <Link
                className="navbar-link navbar_link_style title_second color_main me-5"
                to="/sign-up"
              >
                Inscription
              </Link>
              <Link
                to="/sign-in"
                className="btn main_btn fw-bold title_second color_main signup_btn_styling"
              >
                Connexion
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default PublicNavBar;
