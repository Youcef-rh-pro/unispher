export default function UserRegistrationTabs({ tabs, activeTab, onChange, summary }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-slate-900/40 px-6 py-4">
      <div className="flex flex-wrap items-center gap-6">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`border-b-2 pb-2 text-sm font-medium transition ${
                isActive
                  ? "border-blue-400 text-blue-200"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <span className="text-xs text-slate-500">{summary}</span>
    </div>
  );
}
