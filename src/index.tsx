import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Home } from "./containers/Home";

const root = createRoot(document.getElementById("app"));

root.render(
  <StrictMode>
    <Home />
  </StrictMode>
);
