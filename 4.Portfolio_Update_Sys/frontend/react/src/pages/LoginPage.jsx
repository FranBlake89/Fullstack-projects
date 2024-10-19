import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
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
        
        if (username !== "admin" || password !== "admin") {
        setShow(true);
        }
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { username, password });
            console.log(response);
            localStorage.setItem('token', response.data.token); // Guardar el token
            navigate('/dashboard'); // Redirigir al dashboard
        } catch (error) {
            setError('Invalid credentials');
            console.log(error);
        }
    
        setLoading(false);
    };

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
// TODO MAKE IT RESPONSIVE, TO MOBILE
    return (
        <div
        className="sign-in__wrapper"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
        {/* Overlay */}
        <div className="sign-in__backdrop"></div>
        {/* Form */}
        <Form className=" p-4  rounded" onSubmit={handleSubmit}>
            {/* Header */}
            <img
            className=" mx-auto d-block mb-2"
            src={Logo}
            alt="logo"
            />

            {/* ALert */}
            {show ? (
            <Alert
                className="mb-2"
                variant="danger"
                onClose={() => setShow(false)}
                dismissible
            >
                Incorrect username or password.
            </Alert>
            ) : (
            <div />
            )}
            <Form.Group className="mt-5 mb-2 opacity-50" controlId="username">
                <Form.Control
                    className="rounded-pill custom-input"
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setusername(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group
            className="mb-2 opacity-50"
            controlId="password"
            >
                <Form.Control
                    className="rounded-pill custom-input"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            {!loading ? (
            <Button
                className="w-100 mt-5 rounded-pill py-2"
                variant="primary"
                type="submit"
            >
                Log In
            </Button>
            ) : (
            <Button
                className="w-100 mt-5"
                variant="orange"
                type="submit"
                disabled
            >
                Logging In...
            </Button>
            )}
            <div className="d-grid justify-content-end"></div>
        </Form>
        {/* Footer */}
        <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
            Made by Francisco C | &copy;2024
        </div>
        </div>
    );
};

export default Login;
