import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FarmerDashboard() {
    const [view, setView] = useState("dashboard");
    const [dailyHarvest, setDailyHarvest] = useState(""); // for kilos
    const [label, setLabel] = useState(""); // for label
    const [harvestHistory, setHarvestHistory] = useState([]);
    const [amountOwed, setAmountOwed] = useState(0);
    const [profile, setProfile] = useState([]);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const navigate = useNavigate();
    const userid = localStorage.getItem('userid');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/accounts/api/get-profile/${userid}/`);
                if (!res.ok) throw new Error("Failed to fetch profile");
                const data = await res.json();
                setProfile(data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
        fetchHarvestHistory();
        fetchAmountOwed();
        fetchPaymentHistory();
    }, [navigate]);

    const fetchHarvestHistory = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/accounts/api/get_harvests_byId/${userid}/`);
            if (!res.ok) throw new Error("Failed to fetch harvest history");
            const data = await res.json();
            setHarvestHistory(data);
        } catch (error) {
            console.error("Error fetching harvest history:", error);
        }
    };

    const fetchAmountOwed = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/accounts/api/farmers/amount-owed/");
            if (!res.ok) throw new Error("Failed to fetch amount owed");
            const data = await res.json();
            setAmountOwed(data.amount);
        } catch (error) {
            console.error("Error fetching amount owed:", error);
        }
    };

    const fetchPaymentHistory = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/accounts/api/farmers/payments/");
            if (!res.ok) throw new Error("Failed to fetch payment history");
            const data = await res.json();
            setPaymentHistory(data);
        } catch (error) {
            console.error("Error fetching payment history:", error);
        }
    };

    const handleHarvestSubmit = async () => {
        if (!dailyHarvest || isNaN(dailyHarvest) || dailyHarvest <= 0) {
            alert("Please enter a valid harvest amount");
            return;
        }

        if (!label) {
            alert("Please enter a label for the harvest");
            return;
        }

        try {
            const res = await fetch("http://127.0.0.1:8000/api/accounts/api/record_harvests/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    kilos: Number(dailyHarvest),
                    label: label,
                    date: new Date().toISOString(),
                    user: userid,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Error details:", errorData);
                throw new Error("Failed to submit harvest");
            }

            setDailyHarvest("");
            setLabel(""); // Clear label input after successful submission
            alert("Harvest submitted successfully!");
            fetchHarvestHistory();
            fetchAmountOwed();
        } catch (error) {
            console.error("Error submitting harvest:", error);
            alert("Failed to submit harvest");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userid");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 space-y-6">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Farmer Dashboard</h1>
                </header>

                {view === "dashboard" && (
                    <div>
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-2">Profile Information</h2>
                            <p className="font-bold">Name: {profile.username}</p>
                            <p>Email: {profile.email}</p>
                            <p><strong>Total Payments:</strong> ${profile.totalPayments}</p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-2">Amount Owed</h2>
                            <p><strong>Current Amount:</strong> ${amountOwed}</p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-2">Payment History</h2>
                            {paymentHistory.length > 0 ? (
                                <ul className="space-y-2">
                                    {paymentHistory.map((payment, index) => (
                                        <li key={index} className="border p-2 rounded">
                                            {new Date(payment.date).toLocaleDateString()}: ${payment.amount}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No payment records available.</p>
                            )}
                        </div>

                        <button
                            onClick={() => setView("recordHarvest")}
                            className="bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700"
                        >
                            Daily Harvest
                        </button>
                    </div>
                )}

                {view === "recordHarvest" && (
                    <div>
                        <h2 className="text-xl font-bold mb-4"> Daily Harvest</h2>
                        <div className="mb-4">
                            <input
                                type="number"
                                placeholder="Enter kilos"
                                value={dailyHarvest}
                                onChange={(e) => setDailyHarvest(e.target.value)}
                                className="border p-2 rounded w-full mb-2"
                            />
                            <input
                                type="text"
                                placeholder="Label"
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                className="border p-2 rounded w-full mb-2"
                            />

                            <button
                                onClick={handleHarvestSubmit}
                                className="bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700"
                            >
                                record harvest
                            </button>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-bold mb-2">Harvest History</h3>
                            {harvestHistory.length > 0 ? (
                                <ul className="space-y-2">
                                    {harvestHistory.map((harvest, index) => (
                                        <div key={index} className="border p-2 rounded ">
                                            {new Date(harvest.date).toLocaleDateString()}: {harvest.kilos} kilos - {harvest.label}
                                            <p>  Status - {harvest.status}</p>
                                            <p>Message - {harvest.message}</p>
                                        </div>
                                    ))}
                                </ul>
                            ) : (
                                <p>No harvest records available.</p>
                            )}
                        </div>

                        <button
                            onClick={() => setView("dashboard")}
                            className="bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                )}

                
            </div>
        </div>
    );
}
