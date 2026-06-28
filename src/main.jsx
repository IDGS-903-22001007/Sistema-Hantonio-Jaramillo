import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// 1. Importar el registrador de Vite PWA
import { registerSW } from "virtual:pwa-register";

// 2. Ejecutar la función para encender el Service Worker
registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
