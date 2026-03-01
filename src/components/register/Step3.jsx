export default function Step3({ formData, updateFormData, prevStep, handleSubmit }) {
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            updateFormData("idPhoto", e.target.files[0]);
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Identity</h1>
            <p className="text-gray-500 mb-8 text-center px-4">
                We use this information to verify your university affiliation. Please ensure it is accurate.
            </p>

            <div className="w-full space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1">Student/Staff ID Number</label>
                    <input
                        type="text"
                        placeholder="eg.UN31202054589878"
                        value={formData.idNumber}
                        onChange={(e) => updateFormData("idNumber", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 mb-1"
                    />
                    <p className="text-xs text-gray-500">The id need to be the same as printed in the uploaded id card.</p>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1">Upload ID Card Photo</label>
                    <div className="mt-2 w-full flex justify-center px-6 pt-10 pb-10 border-2 border-blue-400 border-dashed rounded-xl bg-white relative">
                        <div className="space-y-2 text-center">
                            <div className="flex text-sm text-gray-600 justify-center items-center font-bold">
                                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-bold text-black hover:text-blue-500 focus-within:outline-none">
                                    <span>Click to upload or drag and drop</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg" />
                                </label>
                            </div>
                            <p className="text-sm text-gray-500">PNG or JPG (max.2MB)</p>
                        </div>
                    </div>
                    {formData.idPhoto && (
                        <p className="text-sm text-green-600 mt-2 text-center">
                            Selected file: {formData.idPhoto.name}
                        </p>
                    )}
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
                        onClick={handleSubmit}
                        className="w-full py-3 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-blue-600 transition flex-1"
                    >
                        Complete
                    </button>
                </div>
            </div>
        </div>
    );
}