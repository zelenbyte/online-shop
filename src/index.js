import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Create a root React element and render the App inside it
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App /> {/* Wrap the entire app in StrictMode for highlighting potential issues */}
  </React.StrictMode>
);
