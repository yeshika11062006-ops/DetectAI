import {
  Eye,
  Pencil,
  Trash2,
  Shield,
  Calendar,
  User,
} from "lucide-react";

const cases = [
  {
    id: "CASE-1042",
    title: "Bank Fraud Investigation",
    officer: "John Smith",
    status: "Open",
    date: "24 Jul 2026",
  },
  {
    id: "CASE-1043",
    title: "Cyber Crime Complaint",
    officer: "Sarah Lee",
    status: "In Review",
    date: "22 Jul 2026",
  },
  {
    id: "CASE-1044",
    title: "Insurance Fraud",
    officer: "David Wilson",
    status: "Closed",
    date: "18 Jul 2026",
  },
  {
    id: "CASE-1045",
    title: "Digital Evidence Review",
    officer: "Emily Brown",
    status: "Open",
    date: "16 Jul 2026",
  },
];

export default function CaseTable() {
  const badge = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-500/20 text-green-300 border border-green-400/30";

      case "In Review":
        return "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30";

      default:
        return "bg-red-500/20 text-red-300 border border-red-400/30";
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

      {/* HEADER */}

      <div className="flex items-center justify-between border-b border-white/10 p-6">

        <div className="flex items-center gap-3">

          <Shield className="text-cyan-300" size={28} />

          <div>

            <h2 className="text-2xl font-bold text-white">
              Investigation Records
            </h2>

            <p className="text-sm text-slate-400">
              AI monitored investigation database
            </p>

          </div>

        </div>

        <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm text-cyan-300">
          {cases.length} Cases
        </span>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="border-b border-white/10 bg-white/5">

            <tr>

              <th className="p-5 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                Case
              </th>

              <th className="p-5 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                Officer
              </th>

              <th className="p-5 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                Date
              </th>

              <th className="p-5 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                Status
              </th>

              <th className="p-5 text-center text-sm font-semibold uppercase tracking-wider text-slate-300">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {cases.map((item) => (

              <tr
                key={item.id}
                className="border-b border-white/5 transition hover:bg-cyan-500/5"
              >

                {/* CASE */}

                <td className="p-5">

                  <p className="text-xs text-cyan-300">

                    {item.id}

                  </p>

                  <p className="mt-2 font-semibold text-white">

                    {item.title}

                  </p>

                </td>

                {/* OFFICER */}

                <td className="p-5">

                  <div className="flex items-center gap-2">

                    <User
                      size={16}
                      className="text-slate-400"
                    />

                    <span className="text-slate-300">

                      {item.officer}

                    </span>

                  </div>

                </td>

                {/* DATE */}

                <td className="p-5">

                  <div className="flex items-center gap-2">

                    <Calendar
                      size={16}
                      className="text-slate-400"
                    />

                    <span className="text-slate-300">

                      {item.date}

                    </span>

                  </div>

                </td>

                {/* STATUS */}

                <td className="p-5">

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${badge(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>

                </td>

                {/* ACTIONS */}

                <td className="p-5">

                  <div className="flex justify-center gap-3">

                    <button className="rounded-xl bg-cyan-500/10 p-3 transition hover:bg-cyan-500/20">

                      <Eye
                        size={18}
                        className="text-cyan-300"
                      />

                    </button>

                    <button className="rounded-xl bg-yellow-500/10 p-3 transition hover:bg-yellow-500/20">

                      <Pencil
                        size={18}
                        className="text-yellow-300"
                      />

                    </button>

                    <button className="rounded-xl bg-red-500/10 p-3 transition hover:bg-red-500/20">

                      <Trash2
                        size={18}
                        className="text-red-300"
                      />

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}