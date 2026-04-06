// -------------------------------------------------------------
// Page: Login
// Purpose: User authentication entry point.
// -------------------------------------------------------------

import AuthPageWrapper from "../components/auth/AuthPageWrapper";
import AuthInput from "../components/auth/AuthInput";
import AuthCard from "../components/auth/AuthCard";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <AuthPageWrapper>
      {/* Reusable App Header */}

      {/* Title + Subtitle */}
      <div className="mt-6 mb-4">
        <h1 className="text-3xl font-bold tracking-wide">Login</h1>
        <p className="text-gray-400 mt-1">
          Welcome back — let’s get you signed in.
        </p>
      </div>

      {/* ---------------- AUTH CARD ---------------- */}
      <AuthCard>
        <form className="flex flex-col gap-4">
          <AuthInput
            label="Email"
            type="email"
            placeholder="your.email@university.edu"
          />

          <AuthInput label="Password" type="password" placeholder="••••••••" />

          {/* Primary CTA */}
          <button type="submit" className="btn-base btn-cyan w-full mt-2">
            Login
          </button>

          {/* Forgot Password */}
          <button
            type="button"
            className="text-cyan-300 text-sm mt-2 hover:text-cyan-200 transition"
          >
            Forgot password?
          </button>
        </form>
      </AuthCard>

      {/* ---------------- SECONDARY CTA ---------------- */}
      <div className="text-center mt-8 mb-4">
        <p className="text-gray-400">New here?</p>
      </div>

      <Link to="/register" className="btn-base btn-purple w-full">
        Create Account
      </Link>
    </AuthPageWrapper>
  );
}
