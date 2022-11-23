import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { StateContext, StateProvider } from "./utils/StateProvider";
import reducer, { initialState } from "./utils/reducer"

import App from "./App";
import "./index.css";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>,
  </React.StrictMode>
);
export const useStateProvider = () => useContext(StateContext);