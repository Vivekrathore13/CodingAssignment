const Client = require('../models/Client');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const getClients = catchAsync(async (req, res, next) => {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
});

const createClient = catchAsync(async (req, res, next) => {
    const { name, description, designation, image } = req.body;
    if (!name || !description || !designation || !image) {
        return next(new AppError('All fields are required', 400));
    }
    const newClient = new Client({ name, description, designation, image });
    await newClient.save();
    res.status(201).json(newClient);
});

const updateClient = catchAsync(async (req, res, next) => {
    const { name, description, designation } = req.body;
    const updatedClient = await Client.findByIdAndUpdate(
        req.params.id,
        { name, description, designation },
        { new: true, runValidators: true }
    );
    if (!updatedClient) {
        return next(new AppError('No client found with that ID', 404));
    }
    res.json(updatedClient);
});

const deleteClient = catchAsync(async (req, res, next) => {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
        return next(new AppError('No client found with that ID', 404));
    }
    res.json({ message: 'Client deleted' });
});

module.exports = { getClients, createClient, updateClient, deleteClient };
