export default function Step2({ formData, updateFormData, nextStep, prevStep }) {
    const isStudent = formData.role === "Student";

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isStudent ? "Academic Profile" : "Professional Profile"}
            </h1>
            <p className="text-gray-500 mb-8 text-center px-4">
                please provide your university details to gain access to the platform.
            </p>

            <div className="w-full space-y-5">

                {/* Institution Field */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1">
                        {isStudent ? "Institution" : "Employing Institution"}
                    </label>
                    <div className="relative">
                        <select
                            value={formData.institution}
                            onChange={(e) => updateFormData("institution", e.target.value)}
                            className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 bg-white appearance-none"
                        >
                            <option value="" disabled></option>
                            <option value="University Ahmed Benbella">University Ahmed Benbella</option>
                            <option value="University of Oran 1">University of Oran 1</option>
                            <option value="USTO">USTO</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Faculty Field */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1">Faculty</label>
                    <div className="relative">
                        <select
                            value={formData.faculty}
                            onChange={(e) => updateFormData("faculty", e.target.value)}
                            className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 bg-white appearance-none"
                        >
                            <option value="" disabled></option>
                            <option value="FSEA">FSEA</option>
                            <option value="Faculty of Medicine">Faculty of Medicine</option>
                            <option value="Faculty of Law">Faculty of Law</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Level Field */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1">
                        {isStudent ? "Academic Level" : "Professional Level"}
                    </label>
                    <div className="relative">
                        <select
                            value={formData.level}
                            onChange={(e) => updateFormData("level", e.target.value)}
                            className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 bg-white appearance-none"
                        >
                            <option value="" disabled></option>
                            {isStudent ? (
                                <>
                                    <option value="L1">L1</option>
                                    <option value="L2">L2</option>
                                    <option value="L3">L3</option>
                                    <option value="M1">M1</option>
                                    <option value="M2">M2</option>
                                </>
                            ) : (
                                <>
                                    <option value="MAA">MAA</option>
                                    <option value="MAB">MAB</option>
                                    <option value="MCA">MCA</option>
                                    <option value="MCB">MCB</option>
                                    <option value="Professor">Professor</option>
                                </>
                            )}
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Field Selection */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1">Field</label>
                    <div className="relative">
                        <select
                            value={formData.field}
                            onChange={(e) => updateFormData("field", e.target.value)}
                            className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 bg-white appearance-none"
                        >
                            <option value="" disabled></option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="CyberSecurity">CyberSecurity</option>
                            <option value="Information Systems">Information Systems</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:space-x-4 pt-4">
                    <button
                        onClick={prevStep}
                        className="w-full sm:w-auto mt-3 sm:mt-0 py-3 px-6 text-blue-500 font-medium flex justify-center items-center hover:bg-gray-50 rounded-lg transition"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </button>

                    <button
                        onClick={nextStep}
                        className="w-full py-3 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-blue-600 transition flex-1"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}