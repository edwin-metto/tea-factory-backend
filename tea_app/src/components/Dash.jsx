import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dash() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-200 p-4">
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-4xl w-full">
                <div className="p-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Green's System</h1>
                    <div className="max-w-[700px] mx-auto">
                        <img 
                            className="w-full h-64 object-cover rounded-lg shadow-md" 
                            src="https://i.pinimg.com/736x/b6/3a/8a/b63a8a24a63b9bce3853ddb562e43fe9.jpg" 
                            alt="Fresh Tea" 
                        />
                        <div className="mt-6">
                            <div className="font-bold text-2xl text-gray-800 mb-4">Fresh Tea</div>
                        </div>
                        <div className="mt-8">
                            <button 
                                onClick={() => navigate('/register')} 
                                className="m-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Register
                            </button>
                            <button 
                                onClick={() => navigate('/login')} 
                                className="m-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Login
                            </button>
                            
                            {/* Button to navigate to Admin Dashboard */}
                            {/* <button 
                                onClick={() => navigate('/admin-dashboard')} 
                                className="m-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Go to Admin Dashboard
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dash;
