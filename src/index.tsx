import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./components/app/App";
import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);

reportWebVitals();
