import React, { useState, useEffect } from "react";

export default function ManagerDashboard() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [currentAction, setCurrentAction] = useState(null); // "approve" or "reject"
    const [currentRecordId, setCurrentRecordId] = useState(null);

    const [show, setShow] = useState(false);
    const [farmers, setFarmers] = useState([]);
    const [newFarmer, setNewFarmer] = useState({ name: "", phone: "" });
    const [editFarmer, setEditFarmer] = useState({ id: null, name: "", phone: "" });
    const [harvestRecords, setHarvestRecords] = useState([]);
    const [payments, setPayments] = useState([]);
    const [totalHarvest, setTotalHarvest] = useState(0);
    const [totalPayments, setTotalPayments] = useState(0);
    const [loading, setLoading] = useState(false);


    const openPopup = (action, id) => {
        setCurrentAction(action);
        setCurrentRecordId(id);
        setIsPopupOpen(true);
    };
    
    const closePopup = () => {
        setIsPopupOpen(false);
        setMessage('');
    };
    
    const handleSubmit = async () => {
        if (currentAction && currentRecordId && message) {
            setLoading(true);
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/accounts/api/approve/${currentRecordId}/`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: currentAction === "approve" ? "Approved" : "Rejected",
                        message: `#${message}`,
                    }),
                });
    
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                fetchHarvestRecords();  
            } catch (error) {
                console.error("Error processing harvest record:", error);
            } finally {
                setLoading(false);
                closePopup();  // Close the popup after submission
            }
        }
    };
    


    useEffect(() => {
        fetchFarmers();
        fetchHarvestRecords();
        fetchPayments();
    }, []);

    const fetchFarmers = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://127.0.0.1:8000/api/accounts/api/get-users/");
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            const data = await res.json();
            setFarmers(data);
        } catch (error) {
            console.error("Error fetching farmers:", error);
        } finally {
            setLoading(false);
        }
    };

    const addFarmer = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://127.0.0.1:8000/api/accounts/api/farmers/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newFarmer),
            });
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            setNewFarmer({ name: "", phone: "" });
            fetchFarmers();  
        } catch (error) {
            console.error("Error adding farmer:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateFarmer = async () => {
        setLoading(true);
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/accounts/api/farmers/${editFarmer.id}/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editFarmer),
            });
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            fetchFarmers();  // Refresh farmers
            setEditFarmer({ id: null, name: "", phone: "" });  
        } catch (error) {
            console.error("Error editing farmer:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteFarmer = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/accounts/api/delete_user/${id}/`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            // fetchFarmers(); 
        } catch (error) {
            console.error("Error deleting farmer:", error);
            alert ('failed to delete user')
        // } finally {
        //     setLoading(false);
        }
    };

    const fetchHarvestRecords = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://127.0.0.1:8000/api/accounts/api/get-harvests/");
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            const data = await res.json();
            console.log("Fetched harvest records:", data); 
            console.log('harvests') 
            setHarvestRecords(data);
            const total = data.reduce((sum, record) => sum + record.kilos, 0);
            setTotalHarvest(total);
        } catch (error) {
            console.error("Error fetching harvest records:", error);
        } finally {
            setLoading(false);
        }
    };
    
    const approveHarvestRecord = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/accounts/api/approve/${id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: "Approved",
                }),
            });
    
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            fetchHarvestRecords();  
        } catch (error) {
            console.error("Error approving harvest record:", error);
        } finally {
            setLoading(false);
        }
    };
    
    const rejectHarvestRecord = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/accounts/api/approve/${id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: "Rejected",
                }),
            });
    
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            fetchHarvestRecords();  
        } catch (error) {
            console.error("Error approving harvest record:", error);
        } finally {
            setLoading(false);
        }
    };
    

    // const rejectHarvestRecord = async (id) => {
    //     setLoading(true);
    //     try {
    //         const res = await fetch(`http://127.0.0.1:8000/api/accounts/api/get-harvests/${id}/reject/`, {
    //             method: "PATCH",
    //         });
    //         if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    //         fetchHarvestRecords();  
    //     } catch (error) {
    //         console.error("Error rejecting harvest record:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://127.0.0.1:8000/api/accounts/api/payments/");
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            const data = await res.json();
            setPayments(data);
            const total = data.reduce((sum, payment) => sum + payment.amount, 0);
            setTotalPayments(total);
        } catch (error) {
            console.error("Error fetching payments:", error);
        } finally {
            setLoading(false);
        }
    };

    const markPaymentAsPaid = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/accounts/api/payments/${id}/pay/`, {
                method: "PATCH",
            });
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            fetchPayments();  // Refresh payments
        } catch (error) {
            console.error("Error marking payment as paid:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="max-w-6xl w-full bg-white rounded-lg shadow-2xl overflow-hidden">
                <header className="bg-indigo-600 p-8 text-center rounded-t-lg">
                    <h1 className="text-4xl font-semibold text-white">Manager Dashboard</h1>
                </header>
                <div className="p-8 space-y-8">
                    <button onClick={() => setShow(true)} className="bg-green-500 text-white p-3 rounded-lg m-3">Show Harvest</button>
                    <button onClick={() => setShow(false)} className="bg-green-500 text-white p-3 rounded-lg m-3">Show Farmers</button>

                    {show ? (
                        <div>
                           <section>
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Harvest Records</h2>
    <div className="space-y-4">
        {loading ? (
            <p className="text-gray-600">Loading...</p>
        ) : harvestRecords.length > 0 ? (
            harvestRecords.map((record) => (
                <div key={record.id} className="border p-4 rounded-lg shadow-md flex justify-between items-center">
    <div>
        <h3 className="text-xl font-semibold text-gray-800">{record.date}</h3>
        <p className="text-gray-600">{record.kilos} kilos</p>
    </div>
    <div>
        Farmer: {record.username}
    </div>
    <div>
        Label: {record.label}
    </div>
    <p>{record.status}</p>
    {record.status === "Pending" && (
        <div className="flex space-x-2">
            <button
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                onClick={() => openPopup('approve', record.id)}
            >
                Approve
            </button>
            <button
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                onClick={() => openPopup('reject', record.id)}
            >
                Reject
            </button>
        </div>
    )}
</div>
            ))
        ) : (
            <p className="text-gray-600">No harvest records found.</p>
        )}
    </div>
</section>

                        </div>
                    ) : (
                        <div>
                            <section>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Farmers</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <input
                                        type="text"
                                        placeholder="Farmer Name"
                                        value={newFarmer.name}
                                        onChange={(e) => setNewFarmer({ ...newFarmer, name: e.target.value })}
                                        className="border border-gray-300 p-3 rounded-lg w-full"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Phone"
                                        value={newFarmer.phone}
                                        onChange={(e) => setNewFarmer({ ...newFarmer, phone: e.target.value })}
                                        className="border border-gray-300 p-3 rounded-lg w-full"
                                    />
                                    <button className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors" onClick={addFarmer}>
                                        Add Farmer
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {loading ? (
                                        <p className="text-gray-600">Loading...</p>
                                    ) : farmers.length > 0 ? (
                                        farmers.map((farmer) => (
                                            <div key={farmer.id} className="border p-4 rounded-lg shadow-md flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-800">{farmer.username}</h3>
                                                    <p className="text-gray-600">{farmer.email}</p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                                        onClick={() => setEditFarmer(farmer)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                                                        onClick={() => deleteFarmer(farmer.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-600">No farmers found.</p>
                                    )}
                                </div>
                            </section>
                        </div>
                    )}
                </div>
            </div>
            {isPopupOpen && (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">{currentAction === 'approve' ? 'Approve' : 'Reject'} Harvest Record</h2>
            <textarea
                className="w-full h-32 p-2 border border-gray-300 rounded-md mb-4"
                placeholder="Enter your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
                <button
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
                    onClick={closePopup}
                >
                    Cancel
                </button>
                <button
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    </div>
)}
        </div>
    );
}
