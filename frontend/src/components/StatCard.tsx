import {
  Shield,
  FileText,
  Database,
  Bot,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  title: string;
  value: string;
  type: "cases" | "evidence" | "reports" | "ai";
}

const icons = {
  cases: Shield,
  evidence: Database,
  reports: FileText,
  ai: Bot,
};

const colors = {
  cases: "from-cyan-500 to-blue-600",
  evidence: "from-emerald-500 to-green-600",
  reports: "from-orange-500 to-amber-500",
  ai: "from-purple-500 to-pink-600",
};

const progress = {
  cases: "74%",
  evidence: "91%",
  reports: "56%",
  ai: "83%",
};

export default function StatCard({
  title,
  value,
  type,
}: Props) {
  const Icon = icons[type];

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl shadow-xl"
    >
      {/* Glow */}

      <div
        className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-r ${colors[type]} opacity-20 blur-3xl`}
      />

      {/* Top */}

      <div className="relative flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-400">

            {title}

          </p>

          <h2 className="mt-3 text-5xl font-black">

            {value}

          </h2>

        </div>

        <div
          className={`rounded-2xl bg-gradient-to-r ${colors[type]} p-4 shadow-lg`}
        >
          <Icon className="text-white" size={30} />
        </div>

      </div>

      {/* Bottom */}

      <div className="relative mt-8">

        <div className="mb-3 flex items-center justify-between">

          <div className="flex items-center gap-2 text-green-400">

            <TrendingUp size={16} />

            <span className="text-sm">

              +12.4%

            </span>

          </div>

          <span className="text-xs text-slate-500">

            Last 30 days

          </span>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-700">

          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: progress[type],
            }}
            transition={{
              duration: 1,
            }}
            className={`h-full rounded-full bg-gradient-to-r ${colors[type]}`}
          />

        </div>

      </div>

    </motion.div>
  );
}