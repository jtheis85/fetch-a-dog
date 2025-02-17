import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./main.css";
import "./design-system.css";
import "./reset.css";
import "@fontsource/roboto/index.css";

/**
 * This file is the main entry point for the app. It should be kept clear of
 * most concerns other than global imports and app-wide higher-order components.
 */

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
