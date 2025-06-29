import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ProfilesContextProvider from "./context/Profile";
import AuthcontextProvider from "./context/authcontext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthcontextProvider>
      <ProfilesContextProvider>
        <App />
      </ProfilesContextProvider>
    </AuthcontextProvider>
  </BrowserRouter>
);
