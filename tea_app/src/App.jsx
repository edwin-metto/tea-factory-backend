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
      <div>
      <nav >
      <h2 className="bg-blue-800 text-white text-2xl p-2"> Greens System</h2>
    </nav>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Dash />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />

        
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          
        </Routes>
      </Router>
      <div>
      <footer className="bg-blue-600 text-white py-2 text-center">
          <p className="text-sm">© 2025 Green's System. All Rights Reserved.</p>
        </footer>

      </div>
    </div>
  );
}

export default App;
