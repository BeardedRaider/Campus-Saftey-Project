// -------------------------------------------------------------
// Page: Register
// Purpose: Create a new user account.
// -------------------------------------------------------------

import { useState } from "react";
import AuthPageWrapper from "../components/auth/AuthPageWrapper";
import AuthInput from "../components/auth/AuthInput";
import AuthCard from "../components/auth/AuthCard";
import { Link } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();

  const newErrors = { name: "", email: "", password: "", confirm: "" };
  let hasError = false;

  if (!form.name.trim()) {
    newErrors.name = "Name is required.";
    hasError = true;
  }

  if (!form.email.includes("@")) {
    newErrors.email = "Enter a valid email.";
    hasError = true;
  }

  if (form.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters.";
    hasError = true;
  }

  if (form.password !== form.confirm) {
    newErrors.confirm = "Passwords do not match.";
    hasError = true;
  }

  setErrors(newErrors);

  if (!hasError) {
    console.log("Form submitted!", form);
  }
};

  return (
    <AuthPageWrapper>
      <div className="mt-6 mb-4 text-right">
        <Link
          to="/login"
          className="text-cyan-300 text-sm hover:text-cyan-200 transition"
        >
          Already have an account?
        </Link>
      </div>

      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-wide">Create Account</h1>
        <p className="text-gray-400 mt-1">
          Join thousands of students staying safe together.
        </p>
      </div>

      <AuthCard>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <AuthInput
            label="Full Name"
            name="name"
            placeholder="John Smith"
            icon={<User size={18} />}
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />

          <AuthInput
            label="Email"
            name="email"
            type="email"
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
            placeholder="••••••••"
            icon={<Lock size={18} />}
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          <AuthInput
            label="Confirm Password"
            name="confirm"
            type="password"
            placeholder="••••••••"
            icon={<Lock size={18} />}
            value={form.confirm}
            onChange={handleChange}
            error={errors.confirm}
          />

          <button type="submit" className="btn-base btn-cyan w-full mt-2">
            Create Account
          </button>
        </form>
      </AuthCard>
    </AuthPageWrapper>
  );
}