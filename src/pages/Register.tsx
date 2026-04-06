// -------------------------------------------------------------
// Page: Register
// Purpose: Create a new user account.
//
// Notes:
// - Matches Login page structure + hierarchy
// - Uses AuthHeader + Go Back link
// - Uses compact AuthCard with correct background
// - Uses reusable AuthInput
// -------------------------------------------------------------

import AuthPageWrapper from "../components/auth/AuthPageWrapper";
import AuthInput from "../components/auth/AuthInput";
import AuthCard from "../components/auth/AuthCard";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <AuthPageWrapper>
      {/* Top quick-login link */}
      <div className="mt-6 mb-4 text-right">
        <Link
          to="/login"
          className="text-cyan-300 text-sm hover:text-cyan-200 transition"
        >
          Already have an account?
        </Link>
      </div>

      {/* Title + Subtitle */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-wide">Create Account</h1>
        <p className="text-gray-400 mt-1">
          Join thousands of students staying safe together.
        </p>
      </div>

      {/* ---------------- AUTH CARD ---------------- */}
      <AuthCard>
        <form className="flex flex-col gap-4">
          <AuthInput label="Full Name" placeholder="John Smith" />

          <AuthInput
            label="Email"
            type="email"
            placeholder="your.email@university.edu"
          />

          <AuthInput label="Password" type="password" placeholder="••••••••" />

          <AuthInput
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
          />

          {/* Register Button */}
          <button type="submit" className="btn-base btn-cyan w-full mt-2">
            Create Account
          </button>
        </form>
      </AuthCard>
    </AuthPageWrapper>
  );
}
