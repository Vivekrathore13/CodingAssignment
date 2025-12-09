const Newsletter = require('../models/Newsletter');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const subscribe = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(new AppError('Email is required', 400));
    }
    // Check duplication
    const existing = await Newsletter.findOne({ email });
    if (existing) {
        return next(new AppError('Email already subscribed', 400));
    }

    const newSub = new Newsletter({ email });
    await newSub.save();
    res.status(201).json({ message: 'Subscribed successfully' });
});

const getSubscribers = catchAsync(async (req, res, next) => {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subscribers);
});

module.exports = { subscribe, getSubscribers };
