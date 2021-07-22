import React, { ReactElement } from "react";
import Board from "./components/Board";
import Header from "./components/Header";
import "./styles/styles.scss";

export default function App(): ReactElement {
  return (
    <>
      <Header />
      <Board />
    </>
  );
}
