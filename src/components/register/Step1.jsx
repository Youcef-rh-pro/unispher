import { Link } from "react-router-dom";

export default function Step1({ formData, updateFormData, nextStep }) {
    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Uni-Sphere</h1>
            <p className="text-gray-500 mb-8 text-center">First, Let's setup basic account details</p>

            <div className="w-full space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Select Your Role</label>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => updateFormData("role", "Student")}
                            className={`flex-1 relative flex flex-col items-center p-4 border rounded-xl transition-all ${formData.role === "Student" ? "border-blue-500 bg-blue-50/10" : "border-gray-200"
                                }`}
                        >
                            {formData.role === "Student" && (
                                <div className="absolute top-2 right-2 text-blue-500">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2 text-blue-500">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z" />
                                </svg>
                            </div>
                            <span className="font-bold text-gray-900 text-sm">I am a Student</span>
                        </button>

                        <button
                            onClick={() => updateFormData("role", "Teacher")}
                            className={`flex-1 relative flex flex-col items-center p-4 border rounded-xl transition-all ${formData.role === "Teacher" ? "border-blue-500 bg-blue-50/10" : "border-gray-200"
                                }`}
                        >
                            {formData.role === "Teacher" && (
                                <div className="absolute top-2 right-2 text-blue-500">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2 text-gray-600">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z" />
                                </svg>
                            </div>
                            <span className="font-bold text-gray-900 text-sm">I am a Teacher</span>
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1">Full Name</label>
                    <input
                        type="text"
                        placeholder="eg.Mohamed"
                        value={formData.fullName}
                        onChange={(e) => updateFormData("fullName", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1">Email Address</label>
                    <input
                        type="email"
                        placeholder="eg.mohamed@univ-oran.dz"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
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
                        />
                        <button className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <button
                    onClick={nextStep}
                    className="w-full py-3 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-blue-600 transition flex justify-center items-center"
                >
                    Continue
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>

                <p className="text-center text-gray-600 mt-4">
                    Already have an account? <Link to="/login" className="text-blue-500 font-bold hover:underline">login</Link>
                </p>
            </div>
        </div>
    );
}