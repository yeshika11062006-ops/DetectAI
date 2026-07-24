import {
  BrainCircuit,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

const insights = [
  {
    title: "Evidence Consistency",
    description:
      "Cross-document verification completed successfully.",
    status: "Verified",
    icon: ShieldCheck,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    title: "Missing Evidence",
    description:
      "Two supporting documents are still pending upload.",
    status: "Attention",
    icon: AlertTriangle,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    title: "AI Recommendation",
    description:
      "Interview witness B before generating the final report.",
    status: "Suggested",
    icon: Sparkles,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
];

export default function AIInsights() {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 p-3">

            <BrainCircuit className="text-white" size={24} />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">

              AI Intelligence

            </h2>

            <p className="text-sm text-slate-400">

              Live investigation insights

            </p>

          </div>

        </div>

        <div className="rounded-xl bg-cyan-500/10 px-3 py-2 text-cyan-300 text-sm">

          Confidence 96%

        </div>

      </div>

      {/* Summary */}

      <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-5">

        <p className="text-sm text-slate-300">

          AI Summary

        </p>

        <h3 className="mt-3 text-lg font-semibold text-white">

          Investigation progress is stable with high confidence.
          Minor evidence gaps remain before final report generation.

        </h3>

      </div>

      {/* Cards */}

      <div className="space-y-4">

        {insights.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition hover:border-cyan-500/30"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}
              >
                <Icon className={item.color} size={22} />
              </div>

              <div className="flex-1">

                <div className="flex items-center justify-between">

                  <h3 className="font-semibold text-white">

                    {item.title}

                  </h3>

                  <span className={`text-sm ${item.color}`}>

                    {item.status}

                  </span>

                </div>

                <p className="mt-2 text-sm text-slate-400">

                  {item.description}

                </p>

              </div>

            </motion.div>
          );
        })}

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-4">

        <div>

          <p className="text-sm text-slate-400">

            AI Processing Accuracy

          </p>

          <h3 className="mt-1 text-3xl font-bold text-cyan-300">

            96%

          </h3>

        </div>

        <button className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-900 transition hover:scale-105">

          View Full Report

          <ArrowUpRight size={18} />

        </button>

      </div>

    </div>
  );
}