import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-20 bg-white border-b border-gray-200">
            <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">

                <Link to="/" className="flex items-center">
                    <span className="text-xl font-semibold text-gray-700">
                        Uni-sphere
                    </span>
                </Link>

                <div className="flex md:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="inline-flex items-center justify-center w-10 h-10 text-gray-600 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        {menuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                <ul className="hidden md:flex items-center space-x-8 font-medium">
                    <li><Link to="/" className="text-gray-600 hover:text-gray-900 transition">About</Link></li>
                    <li><Link to="/" className="text-gray-600 hover:text-gray-900 transition">Universities</Link></li>
                    <li><Link to="/" className="text-gray-600 hover:text-gray-900 transition">Contact-Us</Link></li>
                </ul>

                <div className="hidden md:flex items-center space-x-3">
                    <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                        Login
                    </Link>
                    <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900 transition">
                        Join Now
                    </Link>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white px-4 pb-4">
                    <ul className="flex flex-col space-y-3 pt-3 font-medium">
                        <li><Link to="/" className="block text-gray-600 hover:text-gray-900 transition">About</Link></li>
                        <li><Link to="/" className="block text-gray-600 hover:text-gray-900 transition">Universities</Link></li>
                        <li><Link to="/" className="block text-gray-600 hover:text-gray-900 transition">Contact-Us</Link></li>
                    </ul>
                    \<div className="flex flex-col space-y-2 mt-4">
                        <Link to="/login" className="w-full text-center px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                            Login
                        </Link>
                        <Link to="/register" className="w-full text-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900 transition">
                            Join Now
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}