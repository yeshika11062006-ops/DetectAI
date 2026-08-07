import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function MainLayout() {
  return (
    <div className="relative flex min-h-screen bg-slate-950 text-white">

      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-[150px]" />

        <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[170px]" />

        <div className="absolute bottom-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[180px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_60%)]" />
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-72 flex min-h-screen flex-1 flex-col">

        <Navbar />

        <motion.main
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 overflow-y-auto p-8"
        >
          <Outlet />
        </motion.main>

      </div>
    </div>
  );
}