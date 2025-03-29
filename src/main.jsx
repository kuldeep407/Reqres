import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { UserContextProvider } from "./context/userContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <UserContextProvider>
        <StrictMode>
          <App />
          <Toaster />
        </StrictMode>
      </UserContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
