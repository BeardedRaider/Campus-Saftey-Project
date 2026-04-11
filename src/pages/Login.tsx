// -------------------------------------------------------------
// Page: Login
// Purpose: User authentication entry point.
// -------------------------------------------------------------

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import AuthPageWrapper from "../components/auth/AuthPageWrapper";
import AuthInput from "../components/auth/AuthInput";
import AuthCard from "../components/auth/AuthCard";
import { Mail, Lock } from "lucide-react";
import { loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ← IMPORTANT FIX

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, general: "" });
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = { email: "", password: "", general: "" };
    let hasError = false;

    if (!form.email.includes("@")) {
      newErrors.email = "Enter a valid email.";
      hasError = true;
    }

    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    const result = loginUser(form.email, form.password);

    if (!result.success) {
      setErrors({
        email: " ",
        password: " ",
        general: result.message,
      });
      return;
    }

    login(result.user); // ← FIXED: use AuthProvider
    navigate("/app"); // ← Redirect now works
  };

  return (
    <AuthPageWrapper
      rightLink={{
        label: "New here?",
        to: "/register",
      }}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-wide">Login</h1>
        <p className="text-gray-400 mt-1">
          Welcome back — let’s get you signed in.
        </p>
      </div>

      <AuthCard>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {errors.general && (
            <p className="text-red-400 text-sm mb-1">{errors.general}</p>
          )}

          <AuthInput
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="your.email@university.edu"
            icon={<Mail size={18} />}
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <AuthInput
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            icon={<Lock size={18} />}
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          <button type="submit" className="btn-base btn-cyan w-full mt-2">
            Login
          </button>

          <button
            type="button"
            className="text-cyan-300 text-sm mt-2 hover:text-cyan-200 transition"
          >
            Forgot password?
          </button>
        </form>
      </AuthCard>
    </AuthPageWrapper>
  );
}
