import React from 'react';
import uni1Logo from '../assets/uni1.png';

const TrustedInstitutions = () => {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-screen-xl mx-auto px-4 text-center">
                <h3 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-8">
                    Trusted By Leading Institutions
                </h3>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <img
                            key={item}
                            src={uni1Logo}
                            alt={`University Logo ${item}`}
                            className="h-10 md:h-12 object-contain"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedInstitutions;