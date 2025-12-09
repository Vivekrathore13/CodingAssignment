import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ContactsAdmin = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await api.get('/contact');
                setContacts(res.data);
            } catch (error) {
                console.error('Error fetching', error);
            }
        };
        fetchContacts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <aside className="w-64 bg-white shadow-md hidden md:block">
                <div className="p-6 border-b"><h2 className="text-2xl font-bold text-primary">AdminPanel</h2></div>
                <nav className="p-4 space-y-2">
                    <Link to="/admin/dashboard" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Dashboard</Link>
                    <Link to="/admin/projects" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Projects</Link>
                    <Link to="/admin/clients" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Clients</Link>
                    <Link to="/admin/contacts" className="block px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-bold">Contacts</Link>
                    <Link to="/admin/subscribers" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Subscribers</Link>
                </nav>
            </aside>

            <main className="flex-1 p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Messages</h1>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Mobile
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    City
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact) => (
                                <tr key={contact._id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap font-semibold">{contact.fullName}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{contact.email}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{contact.mobile}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{contact.city}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {new Date(contact.createdAt).toLocaleDateString()}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {contacts.length === 0 && <div className="p-6 text-center text-gray-500">No messages found.</div>}
                </div>
            </main>
        </div>
    );
};

export default ContactsAdmin;
