const Client = require('../models/Client');

const getClients = async (req, res) => {
    try {
        const clients = await Client.find().sort({ createdAt: -1 });
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createClient = async (req, res) => {
    try {
        const { name, description, designation, image } = req.body;
        if (!name || !description || !designation || !image) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newClient = new Client({ name, description, designation, image });
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateClient = async (req, res) => {
    try {
        const { name, description, designation } = req.body;
        const updatedClient = await Client.findByIdAndUpdate(
            req.params.id,
            { name, description, designation },
            { new: true }
        );
        res.json(updatedClient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteClient = async (req, res) => {
    try {
        await Client.findByIdAndDelete(req.params.id);
        res.json({ message: 'Client deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getClients, createClient, updateClient, deleteClient };
