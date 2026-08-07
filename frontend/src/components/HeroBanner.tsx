import {
  BrainCircuit,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  UploadCloud,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HeroBanner() {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-10 shadow-2xl"
    >
      {/* Background Glow */}

      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-purple-600/20 blur-[130px]" />

      {/* Content */}

      <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

        {/* LEFT */}

        <div className="max-w-3xl">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
            <Sparkles size={16} />
            AI Investigation Platform
          </div>

          <h1 className="text-5xl font-black leading-tight lg:text-6xl">
            Welcome Back,
            <br />

            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Investigator
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Upload evidence, generate AI-powered reports, build investigation
            timelines, detect inconsistencies and collaborate with your team —
            all from one intelligent workspace.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            {/* START INVESTIGATION */}
            <button
              type="button"
              onClick={() => navigate("/cases")}
              className="flex items-center gap-2 rounded-2xl bg-cyan-500 px-6 py-4 font-semibold text-slate-900 transition hover:scale-105"
            >
              <BrainCircuit size={20} />

              Start Investigation

              <ArrowRight size={18} />
            </button>

            {/* UPLOAD EVIDENCE */}
            <button
              type="button"
              onClick={() => navigate("/evidence")}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              <UploadCloud size={20} />

              Upload Evidence
            </button>

          </div>

        </div>

        {/* RIGHT */}

        <div className="grid grid-cols-2 gap-5">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm text-slate-400">
              Active Cases
            </p>

            <h2 className="mt-2 text-4xl font-bold text-cyan-300">
              24
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm text-slate-400">
              Evidence Files
            </p>

            <h2 className="mt-2 text-4xl font-bold text-blue-300">
              118
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm text-slate-400">
              AI Reports
            </p>

            <h2 className="mt-2 text-4xl font-bold text-purple-300">
              12
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

            <div className="flex items-center gap-2">
              <ShieldCheck
                className="text-green-400"
                size={18}
              />

              <span className="text-sm text-slate-300">
                AI Engine
              </span>
            </div>

            <h2 className="mt-3 text-xl font-bold text-green-400">
              Online
            </h2>

          </div>

        </div>

      </div>
    </motion.section>
  );
}