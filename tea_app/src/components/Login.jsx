import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.role === "farmer") navigate("/farmer-dashboard");
      else if (data.role === "manager") navigate("/manager-dashboard");
      else if (data.role === null) navigate("/admin-dashboard"); 
    } else {
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
    <form 
  onSubmit={handleSubmit} 
  className="max-w-sm w-full bg-white rounded-2xl shadow-lg p-6 space-y-6"
>
  <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
  <div>
    <label 
      htmlFor="username" 
      className="block text-sm font-medium text-gray-600"
    >
      Username
    </label>
    <input 
      type="text" 
      name="username" 
      id="username" 
      placeholder="Enter your username" 
      onChange={handleChange} 
      required 
      className="w-full mt-1 p-2 border border-gray-300 rounded-lg "
    />
  </div>
  <div>
    <label 
      htmlFor="password" 
      className="block text-sm font-medium text-gray-600"
    >
      Password
    </label>
    <input 
      type="password" 
      name="password" 
      id="password" 
      placeholder="Enter your password" 
      onChange={handleChange} 
      required 
      className="w-full mt-1 p-2 border border-gray-300 rounded-lg "
    />
  </div>
  <button 
    type="submit" 
    className="w-full bg-blue-500 text-blue py-2 px-4 rounded-xl s"
  >
    Login
  </button>
</form>

  );
}