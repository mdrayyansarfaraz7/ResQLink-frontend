import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx"; // ✅ import your homepage
import FamilyForm from "./pages/FamilyForm.jsx";
import ManagerForm from "./pages/ManagerForm.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/client-form" element={<FamilyForm />} />
        <Route path="/manager-form" element={<ManagerForm />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
