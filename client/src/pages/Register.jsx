import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formData) => {
    setServerError("");
    try {
      await api.post("/auth/register", formData);
      navigate("/dashboard");
    } catch (error) {
      setServerError(
        error?.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Brand */}
        <div className="mb-8 text-center">
          
          <h1 className="text-[20px] font-semibold text-[#0f0f0f] tracking-tight">
            Create account
          </h1>
          <p className="text-[13px] text-[#999] mt-1">Get started for free</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#E2E2DE] rounded-xl px-6 py-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {serverError && (
              <div className="bg-[#FEF2F2] border border-[#FCCACA] text-[#C0392B] text-[12.5px] px-3 py-2.5 rounded-lg">
                {serverError}
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium tracking-wide uppercase text-[#999]">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Priya Rao"
                autoComplete="name"
                className={`border rounded-lg px-3 py-2.5 text-[13px] text-[#1a1a1a] placeholder-[#ccc] outline-none transition-colors bg-white ${
                  errors.name
                    ? "border-[#FCCACA] focus:border-[#C0392B]"
                    : "border-[#E2E2DE] hover:border-[#bbb] focus:border-[#888]"
                }`}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-[11.5px] text-[#C0392B]">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium tracking-wide uppercase text-[#999]">
                Email
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                className={`border rounded-lg px-3 py-2.5 text-[13px] text-[#1a1a1a] placeholder-[#ccc] outline-none transition-colors bg-white ${
                  errors.email
                    ? "border-[#FCCACA] focus:border-[#C0392B]"
                    : "border-[#E2E2DE] hover:border-[#bbb] focus:border-[#888]"
                }`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-[11.5px] text-[#C0392B]">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium tracking-wide uppercase text-[#999]">
                Password
              </label>
              <input
                type="password"
                placeholder="Min. 6 characters"
                autoComplete="new-password"
                className={`border rounded-lg px-3 py-2.5 text-[13px] text-[#1a1a1a] placeholder-[#ccc] outline-none transition-colors bg-white ${
                  errors.password
                    ? "border-[#FCCACA] focus:border-[#C0392B]"
                    : "border-[#E2E2DE] hover:border-[#bbb] focus:border-[#888]"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters required" },
                })}
              />
              {errors.password && (
                <p className="text-[11.5px] text-[#C0392B]">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0f0f0f] text-white text-[13px] font-medium py-2.5 rounded-lg hover:bg-[#2a2a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-1"
            >
              {isSubmitting ? "Creating account…" : "Create account"}
            </button>

          </form>
        </div>

        {/* Footer link */}
        <p className="text-center text-[13px] text-[#999] mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-[#0f0f0f] font-medium hover:underline underline-offset-2">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;