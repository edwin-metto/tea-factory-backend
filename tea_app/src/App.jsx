import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import FarmerDashboard from "./components/FarmerDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Dash from "./components/Dash";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dash />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />

          {/* Admin Dashboard Route */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
