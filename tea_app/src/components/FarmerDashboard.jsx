import React, { useState } from "react";

export default function FarmerDashboard() {
  const [view, setView] = useState("dashboard"); 
  const [dailyHarvest, setDailyHarvest] = useState("");
  const [harvestHistory, setHarvestHistory] = useState([]);
  
  function calculateAmountOwed(kilosHarvested, pricePerKilo) {
    return kilosHarvested * pricePerKilo;
}


const kilosHarvested = 200; 
const pricePerKilo = 5;
const amountOwed = calculateAmountOwed(kilosHarvested, pricePerKilo);

console.log(`Amount Owed: $${amountOwed}`);

  const handleHarvestSubmit = () => {
    if (dailyHarvest) {
      setHarvestHistory([...harvestHistory, { date: new Date(), kilos: dailyHarvest }]);
      setDailyHarvest("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <header className="bg-blue-500 p-6">
          <h1 className="text-2xl font-bold text-white text-center">Farmer Dashboard</h1>
        </header>

        {view === "dashboard" && (
          <div className="p-6 space-y-4">
            <p className="text-gray-700 text-center">
              Welcome, Farmer! Manage your tea deliveries and account here.
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setView("profile")}
                className="w-full bg-blue-500 text-black py-2 px-4 rounded-xl"
              >
                View Profile & Payment History
              </button>
              <button
                onClick={() => setView("recordHarvest")}
                className="w-full bg-green-500 text-black py-2 px-4 rounded-xl"
              >
                Record Daily Harvest
              </button>
              <button
                onClick={() => setView("amountOwed")}
                className="w-full bg-green-500 text-black py-2 px-4 rounded-xl"
              >
                Check Amount Owed
              </button>
            </div>
          </div>
        )}

        {view === "profile" && (
          <div className="p-6">
            <h2 className="text-xl font-bold text-center">Profile & Payment History</h2>
            <p className="text-gray-700 mt-4">
              Name: Farmer metto edwin <br />
              Total Payments: sh.500
            </p>
            <ul className="mt-4 space-y-2">
              <li>Jan 1, 2025: sh.200</li>
              <li>Dec 25, 2024: sh.300</li>
            </ul>
            <button
              onClick={() => setView("dashboard")}
              className="mt-4 bg-blue-500 text-black py-2 px-4 rounded-xl"
            >
              Back
            </button>
          </div>
        )}

        {view === "recordHarvest" && (
          <div className="p-6">
            <h2 className="text-xl font-bold text-center">Record Daily Harvest</h2>
            <input
              type="number"
              placeholder="Enter kilos"
              value={dailyHarvest}
              onChange={(e) => setDailyHarvest(e.target.value)}
              className="w-full border rounded-lg p-2 mt-4"
            />
            <button
              onClick={handleHarvestSubmit}
              className="mt-4 bg-green-500 text-black py-2 px-4 rounded-xl"
            >
              Submit
            </button>
            <ul className="mt-4 space-y-2">
              {harvestHistory.map((harvest, index) => (
                <li key={index}>
                  {harvest.date.toDateString()}: {harvest.kilos} kilos
                </li>
              ))}
            </ul>
            <button
              onClick={() => setView("dashboard")}
              className="mt-4 bg-green-500 text-black py-2 px-4 rounded-xl"
            >
              Back
            </button>
          </div>
        )}

        {view === "amountOwed" && (
          <div className="p-6">
            <h2 className="text-xl font-bold text-center">Amount Owed</h2>
            <p className="text-gray-700 mt-4 text-center">
              You are owed <span className="font-bold">${amountOwed}</span>.
            </p>
            <button
              onClick={() => setView("dashboard")}
              className="mt-4 bg-blue-500 text-black py-2 px-4 rounded-xl"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
