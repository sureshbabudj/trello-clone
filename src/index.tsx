import React from "react";
import { render } from "react-dom";
import App from "./App";

const body = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

render(body, document.getElementById("app"));
