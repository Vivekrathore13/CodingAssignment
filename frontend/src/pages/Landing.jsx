import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProjectCard from '../components/ProjectCard';
import ClientCard from '../components/ClientCard';
import ContactForm from '../components/ContactForm';
import Newsletter from '../components/Newsletter';
import api from '../services/api';

const Landing = () => {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projRes, cliRes] = await Promise.all([
                    api.get('/projects'),
                    api.get('/clients')
                ]);
                setProjects(projRes.data);
                setClients(cliRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <HeroSection />

            {/* Projects Section */}
            <section id="projects" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Projects</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Explore our latest work and see how we help businesses solve problems.
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl"></div>)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {projects.map(project => (
                                <ProjectCard key={project._id} project={project} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Clients Section */}
            <section id="clients" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Happy Clients</h2>
                        <p className="text-gray-600">See what our partners have to say about us.</p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[1, 2].map(i => <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-xl"></div>)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {clients.map(client => (
                                <ClientCard key={client._id} client={client} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-white">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Let's Work Together</h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            Have a project in mind? We'd love to hear from you. Fill out the form or reach out via email.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center text-gray-700">
                                <span className="font-bold mr-2">Email:</span> hello@digitalagency.com
                            </div>
                            <div className="flex items-center text-gray-700">
                                <span className="font-bold mr-2">Phone:</span> +1 (555) 123-4567
                            </div>
                        </div>
                    </div>
                    <ContactForm />
                </div>
            </section>

            <Newsletter />

            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-xl font-bold mb-4">DigitalAgency</h4>
                        <p className="text-gray-400 text-sm">Building future-ready digital experiences.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#projects">Projects</a></li>
                            <li><a href="#clients">Clients</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Social</h4>
                        <div className="flex space-x-4">
                            {/* Icons would go here */}
                            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div className="text-center text-gray-600 text-sm mt-12 pt-8 border-t border-gray-800">
                    © 2025 DigitalAgency. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Landing;
