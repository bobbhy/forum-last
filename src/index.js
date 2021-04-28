import React from "react";
import "./css/bootstrap.min.css";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
