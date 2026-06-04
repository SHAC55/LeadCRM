import { useForm } from "react-hook-form";

const LeadModal = ({ isOpen, onClose, onSubmit, defaultValues }) => {
  const { register, handleSubmit, reset } = useForm({ defaultValues });

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl border border-[#E2E2DE] w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0EE]">
          <div>
            <h2 className="text-[15px] font-semibold text-[#0f0f0f]">
              {defaultValues ? "Edit Lead" : "New Lead"}
            </h2>
            <p className="text-[12px] text-[#999] mt-0.5">
              {defaultValues
                ? "Update lead details"
                : "Fill in the details below"}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#999] hover:bg-[#F4F4F2] hover:text-[#444] text-lg leading-none transition-colors"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="px-6 py-5 space-y-3"
        >
          {/* Two-col row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium tracking-wide uppercase text-[#999]">
                Name
              </label>
              <input
                placeholder="Priya Rao"
                className="border border-[#E2E2DE] rounded-lg px-3 py-2 text-[13px] text-[#1a1a1a] placeholder-[#ccc] outline-none hover:border-[#bbb] focus:border-[#888] transition-colors bg-white"
                {...register("name")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium tracking-wide uppercase text-[#999]">
                Phone
              </label>
              <input
                placeholder="+91 98765 43210"
                className="border border-[#E2E2DE] rounded-lg px-3 py-2 text-[13px] text-[#1a1a1a] placeholder-[#ccc] outline-none hover:border-[#bbb] focus:border-[#888] transition-colors bg-white"
                {...register("phone")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium tracking-wide uppercase text-[#999]">
              Email
            </label>
            <input
              placeholder="priya@company.com"
              className="border border-[#E2E2DE] rounded-lg px-3 py-2 text-[13px] text-[#1a1a1a] placeholder-[#ccc] outline-none hover:border-[#bbb] focus:border-[#888] transition-colors bg-white"
              {...register("email")}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium tracking-wide uppercase text-[#999]">
              Company
            </label>
            <input
              placeholder="Tata Consultancy"
              className="border border-[#E2E2DE] rounded-lg px-3 py-2 text-[13px] text-[#1a1a1a] placeholder-[#ccc] outline-none hover:border-[#bbb] focus:border-[#888] transition-colors bg-white"
              {...register("company")}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium tracking-wide uppercase text-[#999]">
              Status
            </label>
            <select
              className="border border-[#E2E2DE] rounded-lg px-3 py-2 text-[13px] text-[#1a1a1a] outline-none hover:border-[#bbb] focus:border-[#888] transition-colors bg-white cursor-pointer"
              {...register("status")}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Converted">Converted</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium tracking-wide uppercase text-[#999]">
              Notes
            </label>
            <textarea
              placeholder="Any additional context…"
              rows={3}
              className="border border-[#E2E2DE] rounded-lg px-3 py-2 text-[13px] text-[#1a1a1a] placeholder-[#ccc] outline-none hover:border-[#bbb] focus:border-[#888] transition-colors bg-white resize-none"
              {...register("notes")}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="text-[12px] text-[#999] hover:text-[#555] transition-colors underline underline-offset-2"
            >
              Reset form
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-lg border border-[#E2E2DE] text-[13px] font-medium text-[#444] hover:bg-[#F4F4F2] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#0f0f0f] text-white text-[13px] font-medium hover:bg-[#2a2a2a] transition-colors"
              >
                {defaultValues ? "Update" : "Save Lead"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadModal;
