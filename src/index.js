import React from "react";
import ReactDOM from "react-dom/client";
import Routing from "./Routing";
import { store } from "./redux-toolkit/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Routing />
  </Provider>
);
