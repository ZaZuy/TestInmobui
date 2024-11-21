import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StateProvider } from "./util/Hook/StoreHook";

const MOUNT_NODE = document.getElementById("root");
const render = () => {
  ReactDOM.render(
    <StateProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </StateProvider>,
    MOUNT_NODE
  );
};

render();

reportWebVitals();
