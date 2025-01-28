import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", role: "farmer" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting formData:", formData); 
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/accounts/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert(`Registration failed: ${errorData.message || "Please check your inputs."}`);
      }
    } catch (error) {
      console.error("Network or server error:", error);
      alert("An error occurred while trying to register. Please try again later.");
    }
  };
  
  

  return (
    <form 
    onSubmit={handleSubmit} 
    className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 space-y-6"
  >
    <h2 className="text-2xl font-bold text-center text-gray-700">Register</h2>
    
    <div>
      <label 
        htmlFor="username" 
        className="block  font-medium text-gray-600"
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
        htmlFor="email" 
        className="block  font-medium text-gray-600"
      >
        Email
      </label>
      <input 
        type="email" 
        name="email" 
        id="email" 
        placeholder="Enter your email" 
        onChange={handleChange} 
        required 
        className="w-full mt-1 p-2 border border-gray-300 rounded-lg "
      />
    </div>
  
    <div>
      <label 
        htmlFor="password" 
        className="block font-medium text-gray-600"
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
  
    <div>
      <label 
        htmlFor="role" 
        className="block  font-medium text-gray-600"
      >
        Role
      </label>
      <select 
        name="role" 
        id="role" 
        onChange={handleChange} 
        className="w-full mt-1 p-2 border border-gray-300 rounded-lg "
      >
        <option value="farmer">Farmer</option>
        <option value="manager">Manager</option>
      </select>
    </div>
  
    <button 
      type="submit" 
      className="w-full bg-blue-500 text-black py-2 px-4 rounded-xl"
    >
      Register
    </button>
  </form>
  
  );
}