export default function ProgressBar({ step, role }) {
    const percentage = step === 1 ? 33 : step === 2 ? 66 : 100;

    let title = "Account Setup";
    if (step === 2) {
        title = role === "Student" ? "Academic profile setup" : "Professional profile setup";
    } else if (step === 3) {
        title = "Verify Identity";
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Step {step} of 3</h2>
                <span className="text-lg font-bold text-gray-900">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <p className="text-gray-500 text-sm">{title}</p>
        </div>
    );
}