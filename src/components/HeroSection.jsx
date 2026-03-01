import React from 'react';
import libraryBg from '../assets/librarybg.png';

const HeroSection = () => {
    return (
        <section className="max-w-screen-xl mx-auto p-4 mt-4">
            <div
                className="relative bg-cover bg-center rounded-3xl overflow-hidden flex flex-col items-center justify-center text-center py-24 md:py-32 px-4"
                style={{ backgroundImage: `url(${libraryBg})` }}
            >
                <div className="absolute inset-0 bg-black/60 z-0"></div>

                {/* Content */}
                <div className="relative z-10 max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Collaborate Across<br />Borders
                    </h1>
                    <p className="text-sm md:text-base text-gray-200 mb-8 max-w-2xl mx-auto">
                        Connect with peers and professors from top universities worldwide
                        access shared resources and elevate your academic journey with our unified platform
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="w-full sm:w-auto px-6 py-3 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
                            Join Network
                        </button>
                        <button className="w-full sm:w-auto px-6 py-3 font-medium text-gray-900 bg-white rounded-md hover:bg-gray-100 transition">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;