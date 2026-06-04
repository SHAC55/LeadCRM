const StatsCard = ({ label, value, hint }) => (
  <div className="bg-white border border-[#E2E2DE] rounded-xl px-5 py-4">
    <p className="text-[11px] font-medium tracking-widest uppercase text-[#999] mb-2">
      {label}
    </p>
    <p className="text-[26px] font-semibold text-[#0f0f0f] tracking-tight font-mono leading-none">
      {value ?? "—"}
    </p>
    {hint && (
      <p className="text-[11px] text-[#aaa] mt-1.5">{hint}</p>
    )}
  </div>
);

export default StatsCard;