// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home"; // or { Header, Dashboard } if you prefer
import "./index.css";

import Codeforces from "./components/cf/Codeforces";


function App() {
  return (
    <Router>
      <Routes>
        {/* Combined Auth Page (Login + Register Toggle) */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected Home/Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
              <Codeforces />
            </ProtectedRoute>
          }
        />

        {/* Default route */}
        <Route path="*" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
