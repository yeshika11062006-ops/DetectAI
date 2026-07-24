import { Eye, Clock3, User, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

const cases = [
  {
    id: "CASE-001",
    title: "Financial Fraud Investigation",
    officer: "John Carter",
    status: "Active",
    priority: "High",
    date: "Today",
  },
  {
    id: "CASE-002",
    title: "Digital Evidence Review",
    officer: "Sarah Wilson",
    status: "Review",
    priority: "Medium",
    date: "Yesterday",
  },
  {
    id: "CASE-003",
    title: "Document Verification",
    officer: "DetectAI",
    status: "Completed",
    priority: "Low",
    date: "2 Days Ago",
  },
];

function statusColor(status: string) {
  switch (status) {
    case "Active":
      return "bg-green-500/20 text-green-400";
    case "Review":
      return "bg-yellow-500/20 text-yellow-400";
    default:
      return "bg-cyan-500/20 text-cyan-300";
  }
}

function priorityColor(priority: string) {
  switch (priority) {
    case "High":
      return "bg-red-500/20 text-red-400";
    case "Medium":
      return "bg-orange-500/20 text-orange-400";
    default:
      return "bg-blue-500/20 text-blue-300";
  }
}

export default function RecentCases() {
  return (
    <div className="space-y-5">

      {cases.map((item, index) => (

        <motion.div
          key={item.id}
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: index * 0.15,
          }}
          whileHover={{
            y: -4,
          }}
          className="rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-xl p-6 transition-all hover:border-cyan-500/30"
        >

          <div className="flex items-start justify-between">

            <div>

              <div className="flex items-center gap-3">

                <h3 className="text-xl font-bold text-white">

                  {item.title}

                </h3>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>

              </div>

              <p className="mt-2 text-sm text-cyan-300">

                {item.id}

              </p>

            </div>

            <button className="rounded-xl bg-cyan-500 p-3 text-slate-900 transition hover:scale-105">

              <Eye size={18} />

            </button>

          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">

            <div className="rounded-2xl bg-black/30 p-4">

              <div className="mb-2 flex items-center gap-2 text-slate-400">

                <User size={16} />

                <span className="text-xs">

                  Investigator

                </span>

              </div>

              <p className="font-semibold text-white">

                {item.officer}

              </p>

            </div>

            <div className="rounded-2xl bg-black/30 p-4">

              <div className="mb-2 flex items-center gap-2 text-slate-400">

                <ShieldAlert size={16} />

                <span className="text-xs">

                  Priority

                </span>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityColor(
                  item.priority
                )}`}
              >
                {item.priority}
              </span>

            </div>

            <div className="rounded-2xl bg-black/30 p-4">

              <div className="mb-2 flex items-center gap-2 text-slate-400">

                <Clock3 size={16} />

                <span className="text-xs">

                  Updated

                </span>

              </div>

              <p className="font-semibold text-white">

                {item.date}

              </p>

            </div>

          </div>

        </motion.div>

      ))}

    </div>
  );
}