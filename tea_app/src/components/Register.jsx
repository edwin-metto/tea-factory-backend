import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "farmer",
  });
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
        alert(
          `Registration failed: ${
            errorData.message || "Please check your inputs."
          }`
        );
      }
    } catch (error) {
      console.error("Network or server error:", error);
      alert("An error occurred while trying to register. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            name="role"
            id="role"
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          >
            <option value="farmer">Farmer</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
