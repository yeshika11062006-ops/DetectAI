import {
  UploadCloud,
  Brain,
  Users,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type TimelineItem = {
  date: string;
  event: string;
};

const icons = [
  UploadCloud,
  Brain,
  Users,
  FileText,
  CheckCircle,
];

const colors = [
  "text-cyan-400",
  "text-purple-400",
  "text-yellow-400",
  "text-blue-400",
  "text-green-400",
];

export default function Timeline() {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);

  useEffect(() => {
    const savedAnalysis =
      localStorage.getItem("detectai_analysis");

    if (!savedAnalysis) {
      return;
    }

    try {
      const analysis = JSON.parse(savedAnalysis);

      if (
        Array.isArray(analysis.timeline)
      ) {
        setTimeline(analysis.timeline);
      }
    } catch (error) {
      console.error(
        "Failed to load investigation timeline:",
        error
      );
    }
  }, []);

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div className="mb-10">

        <div className="flex items-center gap-3">

          <h1 className="text-4xl font-bold text-white">
            AI Investigation Timeline
          </h1>

          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
            AI Generated
          </span>

        </div>

        <p className="mt-2 text-slate-400">
          Chronological events extracted from the investigation evidence
        </p>

      </div>

      {/* NO TIMELINE */}

      {timeline.length === 0 && (

        <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-8">

          <div className="flex items-start gap-4">

            <AlertCircle
              className="mt-1 shrink-0 text-yellow-400"
              size={24}
            />

            <div>

              <h2 className="text-xl font-bold text-white">
                No AI timeline available
              </h2>

              <p className="mt-2 text-slate-400">
                Upload and analyze investigation evidence first.
                Once AI analysis is complete, the extracted
                timeline will appear here automatically.
              </p>

            </div>

          </div>

        </div>

      )}

      {/* REAL AI TIMELINE */}

      {timeline.length > 0 && (

        <div className="relative">

          {/* VERTICAL LINE */}

          <div className="absolute bottom-0 left-8 top-0 w-1 rounded-full bg-cyan-500/20" />

          <div className="space-y-8">

            {timeline.map(
              (item, index) => {

                const Icon =
                  icons[
                    Math.min(
                      index,
                      icons.length - 1
                    )
                  ];

                const color =
                  colors[
                    Math.min(
                      index,
                      colors.length - 1
                    )
                  ];

                return (

                  <motion.div
                    key={`${item.date}-${index}`}
                    initial={{
                      opacity: 0,
                      x: -15,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                    }}
                    whileHover={{
                      x: 8,
                    }}
                    className="relative flex items-start gap-6"
                  >

                    {/* ICON */}

                    <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-cyan-500/40 bg-slate-900 shadow-lg shadow-cyan-500/5">

                      <Icon
                        size={24}
                        className={color}
                      />

                    </div>

                    {/* CONTENT */}

                    <div className="flex-1 rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <h2 className="text-xl font-bold text-white">
                            {item.event}
                          </h2>

                          <p className="mt-3 text-slate-400">
                            Event identified from the uploaded investigation evidence.
                          </p>

                        </div>

                        <span className="flex shrink-0 items-center gap-2 rounded-lg bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-400">

                          <Clock size={14} />

                          {item.date}

                        </span>

                      </div>

                      {/* STATUS */}

                      <div className="mt-5 flex items-center gap-2 text-xs text-green-400">

                        <CheckCircle size={14} />

                        AI Identified

                      </div>

                    </div>

                  </motion.div>

                );
              }
            )}

          </div>

        </div>

      )}

    </div>
  );
}