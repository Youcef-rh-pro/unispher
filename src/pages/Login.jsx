import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        idNumber: "",
        password: "",
    });
    const [error, setError] = useState(null);

    const updateFormData = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (error) setError(null);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.message || "Invalid credentials");
                return;
            }

            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="min-h-screen flex font-sans">
            <div
                className="hidden md:block md:w-1/2 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2000&auto=format&fit=crop')" }}
            >
                <div className="w-full h-full bg-blue-900/40"></div>
            </div>

            <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">Welcome Back to UniSphere</h1>
                        <p className="text-gray-500 text-center">Sign in to connect with students and teachers across universities.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}

                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-1">Student/Staff ID Number</label>
                            <input
                                type="text"
                                placeholder="eg.UN31202054589878"
                                value={formData.idNumber}
                                onChange={(e) => updateFormData("idNumber", e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Strong password is required"
                                    value={formData.password}
                                    onChange={(e) => updateFormData("password", e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
                                    required
                                />
                                <button type="button" className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-start">
                            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                                Forget your password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-blue-600 transition flex justify-center items-center"
                        >
                            Login
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </form>

                    <p className="text-center text-gray-600 mt-8">
                        you want to be one of us? <Link to="/register" className="text-blue-500 font-bold hover:underline">Join Us Here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}