const FeaturesSection = () => {
    const features = [
        {
            title: "Centralized Resources",
            desc: "Access academic documents and announcements everywhere!",
            icon: (
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
            )
        },
        {
            title: "Simple & Secure Communication",
            desc: "Instant messaging to stay connected with professors and students.",
            icon: (
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
            )
        },
        {
            title: "Safe & Academic-Focused",
            desc: "Provides a secure and structured space focused on learning and collaboration.",
            icon: (
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
            )
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="mb-10 max-w-2xl">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Join The Network ?</h2>
                    <p className="text-gray-600">
                        Connects students and teachers from different universities in one secure platform.
                        Share and access academic resources easily. Stay updated and communicate with your peers and teachers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-start">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                {item.icon}
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default FeaturesSection