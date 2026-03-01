const Footer = () => {
    return (
        <footer className="bg-gray-50 pt-12 pb-6 border-t border-gray-200">
            <div className="max-w-screen-xl mx-auto px-4">

                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
                    {/* Logo & Info */}
                    <div className="md:col-span-1 flex flex-col items-center md:items-start">
                        <a href="#" className="flex items-center gap-2 mb-4">
                            {/* Using a placeholder SVG for the logo */}
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">U</div>
                            <span className="text-xl font-bold text-gray-800">Uni-Sphere</span>
                        </a>
                        <p className="text-xs text-gray-500 max-w-xs">
                            Connecting minds, empowering research and building future of global education together.
                        </p>
                    </div>

                    {/* Links Columns */}
                    <div className="flex flex-col space-y-3">
                        <h4 className="font-bold text-gray-800">Platform</h4>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Home</a>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Courses</a>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Forum</a>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <h4 className="font-bold text-gray-800">Legal</h4>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</a>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Terms Of Use</a>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <h4 className="font-bold text-gray-800">Support</h4>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-900">About-Us</a>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-900">FAQ</a>
                    </div>
                </div>

                <hr className="border-gray-200 mb-6" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-500 text-center md:text-left">
                        © 2026 UniSphere. All rights reserved. UniSphere is a secure platform connecting students and teachers across universities in Algeria.
                    </p>

                    <div className="flex items-center space-x-4 text-gray-500">
                        <button className="hover:text-gray-800">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                        </button>
                        <button className="hover:text-gray-800">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                        </button>
                        <button className="hover:text-gray-800">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer