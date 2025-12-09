import React, { useState } from 'react';
import api from '../services/api';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ loading: false, success: null, message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: null, message: '' });
        try {
            await api.post('/newsletter', { email });
            setStatus({ loading: false, success: true, message: 'Subscribed successfully!' });
            setEmail('');
        } catch (error) {
            setStatus({ loading: false, success: false, message: error.response?.data?.message || 'Something went wrong.' });
        }
    };

    return (
        <div className="bg-gray-100 py-16">
            <div className="container mx-auto px-6 text-center max-w-2xl">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Subscribe to our Newsletter</h3>
                <p className="text-gray-600 mb-8">Stay updated with our latest news and offers.</p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        type="submit"
                        disabled={status.loading}
                        className="bg-secondary hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition whitespace-nowrap disabled:opacity-50"
                    >
                        {status.loading ? '...' : 'Subscribe'}
                    </button>
                </form>
                {status.message && (
                    <p className={`mt-4 text-sm font-semibold ${status.success ? 'text-green-600' : 'text-red-500'}`}>
                        {status.message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Newsletter;
