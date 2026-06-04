import { createContext, useContext, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({});

  const fetchLeads = async () => {
    try {
      const { data } = await api.get("/leads");
      setLeads(data.leads);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await api.get("/leads/stats");
      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  const createLead = async (leadData) => {
    try {
      await api.post("/leads", leadData);

      await fetchLeads();
      await fetchStats();
    } catch (error) {
      console.log(error);
    }
  };

  const updateLead = async (id, leadData) => {
    try {
      const res = await api.put(`/leads/${id}`, leadData);

      setLeads((prev) =>
        prev.map((lead) => (lead._id === id ? res.data.lead : lead)),
      );

      toast.success("Lead updated successfully");
    } catch (error) {
      toast.error("Failed to update lead");
      console.log(error);
    }
  };

  const deleteLead = async (id) => {
    try {
      await api.delete(`/leads/${id}`);

      await fetchLeads();
      await fetchStats();
    } catch (error) {
      console.log(error);
    }
  };

  const updateLeadStatus = async (id, status) => {
    try {
      const res = await api.patch(`/leads/${id}/status`, { status });

      setLeads((prev) =>
        prev.map((lead) => (lead._id === id ? res.data.lead : lead)),
      );

      toast.success(`Status changed to ${status}`);
    } catch (error) {
      toast.error("Failed to update status");
      console.log(error);
    }
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        stats,
        fetchLeads,
        fetchStats,
        createLead,
        updateLead,
        deleteLead,
        updateLeadStatus,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export const useLead = () => useContext(LeadContext);
