import React from "react";
import ReactDOM from "react-dom/client";

import { appStarted } from "@/shared/init";
import "@/shared/config/i18n";
import App from "@/app";

const root = document.getElementById("root")!;

appStarted();
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
