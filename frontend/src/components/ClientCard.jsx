import React from 'react';

const ClientCard = ({ client }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <img
                src={client.image}
                alt={client.name}
                className="w-24 h-24 rounded-full shadow-lg mb-4 object-cover border-4 border-white"
            />
            <h4 className="text-lg font-bold text-gray-900">{client.name}</h4>
            <p className="text-primary text-sm font-medium mb-3">{client.designation}</p>
            <p className="text-gray-600 italic text-sm">"{client.description}"</p>
        </div>
    );
};

export default ClientCard;
