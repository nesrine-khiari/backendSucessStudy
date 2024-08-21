import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import './functions/i18n';
import { Suspense } from "react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback="Loading...">
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>
);
