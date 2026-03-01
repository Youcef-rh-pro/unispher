import { useState, useRef } from "react";

export default function OtpVerification({ email, onNext, onBack }) {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        if (element.nextSibling) element.nextSibling.focus();
    };

    const handleVerify = async () => {
        const code = otp.join("");
        try {
            // await fetch('/api/password/verify-otp', { method: 'POST', body: JSON.stringify({ email, code }) });
            onNext();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">OTP Verification</h1>
            <p className="text-gray-500 mb-8 text-center px-4">check your email inbox to get the verification code.</p>

            <div className="w-full">
                <label className="block text-sm font-bold text-gray-900 mb-3">Code</label>
                <div className="flex justify-between space-x-2 mb-2">
                    {otp.map((data, index) => (
                        <input
                            className="w-12 h-12 text-center text-xl font-bold border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                            type="text"
                            name="otp"
                            maxLength="1"
                            key={index}
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onFocus={(e) => e.target.select()}
                        />
                    ))}
                </div>

                <div className="flex justify-end mb-8">
                    <button className="text-sm text-blue-500 font-bold hover:underline">Resend Code</button>
                </div>

                <button
                    onClick={handleVerify}
                    className="w-full py-3 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-blue-600 transition mb-2"
                >
                    Verify
                </button>

                <button
                    onClick={onBack}
                    className="w-full py-3 text-blue-500 font-medium flex justify-center items-center hover:bg-gray-50 rounded-lg transition"
                >
                    Change Email
                </button>
            </div>
        </div>
    );
}