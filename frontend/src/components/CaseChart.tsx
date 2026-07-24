import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

const data = [
  { month: "Jan", cases: 4 },
  { month: "Feb", cases: 8 },
  { month: "Mar", cases: 6 },
  { month: "Apr", cases: 12 },
  { month: "May", cases: 9 },
  { month: "Jun", cases: 15 },
];

const colors = [
  "#06B6D4",
  "#0EA5E9",
  "#2563EB",
  "#4F46E5",
  "#7C3AED",
  "#9333EA",
];

export default function CaseChart() {
  return (
    <div className="w-full">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">

            Investigation Trends

          </h2>

          <p className="mt-1 text-sm text-slate-400">

            Monthly AI investigation activity

          </p>

        </div>

        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">

          <span className="text-sm font-semibold text-cyan-300">

            +28% Growth

          </span>

        </div>

      </div>

      {/* Chart */}

      <div className="h-[340px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              opacity={0.25}
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: "#94A3B8",
                fontSize: 13,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#94A3B8",
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{
                fill: "rgba(6,182,212,0.08)",
              }}
              contentStyle={{
                background: "#0F172A",
                border: "1px solid #1E293B",
                borderRadius: "16px",
                color: "#fff",
              }}
              labelStyle={{
                color: "#fff",
              }}
            />

            <Bar
              dataKey="cases"
              radius={[12, 12, 0, 0]}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={colors[index]}
                />
              ))}
            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Footer Stats */}

      <div className="mt-8 grid grid-cols-3 gap-4">

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">

          <p className="text-xs text-slate-400">

            Total Cases

          </p>

          <h3 className="mt-2 text-2xl font-bold text-cyan-300">

            54

          </h3>

        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">

          <p className="text-xs text-slate-400">

            Solved

          </p>

          <h3 className="mt-2 text-2xl font-bold text-green-400">

            38

          </h3>

        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">

          <p className="text-xs text-slate-400">

            AI Accuracy

          </p>

          <h3 className="mt-2 text-2xl font-bold text-purple-400">

            96%

          </h3>

        </div>

      </div>

    </div>
  );
}