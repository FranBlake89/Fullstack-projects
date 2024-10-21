import React, { useState } from "react";
import "../assets/styles/login.css";

import BackgroundImage from "../assets/images/background.jpg";
import Logo from "../assets/favicon.svg";

import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await delay(500);
        
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { username, password });

            if (response.status === 200){
                localStorage.setItem('token', response.data.token); // Guardar el token
                navigate('/dashboard');
            }

        } catch (error) {
            let errorMsg;

            if(error.response){
                if(error.response.status === 401){
                    errorMsg = 'Invalid credentials'
                }
                else if (error.response.status >= 500){
                    errorMsg = 'Server error. Please try again later.'
                }
                else{
                    errorMsg = 'An ocurred. Please try again.'
                }
            }
            else if(error.request){
                errorMsg = 'No response from the server. Please check your connection'
            }
            else{
                errorMsg = 'Error: ' + error.message;
            }

            setError(errorMsg);
            setShow(true);
            console.log(error);
        }
    
        setLoading(false);
    };

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    return (
    <div
    className="w-screen relative flex flex-col items-center justify-center h-screen bg-cover bg-center"
    style={{ backgroundImage: `url(${BackgroundImage})`}}
    >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Form */}
        <form
            className="relative z-10 p-6 bg-transparent rounded-lg shadow-md w-full max-w-md"
            onSubmit={handleSubmit}
        >
            {/* Header */}
            <img className="mx-auto mb-4 max-w-[72px]" src={Logo} alt="logo" />

            {/* Alert */}
            {show ? (
            <div className="mb-4 bg-red-400 text-white text-sm px-4 py-2 rounded-lg flex justify-between items-center">
                <span>{error}</span>
                <button
                type="button"
                className="text-white"
                onClick={() => setShow(false)}
                >
                &times;
                </button>
            </div>
            ) : (
            <div />
            )}

            {/* Username Input */}
            <div className="mb-4 opacity-75">
            <input
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-orange-500"
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setusername(e.target.value)}
                required
            />
            </div>

            {/* Password Input */}
            <div className="mb-4 opacity-75">
            <input
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-orange-500"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>

            {/* Submit Button */}
            {!loading ? (
            <button
                className="w-full mt-4 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-600 focus:outline-none focus:ring"
                type="submit"
            >
                Log In
            </button>
            ) : (
            <button
                className="w-full mt-4 py-2 bg-orange-500 text-white rounded-full"
                type="submit"
                disabled
            >
                Logging In...
            </button>
            )}

           
        </form>
         {/* Footer */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center text-white mb-4">
            Made by Francisco C | &copy;2024
        </div>
    </div>
    );
};

export default Login;
