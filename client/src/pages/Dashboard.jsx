import { useEffect, useMemo, useState, useCallback } from "react";
import { useLead } from "../context/LeadContext";
import StatsCard from "../components/StatsCard";
import LeadTable from "../components/LeadTable";
import LeadModal from "../components/LeadModal";

const Dashboard = () => {
  const {
    leads, stats, fetchLeads, fetchStats,
    createLead, updateLead, deleteLead, updateLeadStatus,
  } = useLead();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    fetchLeads();
    fetchStats();
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredLeads = useMemo(() => {
    const q = debouncedSearch.toLowerCase();
    return leads.filter((lead) =>
      lead.name?.toLowerCase().includes(q) ||
      lead.email?.toLowerCase().includes(q) ||
      lead.company?.toLowerCase().includes(q)
    );
  }, [leads, debouncedSearch]);

  const handleAddLead = () => { setSelectedLead(null); setIsModalOpen(true); };
  const handleEditLead = (lead) => { setSelectedLead(lead); setIsModalOpen(true); };
  const handleSubmit = async (data) => {
    if (selectedLead) await updateLead(selectedLead._id, data);
    else await createLead(data);
    setSelectedLead(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] p-7 font-['DM_Sans',sans-serif]">

      {/* Header */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[#0f0f0f]">
            Leads
          </h1>
          <p className="text-[13px] text-[#999] mt-0.5">
            Track and manage your pipeline
          </p>
        </div>
        <button
          onClick={handleAddLead}
          className="flex items-center gap-1.5 bg-[#0f0f0f] text-white text-[13px] font-medium px-4 py-2 rounded-lg hover:bg-[#2a2a2a] transition-colors"
        >
          <span className="text-base leading-none">+</span> Add Lead
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatsCard label="Total"     value={stats.total}     hint="leads in pipeline" />
        <StatsCard label="New"       value={stats.new}       hint="this week" />
        <StatsCard label="Qualified" value={stats.qualified} hint="of total" />
        <StatsCard label="Converted" value={stats.converted} hint="this month" />
      </div>

      {/* Search */}
      <div className="flex items-center gap-2.5 bg-white border border-[#E2E2DE] rounded-xl px-4 py-2.5 mb-4">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Search by name, email or company…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 text-[13px] text-[#1a1a1a] placeholder-[#bbb] bg-transparent outline-none"
        />
        {/* Clear button — visible only while typing */}
        {search && (
          <button
            onClick={() => setSearch("")}
            className="text-[#bbb] hover:text-[#888] text-lg leading-none transition-colors"
          >
            ×
          </button>
        )}
      </div>

      {/* Table */}
      <LeadTable
        leads={filteredLeads}
        onDelete={deleteLead}
        onEdit={handleEditLead}
        updateLeadStatus={updateLeadStatus}
      />

      <LeadModal
        isOpen={isModalOpen}
        defaultValues={selectedLead}
        onClose={() => { setSelectedLead(null); setIsModalOpen(false); }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Dashboard;