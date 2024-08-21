import React from "react";
import { Bell, LogOut, Settings, Layout, Home } from "react-feather";
import { Link, useLocation } from "react-router-dom";
// ** assets
import logo from "../../assets/images/logo.webp";
import footer_logo from "../../assets/images/footer_logo.webp";
import arrow_back from "../../assets/images/arrow-back.svg";
import blue_conf from "../../assets/images/blue_conf.svg";
import exist from "../../assets/images/exist.svg";
import bell from "../../assets/images/bell.svg";
import auth from "../../assets/images/auth2.webp";
// ** styles
import "../../assets/styles/PublicNavBar.css";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Navbar.module.scss";
import { useOnScroll } from "../../hooks/useScoll";
import { isResp } from "../../custom/roles";
import { useQuery } from "@tanstack/react-query";
import { socket } from "../../functions/socket.io";
import { useEffect } from "react";
import { notificationGetOwn } from "../../custom/instance";
import { useState } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";

import { useMediaQuery } from "react-responsive";
import { Divider, Drawer, List, ListItem } from "@mui/material";
import englishIcon from "../../assets/images/uk.svg";

import frenshIcon from "../../assets/images/franceIcon.webp";

// ** ==>
function AuthNavBar({ def_shrink = false }) {
  const { user, is_connected } = useSelector((state) => state.UserReducer);
  const shrink = useOnScroll(80);
  const [notifs, setNotifs] = useState();
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["rzewrite"],
    queryFn: async () => {
      const userIO = await notificationGetOwn();
      setNotifs(userIO.reverse());
      return userIO;
    },
    refetchOnWindowFocus: false,
  });

  const { t } = useTranslation();

  // ** route
  useEffect(() => {
    refetch();
    socket.on("getNotfi", ({ data }) => {
      refetch();
    });
  }, []);

  const router = useLocation();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [open, setOpen] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    setOpen(open);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const { i18n } = useTranslation();
  const [lang, setLang] = useState("fr");

  const handleLanguageChange = (lng) => {
    console.log(lng);
    setLang(lng);
    i18n.changeLanguage(lng);
  };
  const isMobile = useMediaQuery({ maxWidth: 992 });

  const liStyle = {
    border: "2px solid #f4ba41ff",
    borderRadius: "3px",
    width: isMobile ? "310px" : "400px",
    margin: "5px",
  };
  const ulstyle = {
    listStyleType: "none",
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 100 + "vw" }}
      role="presentation"
      className="box-inside-header-mobile py-5"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div style={{ position: "relative" }}>
        <div className="d-flex justify-content-end align-items-center px-5 mb-5">
          {is_connected ? (
            <>
              <div className="navbar-link navbar_link_style title_second color_main me-2">
                <img
                  src={user.picture}
                  style={{ position: "relative" }}
                  height="50"
                  className="user_icon"
                  alt=" user icon"
                  width="50"
                />
              </div>
              <div className="dropdown navbar-link navbar_link_style ">
                <button
                  className="btn dropdown-toggle border-0"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    marginBottom: "20px",
                    fontSize: "20px",
                    position: "relative",
                    right: "20px",
                  }}
                >
                  <Link
                    href="#section-3"
                    className="button-text nav_link_style title_second color_main w-100"
                    style={{
                      textTransform: "capitalize",

                      maxWidth: "120px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      display: "inline-block",
                    }}
                  >
                    {user?.firstName}. {user?.lastName}
                  </Link>
                </button>
                <ul
                  className="dropdown-menu nav_link_ul profile-setting"
                  style={{ width: "300px!important" }}
                >
                  <Link
                    to="/profile"
                    style={{
                      borderBottom: "1px solid #F3F3F3",
                      marginBottom: "20px",
                      fontSize: "25px",
                    }}
                  >
                    <li className="text-center">
                      <p
                        className="dropdown-item nav_link_style_active py-4 title_second color_main w-100"
                        style={{ marginBottom: "20px", fontSize: "25px" }}
                      >
                        <Settings />
                        {t("header.settings")}
                      </p>
                    </li>
                  </Link>
                  {isResp(user) && (
                    <>
                      <Link
                        to="/university/config"
                        style={{
                          borderButton: "1px solid #F3F3F3",
                          marginBottom: "20px",
                          fontSize: "25px",
                        }}
                      >
                        <li className="text-center">
                          <p
                            className="dropdown-item nav_link_style_active py-4 title_second color_main w-100"
                            style={{ marginBottom: "20px", fontSize: "25px" }}
                          >
                            <Home /> {t("header.university")}
                          </p>
                        </li>
                      </Link>
                      <Link
                        to="/dashboard"
                        style={{ borderButton: "1px solid #F3F3F3" }}
                      >
                        <li className="text-center">
                          <p
                            className="dropdown-item nav_link_style_active py-4 title_second color_main w-100"
                            style={{ marginBottom: "20px", fontSize: "25px" }}
                          >
                            <Layout /> {t("header.dashboard")}
                          </p>
                        </li>
                      </Link>
                    </>
                  )}
                  <Link
                    to="/logout"
                    style={{ borderButton: "1px solid #F3F3F3" }}
                  >
                    <li className="text-center">
                      <p
                        className="dropdown-item nav_link_style_active py-4 title_second color_main w-100"
                        style={{ marginBottom: "20px", fontSize: "25px" }}
                      >
                        <LogOut /> {t("header.logout")}
                      </p>
                    </li>
                  </Link>
                </ul>
              </div>

              <div className="dropdown-center navbar-link navbar_link_style me-4 ">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    marginBottom: "20px",
                    fontSize: "25px",
                    position: "relative",
                  }}
                >
                  <img src={bell} alt="bell-svg" height={24} width={18} />
                </button>
                {notifs?.length === 0 && (
                  <ul className="dropdown-menu nav_link_ul_settings nav_link_ul_settings_em mt-1">
                    <div className="d-flex align-items-center justify-content-center">
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "450px" }}
                      >
                        <div>
                          <div className="border-image-sec-not">
                            <img
                              src={bell}
                              alt="bell-svg"
                              height={38}
                              width={38}
                            />
                          </div>
                          <p
                            className="m-0 mt-3 text-center "
                            style={{
                              whiteSpace: "break-spaces",
                              width: "100%",
                              textAlign: "center",
                              lineHeight: "150%",
                              marginBottom: "20px",
                              fontSize: "25px",
                            }}
                          >
                            {t("header.no_notifications")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ul>
                )}
                {notifs?.length > 0 && (
                  <ul
                    className="dropdown-menu   mt-4"
                    style={{
                      ...ulstyle,
                      maxHeight: "435px",
                      width: isMobile ? "340px" : "420px",
                      overflowY: "auto",
                    }}
                  >
                    {notifs?.map((x) => {
                      return (
                        <Link
                          style={{
                            borderBottom: "0.5px solid #F3F3F3",
                            padding: "0px",
                            marginBottom: "20px",
                            fontSize: "25px",
                          }}
                        >
                          <li
                            className="text-right navbar-link navbar_link_style nav_link_style_active py-4 title_second color_main"
                            style={liStyle}
                          >
                            <div className="d-flex align-items-center">
                              <div style={{ width: "20%" }}>
                                {user.role == "responsable" && (
                                  <img
                                    src={x.idOwnerUser?.picture}
                                    alt="univ"
                                    width={"48"}
                                    height={"48"}
                                    style={{
                                      borderRadius: "5px",
                                      marginLeft: "10px",
                                    }}
                                  />
                                )}
                                {user.role == "user" && (
                                  <img
                                    src={x.idOwnerUniv?.logo}
                                    alt="univ"
                                    width={"48"}
                                    height={"48"}
                                    style={{
                                      borderRadius: "5px",
                                      marginLeft: "10px",
                                    }}
                                  />
                                )}
                              </div>
                              <div style={{ width: "78%" }}>
                                <p
                                  className="m-0"
                                  style={{
                                    fontSize: "14px",
                                    whiteSpace: "break-spaces",
                                  }}
                                >
                                  {x.content}
                                </p>
                                <br />
                                <span className="text-span-time">
                                  {moment(new Date(x.send_date)).format(
                                    "MMMM Do YYYY, hh:mm:ss"
                                  )}
                                </span>
                              </div>
                            </div>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                className={styles.nav_connection_btn}
                to="/sign-up"
                style={{ marginBottom: "20px", fontSize: "25px" }}
              >
                {t("header.signup")}
              </Link>
              <Link
                to="/sign-in"
                className={styles.nav_connection_btn}
                style={{ marginBottom: "20px", fontSize: "25px" }}
              >
                {t("header.login")}
              </Link>
            </>
          )}
          <div onClick={toggleDrawer(anchor, false)}>
            <img
              src={exist}
              style={{ position: "relative", bottom: "10px", left: "10px" }}
              alt="back"
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            justifyContent: "center",
          }}
        >
          <div>
            <img
              src={auth}
              style={{ width: "100%", position: "relative", bottom: "30px" }}
            />
          </div>

          <Link className="navbar-link navbar_link_style title_second">
            <div className="dropdown">
              <button
                className=" dropdown-toggle align-items-center"
                style={{
                  background: "none",
                  border: "none",
                  "margin-right": " 1.5rem",
                  color: "#023047",
                  marginBottom: "20px",
                  fontSize: "25px",
                }}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {lang == "fr" ? (
                  <>
                    <img
                      src={frenshIcon}
                      width="34"
                      alt="contact icon"
                      className="pe-3"
                    />
                    Francais-fr{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <img
                      src={englishIcon}
                      width="30"
                      alt="contact icon"
                      className="pe-3"
                    />
                    English-en
                  </>
                )}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={(e) => handleLanguageChange("fr")}
                    >
                      <img
                        src={frenshIcon}
                        width="30"
                        alt="contact icon"
                        className="pe-3"
                      />
                      Francais-fr
                    </a>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    {" "}
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={(e) => handleLanguageChange("en")}
                    >
                      <img
                        src={englishIcon}
                        width="34"
                        alt="contact icon"
                        className="pe-3"
                      />
                      English-en
                    </a>
                  </a>
                </li>
              </ul>
            </div>
          </Link>
          {is_connected && user.role == "responsable" && (
            <Link
              className={`navbar-link navbar_link_style title_second me-4 
                ${
                  router.pathname === "/dashboard"
                    ? "active_nav_link"
                    : "color_main"
                }`}
              to="/dashboard"
              style={{ marginBottom: "20px", fontSize: "25px" }}
            >
              {t("header.dashboard")}
            </Link>
          )}

          {is_connected && user.role == "user" && (
            <Link
              className={`navbar-link navbar_link_style title_second me-4 
                ${
                  router.pathname === "/countries"
                    ? "active_nav_link"
                    : "color_main"
                }`}
              to="/countries"
              style={{ marginBottom: "20px", fontSize: "25px" }}
            >
              {t("header.des")}
            </Link>
          )}
          <Link
            className={`navbar-link navbar_link_style title_second me-4 
                ${
                  router.pathname === "/about-us"
                    ? "active_nav_link"
                    : "color_main"
                }`}
            to="/about-us"
            style={{ marginBottom: "20px", fontSize: "25px" }}
          >
            {t("header.about")}
          </Link>

          {is_connected && (
            <Link
              className={`navbar-link navbar_link_style title_second  me-4 ${
                router.pathname === "/contact-us"
                  ? "active_nav_link"
                  : "color_main"
              }`}
              to="/contact-us"
              style={{ marginBottom: "20px", fontSize: "25px" }}
            >
              {t("header.contact")}
            </Link>
          )}
          <Link
            className={`navbar-link navbar_link_style title_second me-4 
                ${
                  router.pathname === "/our-services"
                    ? "active_nav_link"
                    : "color_main"
                }`}
            to="/our-services"
            style={{ marginBottom: "20px", fontSize: "25px" }}
          >
            {t("header.services")}
          </Link>
          <Link
            className={`navbar-link navbar_link_style title_second  me-4 ${
              router.pathname === "/help-center"
                ? "active_nav_link"
                : "color_main"
            }`}
            to="/help-center"
            style={{ marginBottom: "20px", fontSize: "25px" }}
          >
            {t("header.faq")}
          </Link>
        </div>
      </div>
    </Box>
  );
  /**              <ListItem className="py-3">
              <Link>
              <img
                src={user.picture}
                height="35"
                className="user_icon"
                alt=" user icon"
                width="35"
              />
              </Link>
              </ListItem>
              <ListItem className="py-3">
              <Link
                  href="#section-3"
                  className="button-text nav_link_style title_second color_main w-100"
                  style={{ textTransform: "capitalize" }}
                >
                  {user?.firstName}. {user?.lastName}
                </Link>
              </ListItem> */
  const mobileHeader = (
    <nav
      className={`
      ${styles.navbar} 
      ${shrink || def_shrink ? styles.shrink : ""}`}
    >
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ width: "100%" }}
      >
        <div className="">
          <Link to={"/"} className={styles.logo}>
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="box-fit-mobile">
          <div onClick={toggleDrawer("right", true)} className="boxtext-ack">
            <img src={arrow_back} alt="back" />
          </div>
          <Drawer
            anchor={"right"}
            open={open}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </div>
      </div>
    </nav>
  );
  const desktopHeader = (
    <nav
      className={`
        ${styles.navbar} 
        ${shrink || def_shrink ? styles.shrink : ""}`}
    >
      <div className="left-side">
        <Link to={"/"} className={styles.logo}>
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="right-side">
        <Link className="navbar-link navbar_link_style title_second">
          <div className="dropdown">
            <button
              className=" dropdown-toggle align-items-center"
              style={{
                background: "none",
                border: "none",
                "margin-right": " 1.5rem",
                color: "#023047",
              }}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {lang == "fr" ? (
                <>
                  <img
                    src={frenshIcon}
                    width="34"
                    alt="contact icon"
                    className="pe-3"
                  />
                  Francais-fr{" "}
                </>
              ) : (
                <>
                  {" "}
                  <img
                    src={englishIcon}
                    width="30"
                    alt="contact icon"
                    className="pe-3"
                  />
                  English-en
                </>
              )}
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => handleLanguageChange("fr")}
                  >
                    <img
                      src={frenshIcon}
                      width="30"
                      alt="contact icon"
                      className="pe-3"
                    />
                    Francais-fr
                  </a>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  {" "}
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => handleLanguageChange("en")}
                  >
                    <img
                      src={englishIcon}
                      width="34"
                      alt="contact icon"
                      className="pe-3"
                    />
                    English-en
                  </a>
                </a>
              </li>
            </ul>
          </div>
        </Link>
        {is_connected && user.role == "responsable" && (
          <Link
            className={`navbar-link navbar_link_style title_second me-4 
                ${
                  router.pathname === "/dashboard"
                    ? "active_nav_link"
                    : "color_main"
                }`}
            to="/dashboard"
          >
            {t("header.dashboard")}
          </Link>
        )}

        {is_connected && user.role == "user" && (
          <Link
            className={`navbar-link navbar_link_style title_second me-4 
                ${
                  router.pathname === "/countries"
                    ? "active_nav_link"
                    : "color_main"
                }`}
            to="/countries"
          >
            {t("header.des")}
          </Link>
        )}
        <Link
          className={`navbar-link navbar_link_style title_second me-4 
                ${
                  router.pathname === "/about-us"
                    ? "active_nav_link"
                    : "color_main"
                }`}
          to="/about-us"
        >
          {t("header.about")}
        </Link>

        {is_connected && (
          <Link
            className={`navbar-link navbar_link_style title_second  me-4 ${
              router.pathname === "/contact-us"
                ? "active_nav_link"
                : "color_main"
            }`}
            to="/contact-us"
          >
            {t("header.contact")}
          </Link>
        )}
        <Link
          className={`navbar-link navbar_link_style title_second me-4 
                ${
                  router.pathname === "/our-services"
                    ? "active_nav_link"
                    : "color_main"
                }`}
          to="/our-services"
        >
          {t("header.services")}
        </Link>
        <Link
          className={`navbar-link navbar_link_style title_second  me-4 ${
            router.pathname === "/help-center"
              ? "active_nav_link"
              : "color_main"
          }`}
          to="/help-center"
        >
          {t("header.faq")}
        </Link>
        <Link
          className="navbar-link navbar_link_style title_second color_main me-4"
          to="/"
        >
          |
        </Link>

        {is_connected ? (
          <>
            <div className="dropdown-center navbar-link navbar_link_style me-4 ">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={bell} alt="bell-svg" height={24} width={18} />
              </button>
              {notifs?.length === 0 && (
                <ul className="dropdown-menu nav_link_ul_settings nav_link_ul_settings_em mt-1">
                  <div className="d-flex align-items-center justify-content-center">
                    <div
                      className="d-flex justify-content-center"
                      style={{ width: "450px" }}
                    >
                      <div>
                        <div className="border-image-sec-not">
                          <img
                            src={bell}
                            alt="bell-svg"
                            height={38}
                            width={38}
                          />
                        </div>
                        <p
                          className="m-0 mt-3 text-center "
                          style={{
                            fontSize: "16px",
                            whiteSpace: "break-spaces",
                            width: "100%",
                            textAlign: "center",
                            lineHeight: "150%",
                          }}
                        >
                          {t("header.no_notifications")}
                        </p>
                      </div>
                    </div>
                  </div>
                </ul>
              )}
              {notifs?.length > 0 && (
                <ul
                  className="dropdown-menu   mt-4"
                  style={{
                    ...ulstyle,
                    maxHeight: "435px",
                    width: "420px",
                    overflowY: "auto",
                  }}
                >
                  {notifs?.map((x) => {
                    return (
                      <Link
                        style={{
                          borderBottom: "0.5px solid #F3F3F3",
                          padding: "0px",
                        }}
                      >
                        <li
                          className="text-right navbar-link navbar_link_style nav_link_style_active py-4 title_second color_main"
                          style={liStyle}
                        >
                          <div className="d-flex align-items-center">
                            <div style={{ width: "20%" }}>
                              {user.role == "responsable" && (
                                <img
                                  src={x.idOwnerUser?.picture}
                                  alt="univ"
                                  width={"48"}
                                  height={"48"}
                                  style={{
                                    borderRadius: "5px",
                                    marginLeft: "10px",
                                  }}
                                />
                              )}
                              {user.role == "user" && (
                                <img
                                  src={x.idOwnerUniv?.logo}
                                  alt="univ"
                                  width={"48"}
                                  height={"48"}
                                  style={{
                                    borderRadius: "5px",
                                    marginLeft: "10px",
                                  }}
                                />
                              )}
                            </div>
                            <div style={{ width: "78%" }}>
                              <p
                                className="m-0"
                                style={{
                                  fontSize: "14px",
                                  whiteSpace: "break-spaces",
                                }}
                              >
                                {x.content}
                              </p>
                              <br />
                              <span className="text-span-time">
                                {moment(new Date(x.send_date)).format(
                                  "MMMM Do YYYY, hh:mm:ss"
                                )}
                              </span>
                            </div>
                          </div>
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="navbar-link navbar_link_style title_second color_main me-2">
              <img
                src={user.picture}
                height="35"
                className="user_icon"
                alt=" user icon"
                width="35"
              />
            </div>
            <div className="dropdown navbar-link navbar_link_style ">
              <button
                className="btn dropdown-toggle border-0"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Link
                  href="#section-3"
                  className="button-text nav_link_style title_second color_main w-100"
                  style={{ textTransform: "capitalize" }}
                >
                  {user?.firstName}. {user?.lastName}
                </Link>
              </button>
              <ul
                className="dropdown-menu nav_link_ul profile-setting"
                style={{ width: "300px!important" }}
              >
                <Link
                  to="/profile"
                  style={{ borderBottom: "1px solid #F3F3F3" }}
                >
                  <li className="text-center">
                    <p className="dropdown-item nav_link_style_active py-4 title_second color_main w-100">
                      <Settings />
                      {t("header.settings")}
                    </p>
                  </li>
                </Link>
                {isResp(user) && (
                  <>
                    <Link
                      to="/university/config"
                      style={{ borderButton: "1px solid #F3F3F3" }}
                    >
                      <li className="text-center">
                        <p className="dropdown-item nav_link_style_active py-4 title_second color_main w-100">
                          <Home /> {t("header.university")}
                        </p>
                      </li>
                    </Link>
                    <Link
                      to="/dashboard"
                      style={{ borderButton: "1px solid #F3F3F3" }}
                    >
                      <li className="text-center">
                        <p className="dropdown-item nav_link_style_active py-4 title_second color_main w-100">
                          <Layout /> {t("header.dashboard")}
                        </p>
                      </li>
                    </Link>
                  </>
                )}
                <Link
                  to="/logout"
                  style={{ borderButton: "1px solid #F3F3F3" }}
                >
                  <li className="text-center">
                    <p className="dropdown-item nav_link_style_active py-4 title_second color_main w-100">
                      <LogOut /> {t("header.logout")}
                    </p>
                  </li>
                </Link>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link
              className="navbar-link navbar_link_style title_second color_main me-5"
              to="/sign-up"
            >
              {t("header.signup")}
            </Link>
            <Link
              to="/sign-in"
              className="navbar-link navbar_link_style title_second color_main me-5"
            >
              {t("header.login")}
            </Link>
          </>
        )}
      </div>
    </nav>
  );

  return isMobile ? mobileHeader : desktopHeader;
}

export default AuthNavBar;
