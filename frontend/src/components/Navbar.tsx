import {
  Bell,
  Search,
  UserCircle2,
  CalendarDays,
  Cpu,
  MoonStar,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/60 backdrop-blur-2xl">

      <div className="flex h-24 items-center justify-between px-8">

        {/* LEFT */}

        <div>

          <h1 className="text-3xl font-bold tracking-tight">

            DetectAI Command Center

          </h1>

          <div className="mt-1 flex items-center gap-4">

            <p className="text-sm text-slate-400">

              AI-powered Investigation Intelligence

            </p>

            <span className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">

              <Cpu size={14} />

              AI Online

            </span>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-5">

          {/* SEARCH */}

          <div className="hidden lg:flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 transition-all duration-300 focus-within:border-cyan-500 focus-within:shadow-lg focus-within:shadow-cyan-500/20">

            <Search className="text-slate-400" size={18} />

            <input
              placeholder="Search investigations..."
              className="w-64 bg-transparent text-sm outline-none placeholder:text-slate-500"
            />

          </div>

          {/* DATE */}

          <div className="hidden xl:flex items-center gap-2 rounded-xl bg-slate-900/70 px-4 py-3 text-sm">

            <CalendarDays size={17} className="text-cyan-400" />

            <span className="text-slate-300">

              {today}

            </span>

          </div>

          {/* DARK MODE */}

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl bg-slate-900 p-3 transition hover:bg-slate-800"
          >

            <MoonStar size={20} />

          </motion.button>

          {/* NOTIFICATION */}

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative rounded-xl bg-slate-900 p-3 transition hover:bg-slate-800"
          >

            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

          </motion.button>

          {/* PROFILE */}

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-2"
          >

            <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 p-1">

              <UserCircle2 size={38} />

            </div>

            <div>

              <h3 className="font-semibold">

                Investigator

              </h3>

              <p className="text-xs text-green-400">

                ● Active Session

              </p>

            </div>

          </motion.div>

        </div>

      </div>

    </header>
  );
}