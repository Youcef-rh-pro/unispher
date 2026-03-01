import { Link } from "react-router-dom";

export default function SuccessMessage() {
    return (
        <div className="flex flex-col items-center w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Password Successfully Updated</h1>
            <p className="text-gray-500 mb-8 px-2">
                For security reasons, you have been logged out of your account. Please sign in again using your new password to continue accessing UniSphere and your academic workspace.
            </p>

            <Link
                to="/login"
                className="w-full py-3 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-blue-600 transition flex justify-center items-center"
            >
                Go To Login Page
            </Link>
        </div>
    );
}