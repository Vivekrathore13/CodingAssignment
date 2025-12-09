import React, { useState } from 'react';
import api from '../services/api';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        city: ''
    });
    const [status, setStatus] = useState({ loading: false, success: null, message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: null, message: '' });
        try {
            await api.post('/contact', formData);
            setStatus({ loading: false, success: true, message: 'Message sent successfully!' });
            setFormData({ fullName: '', email: '', mobile: '', city: '' });
        } catch (error) {
            setStatus({ loading: false, success: false, message: error.response?.data?.message || 'Something went wrong.' });
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Get In Touch</h3>
            {status.message && (
                <div className={`mb-4 p-3 rounded text-center text-sm ${status.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {status.message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text" name="fullName" value={formData.fullName} onChange={handleChange} required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email" name="email" value={formData.email} onChange={handleChange} required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                    <input
                        type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                        type="text" name="city" value={formData.city} onChange={handleChange} required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                </div>
                <button
                    type="submit" disabled={status.loading}
                    className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow transition disabled:opacity-50"
                >
                    {status.loading ? 'Sending...' : 'Submit Message'}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
