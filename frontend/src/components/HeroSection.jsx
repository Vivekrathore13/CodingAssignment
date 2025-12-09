import React from 'react';

const HeroSection = () => {
    return (
        <section id="home" className="py-20 bg-gradient-to-br from-blue-50 to-white">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                        We Build Awesome <span className="text-primary">Websites</span> & Digital Experiences
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Transforming ideas into reality with cutting-edge technology and design.
                        We help your business grow in the digital age.
                    </p>
                    <a
                        href="#projects"
                        className="inline-block bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105"
                    >
                        Get Started
                    </a>
                </div>
                <div className="hidden md:flex justify-center">
                    {/* Abstract Placeholder for Vector Illustration */}
                    <div className="w-96 h-96 bg-secondary/10 rounded-full flex items-center justify-center relative overflow-hidden">
                        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full animate-bounce"></div>
                        <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary/20 rounded-full animate-pulse"></div>
                        <div className="z-10 text-9xl text-primary/20 font-bold">DA</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
