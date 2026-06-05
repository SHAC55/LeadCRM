const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const AVATAR_STYLES = {
  New: "bg-[#EEF4FF] text-[#3B6FCC]",
  Contacted: "bg-[#FEF9EE] text-[#A16207]",
  Qualified: "bg-[#EEFAF2] text-[#2E7D52]",
  Lost: "bg-[#FEF2F2] text-[#C0392B]",
};

const LeadTable = ({ leads, onEdit, onDelete, updateLeadStatus }) => {
  return (
    <div className="bg-white border border-[#E2E2DE] rounded-xl overflow-hidden">
      <table
        className="w-full border-collapse"
        style={{ tableLayout: "fixed" }}
      >
        <colgroup>
          <col style={{ width: "22%" }} />
          <col style={{ width: "26%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "18%" }} />
          <col style={{ width: "14%" }} />
        </colgroup>

        <thead>
          <tr className="bg-[#FAFAF8] border-b border-[#EEEEED]">
            {["Name", "Email", "Company", "Status", "Actions"].map((h) => (
              <th
                key={h}
                className="px-4 py-2.5 text-left text-[11px] font-medium tracking-[0.55px] uppercase text-[#999]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {!leads?.length && (
            <tr>
              <td
                colSpan={5}
                className="py-14 text-center text-[13px] text-[#bbb]"
              >
                No leads found
              </td>
            </tr>
          )}

          {leads?.map((lead) => (
            <tr
              key={lead._id}
              className="border-b border-[#F4F4F2] last:border-0 hover:bg-[#FAFAF8] transition-colors duration-100"
            >
              {/* Name */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0 ${
                      AVATAR_STYLES[lead.status] ?? "bg-[#F0F0EE] text-[#666]"
                    }`}
                  >
                    {getInitials(lead.name)}
                  </div>
                  <span className="text-[13px] font-medium text-[#0f0f0f] truncate">
                    {lead.name}
                  </span>
                </div>
              </td>

              {/* Email */}
              <td className="px-4 py-3 text-[12.5px] text-[#999] truncate">
                {lead.email}
              </td>

              {/* Company */}
              <td className="px-4 py-3 text-[13px] text-[#555] truncate">
                {lead.company}
              </td>

              {/* Status */}
              <td className="px-4 py-3">
                <select
                  value={lead.status}
                  onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                  className="w-full border border-[#E2E2DE] rounded-lg px-2.5 py-1.5 text-[12px] text-[#1a1a1a] bg-white outline-none cursor-pointer hover:border-[#bbb] transition-colors"
                >
                  {["New", "Contacted", "Qualified", "Lost"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>

              {/* Actions */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onEdit(lead)}
                    className="px-3 py-1.5 rounded-lg border border-[#E2E2DE] text-[12px] font-medium text-[#444] hover:bg-[#F4F4F2] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(lead._id)}
                    className="px-3 py-1.5 rounded-lg border border-[#FCCACA] text-[12px] font-medium text-[#C0392B] hover:bg-[#FEF2F2] transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
