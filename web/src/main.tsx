import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/bricolage-grotesque/700.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "./styles/tokens.css";
import App from "./App";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element #root not found");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
