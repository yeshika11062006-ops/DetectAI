import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";

import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Brain,
  FileSearch,
  Clock3,
  FileText,
  ArrowRight,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("Sending login request...");

      const data = await login(email, password);

      console.log("Login Success:", data);

      localStorage.setItem("token", data.access_token);

      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);

      if (err.response) {
        setError(err.response.data.detail);
      } else {
        setError(err.message || "Network Error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#2563eb33,transparent_35%),radial-gradient(circle_at_bottom_right,#9333ea33,transparent_35%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:45px_45px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-8 py-16">

        <div className="grid w-full max-w-7xl gap-16 lg:grid-cols-2 items-center">

          {/* LEFT */}

          <div>

            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 shadow-2xl">

                <Shield size={42} />

              </div>

              <div>

                <h1 className="text-6xl font-black tracking-tight">

                  <span className="bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent">

                    DetectAI

                  </span>

                </h1>

                <p className="mt-2 text-gray-400">

                  AI Powered Investigation Platform

                </p>

              </div>

            </div>

            <div className="mt-16">

              <h2 className="text-6xl font-black leading-tight">

                Transform

                <br />

                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">

                  Evidence

                </span>

                <br />

                Into Intelligence

              </h2>

              <p className="mt-8 max-w-xl text-xl leading-9 text-slate-300">

                Analyze evidence, build investigation timelines,
                detect entities and generate professional reports
                with Artificial Intelligence.

              </p>

            </div>

            <div className="mt-14 grid grid-cols-2 gap-6">

              <FeatureCard
                icon={<FileSearch size={30} />}
                title="Evidence AI"
                color="cyan"
              />

              <FeatureCard
                icon={<Brain size={30} />}
                title="Smart Analysis"
                color="purple"
              />

              <FeatureCard
                icon={<Clock3 size={30} />}
                title="Timeline Builder"
                color="emerald"
              />

              <FeatureCard
                icon={<FileText size={30} />}
                title="AI Reports"
                color="orange"
              />

            </div>

          </div>

          {/* RIGHT LOGIN CARD */}
          <div className="rounded-[40px] border border-white/10 bg-white/10 p-10 backdrop-blur-2xl shadow-2xl">

  <h2 className="text-4xl font-black">
    Investigator Login
  </h2>

  <p className="mt-3 text-gray-400">
    Secure access to your AI workspace
  </p>

  <div className="mt-10 space-y-6">

    <Input
      icon={<Mail />}
      placeholder="Email Address"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <div className="flex items-center rounded-2xl bg-white px-5">

      <Lock className="text-purple-600" />

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full bg-transparent p-5 text-black outline-none"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff /> : <Eye />}
      </button>

    </div>

    {error && (
      <div className="rounded-xl border border-red-500 bg-red-500/20 p-3 text-red-300">
        {error}
      </div>
    )}

    <div className="flex justify-between text-sm text-slate-300">

      <label>
        <input
          type="checkbox"
          className="mr-2"
        />
        Remember me
      </label>

      <button
        type="button"
        className="text-cyan-300"
      >
        Forgot Password?
      </button>

    </div>

    <button
      onClick={handleLogin}
      disabled={loading}
      className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 py-5 text-xl font-bold transition hover:scale-105 disabled:opacity-50"
    >

      {loading ? "Signing In..." : "Enter DetectAI"}

      <ArrowRight className="transition group-hover:translate-x-1" />

    </button>

  </div>

  <div className="mt-10 grid grid-cols-3 gap-5">

    <Stat
      number="24+"
      label="Cases"
    />

    <Stat
      number="118"
      label="Evidence"
    />

    <Stat
      number="96%"
      label="Accuracy"
    />

  </div>

  <div className="mt-8 text-center">

    Don't have an account?

    <Link
      to="/register"
      className="ml-2 font-semibold text-cyan-400 hover:text-cyan-300"
    >
      Create Account
    </Link>

  </div>

</div>

</div>

</div>

</div>
);
}

function Input({
  icon,
  placeholder,
  type,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  placeholder: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex items-center rounded-2xl bg-white px-5">
      <div className="text-purple-600">{icon}</div>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent p-5 text-black outline-none"
      />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  color: "cyan" | "purple" | "emerald" | "orange";
}) {
  const colors = {
    cyan:
      "from-cyan-500/20 to-cyan-400/5 border-cyan-400/30 text-cyan-300",

    purple:
      "from-purple-500/20 to-purple-400/5 border-purple-400/30 text-purple-300",

    emerald:
      "from-emerald-500/20 to-emerald-400/5 border-emerald-400/30 text-emerald-300",

    orange:
      "from-orange-500/20 to-orange-400/5 border-orange-400/30 text-orange-300",
  };

  return (
    <div
      className={`rounded-3xl border bg-gradient-to-br p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${colors[color]}`}
    >
      {icon}

      <h3 className="mt-5 text-xl font-bold">
        {title}
      </h3>
    </div>
  );
}

function Stat({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
      <h3 className="text-3xl font-black text-cyan-400">
        {number}
      </h3>

      <p className="mt-2 text-sm text-slate-400">
        {label}
      </p>
    </div>
  );
}