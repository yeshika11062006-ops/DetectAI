import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderSearch,
  UploadCloud,
  Brain,
  MessageSquare,
  FileText,
  Settings,
  HardDrive,
  Activity,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";

const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Cases",
    icon: FolderSearch,
    path: "/cases",
  },
  {
    name: "Evidence Upload",
    icon: UploadCloud,
    path: "/evidence",
  },
  {
    name: "AI Analysis",
    icon: Brain,
    path: "/timeline",
  },
  {
    name: "AI Chat",
    icon: MessageSquare,
    path: "/chat",
  },
  {
    name: "Reports",
    icon: FileText,
    path: "/reports",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-hidden border-r border-white/10 bg-slate-950/80 backdrop-blur-2xl">
      {/* Logo */}

      <div className="border-b border-white/10 p-7">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-xl shadow-cyan-500/30">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>

          <div>
            <h1 className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-3xl font-extrabold text-transparent">
              DetectAI
            </h1>

            <p className="text-xs tracking-wide text-slate-400">
              Investigation Intelligence
            </p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 overflow-y-auto px-5 py-6">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                  isActive
                    ? "border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white shadow-lg shadow-cyan-500/10"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon className="h-5 w-5 transition group-hover:scale-110" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Storage */}

      <div className="mx-5 mb-4 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-cyan-400" />
            <span className="text-sm font-semibold">Storage</span>
          </div>

          <span className="text-cyan-400">82%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-700">
          <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
        </div>
      </div>

      {/* AI Status */}

      <div className="border-t border-white/10 p-6">
        <div className="mb-2 flex items-center gap-2">
          <Activity className="h-4 w-4 text-green-400" />
          <span className="text-sm font-medium text-white">
            AI Engine Online
          </span>
        </div>

        <p className="text-xs text-slate-400">
          Groq LLM Connected
        </p>
      </div>
    </aside>
  );
}