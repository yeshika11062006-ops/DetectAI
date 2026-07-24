import {
  UploadCloud,
  BrainCircuit,
  FileText,
  FolderSync,
} from "lucide-react";
import { motion } from "framer-motion";

const activities = [
  {
    title: "Evidence Uploaded",
    description: "Case #204 - CCTV Footage.pdf",
    time: "2 mins ago",
    icon: UploadCloud,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    title: "AI Timeline Generated",
    description: "Investigation timeline completed",
    time: "8 mins ago",
    icon: BrainCircuit,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    title: "AI Report Created",
    description: "Risk analysis report generated",
    time: "25 mins ago",
    icon: FileText,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    title: "Case Updated",
    description: "New witness statement added",
    time: "40 mins ago",
    icon: FolderSync,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
];

export default function ActivityFeed() {
  return (
    <div className="space-y-5">

      {activities.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-start gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition-all hover:border-cyan-500/30"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}
            >
              <Icon className={item.color} size={22} />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                {item.description}
              </p>
            </div>

            <span className="text-xs text-slate-500 whitespace-nowrap">
              {item.time}
            </span>
          </motion.div>
        );
      })}

    </div>
  );
}