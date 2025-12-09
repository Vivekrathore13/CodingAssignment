const Contact = require('../models/Contact');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const createContact = catchAsync(async (req, res, next) => {
    const { fullName, email, mobile, city } = req.body;
    if (!fullName || !email || !mobile || !city) {
        return next(new AppError('All fields are required', 400));
    }
    const newContact = new Contact({ fullName, email, mobile, city });
    await newContact.save();
    res.status(201).json({ message: 'Contact submitted successfully' });
});

const getContacts = catchAsync(async (req, res, next) => {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
});

module.exports = { createContact, getContacts };
