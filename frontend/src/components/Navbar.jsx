import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-primary">
                    DigitalAgency
                </Link>
                <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
                    <a href="#home" className="hover:text-primary transition">Home</a>
                    <a href="#projects" className="hover:text-primary transition">Projects</a>
                    <a href="#clients" className="hover:text-primary transition">Clients</a>
                    <a href="#contact" className="hover:text-primary transition">Contact</a>
                </div>
                <Link
                    to="/admin/login"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold transition"
                >
                    Admin
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
