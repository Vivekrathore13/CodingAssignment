import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {
    BriefcaseIcon,
    UserGroupIcon,
    ChatBubbleLeftRightIcon,
    EnvelopeIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
    const [stats, setStats] = useState({ projects: 0, clients: 0, contacts: 0, subs: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch all data for counts (not efficient for large data, but fine for MVP)
                const [p, c, co, s] = await Promise.all([
                    api.get('/projects'),
                    api.get('/clients'),
                    api.get('/contact'),
                    api.get('/newsletter')
                ]);
                setStats({
                    projects: p.data.length,
                    clients: c.data.length,
                    contacts: co.data.length,
                    subs: s.data.length
                });
            } catch (error) {
                console.error("Dashboard error", error);
                if (error.response?.status === 401 || error.response?.status === 403) {
                    navigate('/admin/login');
                }
            }
        };
        fetchStats();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('ADMIN_TOKEN');
        navigate('/admin/login');
    };

    const cards = [
        { title: 'Total Projects', count: stats.projects, icon: BriefcaseIcon, link: '/admin/projects', color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
        { title: 'Total Clients', count: stats.clients, icon: UserGroupIcon, link: '/admin/clients', color: 'bg-gradient-to-r from-cyan-500 to-cyan-600' },
        { title: 'Messages', count: stats.contacts, icon: ChatBubbleLeftRightIcon, link: '/admin/contacts', color: 'bg-gradient-to-r from-indigo-500 to-indigo-600' },
        { title: 'Subscribers', count: stats.subs, icon: EnvelopeIcon, link: '/admin/subscribers', color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar (Simple) */}
            <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold text-primary">AdminPanel</h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/admin/dashboard" className="block px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium">Dashboard</Link>
                    <Link to="/admin/projects" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900">Projects</Link>
                    <Link to="/admin/clients" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900">Clients</Link>
                    <Link to="/admin/contacts" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900">Contacts</Link>
                    <Link to="/admin/subscribers" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900">Subscribers</Link>
                </nav>
                <div className="p-4 border-t">
                    <button onClick={handleLogout} className="flex items-center text-red-600 hover:bg-red-50 w-full px-4 py-2 rounded-lg transition">
                        <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8 md:hidden">
                    <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                    <button onClick={handleLogout} className="text-red-600">Logout</button>
                </header>

                <h1 className="text-3xl font-bold text-gray-800 mb-8 hidden md:block">Welcome, Admin</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, idx) => (
                        <Link to={card.link} key={idx} className={`${card.color} text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm opacity-90 font-medium mb-1">{card.title}</p>
                                    <h3 className="text-4xl font-bold">{card.count}</h3>
                                </div>
                                <card.icon className="w-10 h-10 opacity-80" />
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
