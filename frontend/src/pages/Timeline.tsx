import {
  UploadCloud,
  Brain,
  Users,
  FileText,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const timeline = [
  {
    time: "09:15",
    title: "Evidence Uploaded",
    icon: UploadCloud,
    color: "text-cyan-400",
  },
  {
    time: "09:17",
    title: "OCR Extraction Complete",
    icon: Brain,
    color: "text-purple-400",
  },
  {
    time: "09:19",
    title: "Entities Identified",
    icon: Users,
    color: "text-yellow-400",
  },
  {
    time: "09:22",
    title: "Timeline Generated",
    icon: FileText,
    color: "text-blue-400",
  },
  {
    time: "09:24",
    title: "Final Report Ready",
    icon: CheckCircle,
    color: "text-green-400",
  },
];

export default function Timeline() {
  return (
    <div>

      <h1 className="text-4xl font-bold text-white mb-2">

        AI Investigation Timeline

      </h1>

      <p className="text-slate-400 mb-10">

        Automatic investigation workflow

      </p>

      <div className="relative">

        <div className="absolute left-8 top-0 bottom-0 w-1 bg-cyan-500/30 rounded-full" />

        <div className="space-y-8">

          {timeline.map((step, index) => {

            const Icon = step.icon;

            return (

              <motion.div
                key={index}
                whileHover={{
                  x: 8,
                }}
                className="flex gap-6 items-start"
              >

                <div className="relative z-10 w-16 h-16 rounded-full bg-slate-900 border border-cyan-500 flex items-center justify-center">

                  <Icon
                    size={24}
                    className={step.color}
                  />

                </div>

                <div className="flex-1 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-white/10 p-6">

                  <div className="flex justify-between">

                    <h2 className="text-xl font-bold text-white">

                      {step.title}

                    </h2>

                    <span className="text-cyan-400">

                      {step.time}

                    </span>

                  </div>

                  <p className="text-slate-400 mt-3">

                    DetectAI completed this investigation stage successfully.

                  </p>

                </div>

              </motion.div>

            );

          })}

        </div>

      </div>

    </div>
  );
}