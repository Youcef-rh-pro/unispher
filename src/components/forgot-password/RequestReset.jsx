import { Link } from "react-router-dom";

export default function RequestReset({ email, setEmail, onNext }) {
    const handleSendCode = async (e) => {
        e.preventDefault();
        try {
            // await fetch('/api/password/request-reset', { method: 'POST', body: JSON.stringify({ email }) });
            onNext();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
            <p className="text-gray-500 mb-8 text-center">Use the email address you registered with.</p>

            <form onSubmit={handleSendCode} className="w-full space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1">Email</label>
                    <input
                        type="email"
                        placeholder="eg.ahmed@univ-oran.dz"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-blue-600 transition"
                >
                    Send Code
                </button>

                <Link to="/login" className="w-full py-3 text-blue-500 font-medium flex justify-center items-center hover:bg-gray-50 rounded-lg transition">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back
                </Link>
            </form>
        </div>
    );
}