import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setServerError("");
    try {
      const response = await api.post("/auth/login", data);
      login(response.data.user, response.data.accessToken);
      navigate("/dashboard");
    } catch (error) {
      setServerError(
        error?.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Brand */}
        <div className="mb-8 text-center">
          
          <h1 className="text-[20px] font-semibold text-[#0f0f0f] tracking-tight">
            Welcome back
          </h1>
          <p className="text-[13px] text-[#999] mt-1">Sign in to your account</p>
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
                Email
              </label>
              <input
                type="email"
                placeholder="you@company.com"
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
              {isSubmitting ? "Signing in…" : "Sign in"}
            </button>

          </form>
        </div>

        {/* Footer link */}
        <p className="text-center text-[13px] text-[#999] mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#0f0f0f] font-medium hover:underline underline-offset-2">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;