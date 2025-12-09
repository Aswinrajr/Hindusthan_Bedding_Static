import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/Admin";
import OurWork from "./pages/OurWork";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import { useEffect } from "react";
import axios from "axios";

import Login from "./pages/Login";
import ScrollToTop from "./components/ScrollToTop";
import Combinations from "./pages/Combinations";
import API_BASE_URL from "./config";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!isAdmin) {
    window.location.href = "/login";
    return null;
  }
  return children;
};

export default function App() {
  useEffect(() => {
    // Log visit
    axios
      .post(`${API_BASE_URL}/api/visit`)
      .catch((err) => console.error("Visit log error", err));
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/combinations" element={<Combinations />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/testimonials" element={<Testimonials />} />
      </Routes>
    </Router>
  );
}
