import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const caseData = [
  {
    name: "Cases",
    value: 12,
  },
  {
    name: "Evidence",
    value: 48,
  },
  {
    name: "Reports",
    value: 18,
  },
  {
    name: "AI Analysis",
    value: 55,
  },
];

const pieData = [
  {
    name: "Open",
    value: 6,
  },
  {
    name: "Closed",
    value: 4,
  },
  {
    name: "Review",
    value: 2,
  },
];

const COLORS = [
  "#06b6d4",
  "#8b5cf6",
  "#10b981",
];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-slate-950 p-10 text-white">

      <h1 className="mb-10 text-5xl font-black">
        Dashboard Analytics
      </h1>

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl bg-slate-900 p-6">
          <h3 className="text-slate-400">
            Cases
          </h3>

          <p className="mt-3 text-4xl font-black text-cyan-400">
            12
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <h3 className="text-slate-400">
            Evidence
          </h3>

          <p className="mt-3 text-4xl font-black text-purple-400">
            48
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <h3 className="text-slate-400">
            Reports
          </h3>

          <p className="mt-3 text-4xl font-black text-green-400">
            18
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <h3 className="text-slate-400">
            AI Analysis
          </h3>

          <p className="mt-3 text-4xl font-black text-pink-400">
            55
          </p>
        </div>

      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">

        <div className="rounded-3xl bg-slate-900 p-8">

          <h2 className="mb-6 text-2xl font-bold">
            Investigation Statistics
          </h2>

          <ResponsiveContainer width="100%" height={350}>

            <BarChart data={caseData}>

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#06b6d4"
                radius={[10,10,0,0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        <div className="rounded-3xl bg-slate-900 p-8">

          <h2 className="mb-6 text-2xl font-bold">
            Case Status
          </h2>

          <ResponsiveContainer width="100%" height={350}>

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={120}
                label
              >

                {pieData.map((_, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}