require('../backend/node_modules/dotenv').config({ path: '../backend/.env' });
const mongoose = require('../backend/node_modules/mongoose');
const Project = require('../backend/src/models/Project');
const Client = require('../backend/src/models/Client');
const Contact = require('../backend/src/models/Contact');
const Newsletter = require('../backend/src/models/Newsletter');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Clear existing
        await Project.deleteMany({});
        await Client.deleteMany({});
        await Contact.deleteMany({});
        await Newsletter.deleteMany({});

        // Seed Projects
        const projects = [
            {
                name: 'E-Commerce Platform',
                description: 'A full-stack e-commerce solution with payment integration.',
                image: 'https://picsum.photos/seed/101/450/350',
            },
            {
                name: 'Portfolio Website',
                description: 'Minimalist portfolio for a creative agency.',
                image: 'https://picsum.photos/seed/102/450/350',
            },
            {
                name: 'Task Management App',
                description: 'Productivity tool for teams to manage workflows.',
                image: 'https://picsum.photos/seed/103/450/350',
            },
            {
                name: 'Social Media Dashboard',
                description: 'Analytics dashboard for social media managers.',
                image: 'https://picsum.photos/seed/104/450/350',
            },
        ];
        await Project.insertMany(projects);

        // Seed Clients
        const clients = [
            {
                name: 'John Doe',
                description: 'Amazing service! Highly recommended.',
                designation: 'CEO, TechCorp',
                image: 'https://picsum.photos/seed/201/200/200',
            },
            {
                name: 'Jane Smith',
                description: 'The team was very professional and delivered on time.',
                designation: 'Marketing Director, CreativeInc',
                image: 'https://picsum.photos/seed/202/200/200',
            },
            {
                name: 'Michael Johnson',
                description: 'Exceeded our expectations in every way.',
                designation: 'Founder, StartupX',
                image: 'https://picsum.photos/seed/203/200/200',
            },
            {
                name: 'Sarah Williams',
                description: 'Great attention to detail and beautiful design.',
                designation: 'Product Manager, Appify',
                image: 'https://picsum.photos/seed/204/200/200',
            },
        ];
        await Client.insertMany(clients);

        // Seed Contacts
        const contacts = [
            {
                fullName: 'Alice Brown',
                email: 'alice@example.com',
                mobile: '1234567890',
                city: 'New York',
            },
            {
                fullName: 'Bob White',
                email: 'bob@example.com',
                mobile: '0987654321',
                city: 'Los Angeles',
            },
        ];
        await Contact.insertMany(contacts);

        // Seed Subscribers
        const subscribers = [
            { email: 'sub1@example.com' },
            { email: 'sub2@example.com' },
            { email: 'sub3@example.com' },
        ];
        await Newsletter.insertMany(subscribers);

        console.log('Data Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('Seeding Error:', error);
        process.exit(1);
    }
};

seedData();
