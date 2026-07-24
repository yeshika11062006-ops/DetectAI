import { motion } from "framer-motion";
import HeroBanner from "../components/HeroBanner";
import StatCard from "../components/StatCard";
import RecentCases from "../components/RecentCases";
import AIInsights from "../components/AIInsights";
import ActivityFeed from "../components/ActivityFeed";
import CaseChart from "../components/CaseChart";

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Hero */}
      <HeroBanner />

      {/* Stats */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Active Cases" value="24" type="cases" />
        <StatCard title="Evidence Files" value="118" type="evidence" />
        <StatCard title="Generated Reports" value="12" type="reports" />
        <StatCard title="AI Conversations" value="46" type="ai" />
      </section>

      {/* Analytics */}
      <section className="grid gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Investigation Analytics
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                AI investigation trends across all cases
              </p>
            </div>
          </div>

          <CaseChart />
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl shadow-2xl">
          <h2 className="mb-2 text-2xl font-bold">
            Live AI Activity
          </h2>

          <p className="mb-6 text-sm text-slate-400">
            Real-time AI processing
          </p>

          <ActivityFeed />
        </div>
      </section>

      {/* Bottom */}
      <section className="grid gap-8 xl:grid-cols-2">

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl shadow-2xl">

          <h2 className="mb-2 text-2xl font-bold">
            Recent Investigations
          </h2>

          <p className="mb-6 text-sm text-slate-400">
            Latest uploaded cases
          </p>

          <RecentCases />

        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl shadow-2xl">

          <h2 className="mb-2 text-2xl font-bold">
            AI Intelligence Report
          </h2>

          <p className="mb-6 text-sm text-slate-400">
            Latest AI generated insights
          </p>

          <AIInsights />

        </div>

      </section>

    </motion.div>
  );
}