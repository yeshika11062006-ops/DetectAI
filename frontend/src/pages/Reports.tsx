import {
  FileText,
  Download,
  Eye,
  Calendar,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const reports = [
  {
    title: "Investigation Summary",
    status: "Completed",
    confidence: "96%",
    date: "Today",
  },
  {
    title: "Evidence Analysis",
    status: "Completed",
    confidence: "94%",
    date: "Yesterday",
  },
  {
    title: "Timeline Report",
    status: "Ready",
    confidence: "98%",
    date: "Today",
  },
  {
    title: "Entity Extraction",
    status: "Completed",
    confidence: "95%",
    date: "2 Days Ago",
  },
];

export default function Reports() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold text-white">
            AI Generated Reports
          </h1>

          <p className="text-slate-400 mt-2">
            Investigation summaries generated automatically
          </p>

        </div>

        <button className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 font-semibold text-white hover:scale-105 transition">

          Generate Report

        </button>

      </div>

      {/* Cards */}

      <div className="grid lg:grid-cols-2 gap-6">

        {reports.map((report, index) => (

          <motion.div
            key={index}
            whileHover={{
              y: -6,
            }}
            className="rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-white/10 p-6"
          >

            <div className="flex justify-between">

              <div className="flex gap-4">

                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">

                  <FileText
                    className="text-cyan-400"
                  />

                </div>

                <div>

                  <h2 className="text-xl font-bold text-white">

                    {report.title}

                  </h2>

                  <div className="flex gap-3 mt-2">

                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">

                      {report.status}

                    </span>

                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs">

                      {report.confidence}

                    </span>

                  </div>

                </div>

              </div>

              <ShieldCheck className="text-green-400" />

            </div>

            <div className="mt-6 flex justify-between text-slate-400 text-sm">

              <div className="flex gap-2 items-center">

                <Calendar size={15} />

                {report.date}

              </div>

              <div className="flex gap-2 items-center">

                <Sparkles size={15} />

                AI Generated

              </div>

            </div>

            <div className="mt-8 flex gap-3">

              <button className="flex-1 rounded-xl bg-cyan-500 py-3 font-semibold text-slate-900 hover:scale-105 transition flex items-center justify-center gap-2">

                <Eye size={18} />

                View

              </button>

              <button className="flex-1 rounded-xl border border-white/10 py-3 text-white hover:bg-white/10 transition flex items-center justify-center gap-2">

                <Download size={18} />

                PDF

              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  );
}