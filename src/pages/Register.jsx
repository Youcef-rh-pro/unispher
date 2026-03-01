import { useState } from "react";
import ProgressBar from "../components/register/ProgressBar";
import Step1 from "../components/register/Step1";
import Step2 from "../components/register/Step2";
import Step3 from "../components/register/Step3";

export default function Register() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        role: "Student",
        fullName: "",
        email: "",
        password: "",
        institution: "",
        faculty: "",
        level: "",
        field: "",
        idNumber: "",
        idPhoto: null,
    });

    const updateFormData = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        try {
            // await fetch('/api/register', { method: 'POST', body: data });
            console.log("Form ready for backend:", formData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="w-full max-w-2xl">
                <ProgressBar step={step} role={formData.role} />

                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10 mt-6">
                    {step === 1 && (
                        <Step1
                            formData={formData}
                            updateFormData={updateFormData}
                            nextStep={nextStep}
                        />
                    )}
                    {step === 2 && (
                        <Step2
                            formData={formData}
                            updateFormData={updateFormData}
                            nextStep={nextStep}
                            prevStep={prevStep}
                        />
                    )}
                    {step === 3 && (
                        <Step3
                            formData={formData}
                            updateFormData={updateFormData}
                            prevStep={prevStep}
                            handleSubmit={handleSubmit}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}