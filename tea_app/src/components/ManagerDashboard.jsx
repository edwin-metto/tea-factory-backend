import React from "react";

export default function ManagerDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <header className="bg-blue-600 p-6">
          <h1 className="text-3xl font-bold text-white text-center">
            Manager Dashboard
          </h1>
        </header>
        <div className="p-6 space-y-4">
          <p className="text-gray-700 text-center">
            Welcome, Manager! Oversee operations and manage farmer accounts here.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="w-full bg-blue-500 text-black py-2 px-4 rounded-xl ">
              View Reports
            </button>
            <button className="w-full bg-green-500 text-black py-2 px-4 rounded-xl">
              Manage Farmers
            </button>
            <button className="w-full bg-yellow-500 text-black py-2 px-4 rounded-xl">
              Payment Records
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
