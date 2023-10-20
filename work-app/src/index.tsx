import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import { CssBaseline } from "@mui/material";
import MainContext from "./context/context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <MainContext>
        <App />
      </MainContext>
    </Provider>
  </React.StrictMode>
);
