import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Route, useLocation } from "react-router-dom";

//--------------------------------Settings----------------------------------
// import CSSTransition from "./Templates/CSSTransition";
import CSSTransition from "../../Templates/CSSTransition";

import { AppTopbar } from "../../Templates/AppTopbar";
import { AppFooter } from "../../Templates/AppFooter";
import AppBar from "../../layouts/AppBar";

import PrimeReact from "primereact/api";
import { Tooltip } from "primereact/tooltip";

import Toast from "../../MyComponents/Toast/Toast";
import Dashboard from "./MainPage/Dashboard";
import GestUnivs from "./Universities/GestUnivs";
import GestStudents from "./Students/GestStudents";
import GestSousAdmins from "./SousAdmins/GestSousAdmins";
import FeedBacks from "./FeedBacks/FeedBacks";
import Mailing from "./Mailing/Mailing";
import Conversation from "./Conversation/Conversation";
import Formations from "./Formation/Formations";
import Transactions from "./transaction/Transactions";
import Bills from "./bills/Bills"

const DashboardPage = () => {
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("light");
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
  const copyTooltipRef = useRef();
  const location = useLocation();

  PrimeReact.ripple = true;
  let menuClick = false;
  let mobileTopbarMenuClick = false;

  useEffect(() => {
    // sizes : 12, 13, 14, 15, 16
    document.documentElement.style.fontSize = 14 + "px";
    setLayoutColorMode("light");
  }, []);

  useEffect(() => {
    if (mobileMenuActive) {
      addClass(document.body, "body-overflow-hidden");
    } else {
      removeClass(document.body, "body-overflow-hidden");
    }
  }, [mobileMenuActive]);

  useEffect(() => {
    copyTooltipRef &&
      copyTooltipRef.current &&
      copyTooltipRef.current.updateTargetEvents();
  }, [location]);

  const onWrapperClick = (event) => {
    if (!menuClick) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }

    if (!mobileTopbarMenuClick) {
      setMobileTopbarMenuActive(false);
    }

    mobileTopbarMenuClick = false;
    menuClick = false;
  };

  const onToggleMenuClick = (event) => {
    menuClick = true;

    if (isDesktop()) {
      if (layoutMode === "overlay") {
        if (mobileMenuActive === true) {
          setOverlayMenuActive(true);
        }

        setOverlayMenuActive((prevState) => !prevState);
        setMobileMenuActive(false);
      } else if (layoutMode === "static") {
        setStaticMenuInactive((prevState) => !prevState);
      }
    } else {
      setMobileMenuActive((prevState) => !prevState);
    }

    event.preventDefault();
  };

  const onSidebarClick = () => {
    menuClick = true;
  };

  const onMobileTopbarMenuClick = (event) => {
    mobileTopbarMenuClick = true;

    setMobileTopbarMenuActive((prevState) => !prevState);
    event.preventDefault();
  };

  const onMobileSubTopbarMenuClick = (event) => {
    mobileTopbarMenuClick = true;

    event.preventDefault();
  };

  const onMenuItemClick = (event) => {
    if (!event.item.items) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
  };
  const isDesktop = () => {
    return window.innerWidth >= 992;
  };

  const addClass = (element, className) => {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  };

  const removeClass = (element, className) => {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
  };

  const wrapperClass = classNames("layout-wrapper", {
    "layout-overlay": layoutMode === "overlay",
    "layout-static": layoutMode === "static",
    "layout-static-sidebar-inactive":
      staticMenuInactive && layoutMode === "static",
    "layout-overlay-sidebar-active":
      overlayMenuActive && layoutMode === "overlay",
    "layout-mobile-sidebar-active": mobileMenuActive,
    "p-input-filled": false,
    "p-ripple-disabled": true,
    "layout-theme-light": layoutColorMode === "light",
  });

  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      <Toast />
      <Tooltip
        ref={copyTooltipRef}
        target=".block-action-copy"
        position="bottom"
        content="Copied to clipboard"
        event="focus"
      />

      <AppTopbar
        onToggleMenuClick={onToggleMenuClick}
        layoutColorMode={layoutColorMode}
        mobileTopbarMenuActive={mobileTopbarMenuActive}
        onMobileTopbarMenuClick={onMobileTopbarMenuClick}
        onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}
      />

      <div className="layout-sidebar" onClick={onSidebarClick}>
        <AppBar
          onMenuItemClick={onMenuItemClick}
          layoutColorMode={layoutColorMode}
        />
      </div>

      <div className="layout-main-container">
        <div className="layout-main">
          {/* ------------------ REAL ROUTES ------------------  */}
          <Route
            path="/dashboard/"
            exact
            render={() => (
              <Dashboard colorMode={layoutColorMode} location={location} />
            )}
          />
          <Route path="/dashboard/universities" component={GestUnivs} />
          <Route path="/dashboard/students" component={GestStudents} />
          <Route path="/dashboard/admins" component={GestSousAdmins} />
          <Route path="/dashboard/feedbacks" component={FeedBacks} />
          <Route path="/dashboard/mailing" component={Mailing} />
          <Route path="/dashboard/conversation" component={Conversation} />
          <Route path="/dashboard/formation" component={Formations} />
          <Route path="/dashboard/transactions" component={Transactions} />
          <Route path="/dashboard/bills" component={Bills} />
        </div>

        <AppFooter layoutColorMode={layoutColorMode} />
      </div>

      <CSSTransition mobileMenuActive={mobileMenuActive} />
    </div>
  );
};

export default DashboardPage;
