import { useState } from "react";

export default function ChangePassword({ email, onNext, onCancel }) {
    const [formData, setFormData] = useState({ password: "", confirmPassword: "" });

    const handleSave = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) return;
        try {
            // await fetch('/api/password/reset', { method: 'POST', body: JSON.stringify({ email, password: formData.password }) });
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

            <h1 className="text-3xl font-bold text-gray-900 mb-8">Change Password</h1>

            <form onSubmit={handleSave} className="w-full space-y-5">
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1">Password</label>
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="New Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
                            required
                        />
                        <button type="button" className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1">Confirm</label>
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
                            required
                        />
                        <button type="button" className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="pt-2 space-y-2">
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-blue-600 transition"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full py-3 text-blue-500 font-medium hover:bg-gray-50 rounded-lg transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}