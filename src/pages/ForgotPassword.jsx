import { useState } from "react";
import RequestReset from "../components/forgot-password/RequestReset";
import OtpVerification from "../components/forgot-password/OtpVerification";
import ChangePassword from "../components/forgot-password/ChangePassword";
import SuccessMessage from "../components/forgot-password/SuccessMessage";

export default function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-10 w-full max-w-md border border-gray-100">
                {step === 1 && (
                    <RequestReset
                        email={email}
                        setEmail={setEmail}
                        onNext={() => setStep(2)}
                    />
                )}
                {step === 2 && (
                    <OtpVerification
                        email={email}
                        onNext={() => setStep(3)}
                        onBack={() => setStep(1)}
                    />
                )}
                {step === 3 && (
                    <ChangePassword
                        email={email}
                        onNext={() => setStep(4)}
                        onCancel={() => setStep(1)}
                    />
                )}
                {step === 4 && (
                    <SuccessMessage />
                )}
            </div>
        </div>
    );
}