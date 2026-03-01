import React from 'react';
import studentImg from '../assets/student.png';

const ExpandResearchSection = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-screen-xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">

                <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Expand Your Research Horizons</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Connect with students and teachers from universities across the country, access
                        academic resources beyond your own institution, share ideas, collaborate on projects
                        and stay informed about events and opportunities. Take your learning and research
                        to the next level in one secure and centralized platform.
                    </p>
                    <a href="#" className="inline-flex items-center text-blue-600 font-semibold hover:underline">
                        Expand Your Research — Register
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>


                <div className="flex-1 w-full">
                    <img
                        src={studentImg}
                        alt="Students working together"
                        className="w-full h-auto rounded-2xl shadow-md object-cover"
                    />
                </div>

            </div>
        </section>
    );
};

export default ExpandResearchSection;