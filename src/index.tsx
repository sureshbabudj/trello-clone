import React from "react";
import { render } from "react-dom";
import App from "./App";
import { StoreContextProvider } from "./store/Store";

const body = (
  <React.StrictMode>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </React.StrictMode>
);

render(body, document.getElementById("app"));
