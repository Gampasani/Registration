import React from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CompanyPage from "./pages/CompanyPage";
import ProtectedRoute from "./components/ProtectedRoute";

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
    <div className="container">
      <NavLink className="navbar-brand" to="/dashboard">CompanyModule</NavLink>
      <div>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item"><NavLink className="nav-link" to="/register">Register</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/dashboard">Dashboard</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/company">Company</NavLink></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default function App() {
  return (
    <div>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company"
            element={
              <ProtectedRoute>
                <CompanyPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h4>Not Found</h4>} />
        </Routes>
      </div>
    </div>
  );
}
