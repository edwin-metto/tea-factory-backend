import React from "react";

export default function FarmerDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <header className="bg-blue-500 p-6">
          <h1 className="text-2xl font-bold text-white text-center">Farmer Dashboard</h1>
        </header>
        <div className="p-6 space-y-4">
          <p className="text-gray-700 text-center">
            Welcome, Farmer! Manage your tea deliveries and account here.
          </p>
          <div className="flex flex-col gap-4">
            <button className="w-full bg-blue-500 text-black py-2 px-4 rounded-xl ">
              View Deliveries
            </button>
            <button className="w-full bg-green-500 text-black py-2 px-4 rounded-xl">
              Account Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
