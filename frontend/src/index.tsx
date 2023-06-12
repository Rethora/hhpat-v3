import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "react-auth-kit";
import { AppRoutes } from "routes/AppRoutes";
import { refreshApi } from "routes/refreshApi";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";

import "./index.css";
import { store } from "utils/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider
      authType="cookie"
      authName="_auth"
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}
      refresh={refreshApi}
    >
      <Provider store={store}>
        <SnackbarProvider>
          <AppRoutes />
        </SnackbarProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
