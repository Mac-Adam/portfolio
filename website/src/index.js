import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./app/globals.css";
import reportWebVitals from "./app/reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />); // Strict mode makes double render

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
