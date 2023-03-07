import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./Components/App/App";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
