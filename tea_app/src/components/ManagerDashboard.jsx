import React, { useState, useEffect } from "react";

export default function ManagerDashboard() {
    const [farmers, setFarmers] = useState([]);
    const [harvests, setHarvests] = useState([]);
    const [payments, setPayments] = useState([]);
    const [reports, setReports] = useState({ total_harvest: 0, total_payments: 0 });

    useEffect(() => {
        fetchFarmers();
        fetchHarvests();
        fetchPayments();
        fetchReports();
    }, []);

    const fetchFarmers = async () => {
        const res = await fetch('http://127.0.0.1:8000/api/accounts/api/farmers/');
        const data = await res.json();
        setFarmers(data);
    };

    const fetchHarvests = async () => {
        const res = await fetch('http://127.0.0.1:8000/api/accounts/api/harvests/');
        const data = await res.json();
        setHarvests(data);
    };

    const fetchPayments = async () => {
        const res = await fetch('http://127.0.0.1:8000/api/accounts/api/payments/');
        const data = await res.json();
        setPayments(data);
    };

    const fetchReports = async () => {
        const res = await fetch('http://127.0.0.1:8000/api/accounts/api/reports/');
        const data = await res.json();
        setReports(data);
    };

    const approveHarvest = async (id) => {
        await fetch(`/api/harvests/${id}/approve/`, { method: "POST" });
        fetchHarvests();
    };

    const rejectHarvest = async (id) => {
        await fetch(`/api/harvests/${id}/reject/`, { method: "POST" });
        fetchHarvests();
    };

    const markPaymentAsPaid = async (id) => {
        await fetch(`/api/payments/${id}/mark-paid/`, { method: "POST" });
        fetchPayments();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                <header className="bg-blue-600 p-6 text-center">
                    <h1 className="text-3xl font-bold text-white">Manager Dashboard</h1>
                </header>
                <div className="p-6 space-y-4">
                    <h2 className="text-xl font-bold text-gray-700">Summary Reports</h2>
                    <p>Total Harvest: {reports.total_harvest} kg</p>
                    <p>Total Payments: ${reports.total_payments}</p>

                    <h2 className="text-xl font-bold text-gray-700">Approve Tea Harvests</h2>
                    {harvests.map(harvest => (
                        <div key={harvest.id} className="border p-2">
                            {harvest.kilos} kg ({harvest.status})
                            {harvest.status === 'Pending' && (
                                <>
                                    <button className="ml-2 text-green-600" onClick={() => approveHarvest(harvest.id)}>Approve</button>
                                    <button className="ml-2 text-red-600" onClick={() => rejectHarvest(harvest.id)}>Reject</button>
                                </>
                            )}
                        </div>
                    ))}

                    <h2 className="text-xl font-bold text-gray-700">Manage Payments</h2>
                    {payments.map(payment => (
                        <div key={payment.id} className="border p-2">
                            ${payment.amount} ({payment.is_paid ? "Paid" : "Pending"})
                            {!payment.is_paid && (
                                <button className="ml-2 text-green-600" onClick={() => markPaymentAsPaid(payment.id)}>Mark as Paid</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
