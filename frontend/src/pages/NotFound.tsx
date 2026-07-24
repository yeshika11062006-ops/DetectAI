import { SearchX, ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-xl p-12 text-center shadow-2xl"
      >

        {/* Icon */}

        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 shadow-xl">

          <SearchX size={60} className="text-white" />

        </div>

        {/* 404 */}

        <h1 className="mt-8 text-8xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">

          404

        </h1>

        <h2 className="mt-3 text-3xl font-bold text-white">
          Investigation Not Found
        </h2>

        <p className="mt-5 text-lg text-slate-400 leading-8">
          The page you're looking for doesn't exist, has been moved,
          or the investigation record is unavailable.
        </p>

        {/* Buttons */}

        <div className="mt-10 flex flex-wrap justify-center gap-5">

          <Link
            to="/dashboard"
            className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 font-semibold text-white transition hover:scale-105"
          >
            <Home size={20} />
            Dashboard
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>

        </div>

        {/* Status */}

        <div className="mt-10 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

          <p className="text-cyan-300">
            DetectAI Navigation System is Online
          </p>

        </div>

      </motion.div>

    </div>
  );
}