import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { register } from "../api/auth";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await register(name, email, password);

      alert("Registration successful!");

      // Redirect to Login page
      navigate("/");

    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">

      <form
        onSubmit={handleRegister}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl"
      >

        <div className="mb-8 flex justify-center">
          <ShieldCheck
            size={60}
            className="text-cyan-400"
          />
        </div>

        <h1 className="mb-2 text-center text-4xl font-black text-white">
          Create Account
        </h1>

        <p className="mb-8 text-center text-slate-400">
          Join DetectAI
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-5 w-full rounded-xl bg-slate-900 p-4 text-white outline-none"
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-5 w-full rounded-xl bg-slate-900 p-4 text-white outline-none"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-5 w-full rounded-xl bg-slate-900 p-4 text-white outline-none"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mb-6 w-full rounded-xl bg-slate-900 p-4 text-white outline-none"
          required
        />

        {error && (
          <div className="mb-5 rounded-xl border border-red-500 bg-red-500/20 p-3 text-red-300">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 py-4 text-lg font-bold text-white transition hover:scale-105 disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <div className="mt-8 text-center">
          <span className="text-slate-400">
            Already have an account?
          </span>

          <Link
            to="/"
            className="ml-2 font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Login
          </Link>
        </div>

      </form>

    </div>
  );
}