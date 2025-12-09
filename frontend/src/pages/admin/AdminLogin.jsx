import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple token matching as per requirements (in real app, use proper auth)
        // The instruction implementation implies matching what backend expects as Bearer
        // But since we don't have a /login endpoint that returns a token based on password,
        // and requirements say "simple token-based system (ADMIN_TOKEN from .env)",
        // the user likely has to input the token directly or a password that *is* the token?
        // Let's assume the user enters the token directly for this "Simple" requirement 
        // OR we just simulate a login.
        // Wait, the backend middleware checks `if (token === process.env.ADMIN_TOKEN)`.
        // So the frontend needs to store this token.
        // I will just ask the user to enter the Admin Token.

        if (token) {
            localStorage.setItem('ADMIN_TOKEN', token);
            navigate('/admin/dashboard');
        } else {
            setError('Please enter the token.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Admin Login</h2>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Admin Token</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none transition"
                            placeholder="Enter secret token"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
