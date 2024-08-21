import React, { useState, useEffect, useRef } from "react";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";

import { ProductService } from "../../../service/ProductService";

import HeadCards from "./HeadCards";
import Universities from "./Universities";
import Percentages from "./Percentages";
import ChartsOverview from "./ChartsOverview";
import Notifications from "./Notifications";

const Dashboard = () => {
  // useEffect(() => {
  //   if (props.colorMode === "light") {
  //     applyLightTheme();
  //   } else {
  //     applyDarkTheme();
  //   }
  // }, [props.colorMode]);

  return (
    <div className="grid">
      <HeadCards />

      <div className="col-12 xl:col-6">
        <Universities />
      </div>

      <div className="col-12 xl:col-6">
        <ChartsOverview />
      </div>
    </div>
  );
};

const comparisonFn = function (prevProps, nextProps) {
  return (
    prevProps.location.pathname === nextProps.location.pathname &&
    prevProps.colorMode === nextProps.colorMode
  );
};

export default React.memo(Dashboard, comparisonFn);
