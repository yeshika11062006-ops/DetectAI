import { useEffect, useState } from "react";
import {
  FolderSearch,
  Search,
  Filter,
  Plus,
  Clock3,
  Shield,
  CheckCircle,
  Trash2,
} from "lucide-react";

import {
  getCases,
  createCase,
  deleteCase,
} from "../api/cases";

type Case = {
  id: number;
  title: string;
  description: string | null;
  status: string;
};

export default function Cases() {
  const [cases, setCases] = useState<Case[]>([]);
  const [search, setSearch] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function loadCases() {
    try {
      const data = await getCases();
      setCases(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadCases();
  }, []);

  async function handleCreate() {
    if (!title.trim()) return;

    await createCase(title, description);

    setTitle("");
    setDescription("");

    loadCases();
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this case?")) return;

    await deleteCase(id);

    loadCases();
  }

  const filteredCases = cases.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* HERO */}

      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 p-10">

        <div className="absolute -top-16 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2">

              <FolderSearch
                className="text-cyan-300"
                size={18}
              />

              <span className="text-sm text-cyan-300">
                Investigation Management
              </span>

            </div>

            <h1 className="text-5xl font-black">

              <span className="text-white">
                Investigation
              </span>

              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Cases
              </span>

            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">

              Manage investigations, monitor evidence,
              and organize cases using AI-powered tools.

            </p>

          </div>

          <div className="mt-8 w-full max-w-md space-y-3 lg:mt-0">

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Case Title"
              className="w-full rounded-xl bg-white/10 p-3 text-white outline-none"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows={3}
              className="w-full rounded-xl bg-white/10 p-3 text-white outline-none"
            />

            <button
              onClick={handleCreate}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 py-4 font-bold hover:scale-105 transition"
            >

              <Plus />

              Create Case

            </button>

          </div>

        </div>

      </div>

      {/* SEARCH */}

      <div className="flex flex-col gap-5 lg:flex-row">

        <div className="flex flex-1 items-center rounded-2xl border border-white/10 bg-white/5 px-5">

          <Search className="text-cyan-300" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search investigation..."
            className="w-full bg-transparent p-4 text-white outline-none placeholder:text-slate-500"
          />

        </div>

        <button className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8">

          <Filter size={18} />

          Filters

        </button>

      </div>

      {/* CASE GRID */}

      <div className="grid gap-8 lg:grid-cols-2">        {filteredCases.map((c) => (
          <div
            key={c.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-cyan-300">
                  CASE-{c.id}
                </p>

                <h2 className="mt-3 text-2xl font-bold text-white">
                  {c.title}
                </h2>

                {c.description && (
                  <p className="mt-3 text-slate-400">
                    {c.description}
                  </p>
                )}
              </div>

              <Shield
                className="text-cyan-300"
                size={38}
              />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-5">
              <div>
                <p className="text-sm text-slate-500">
                  Status
                </p>

                <p className="mt-2 font-semibold text-white">
                  {c.status}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Investigator
                </p>

                <p className="mt-2 text-white">
                  DetectAI
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  c.status === "Completed"
                    ? "bg-green-500/20 text-green-300"
                    : c.status === "Review"
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-cyan-500/20 text-cyan-300"
                }`}
              >
                {c.status}
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-3 font-semibold transition hover:scale-105">
                  {c.status === "Completed" ? (
                    <CheckCircle size={18} />
                  ) : (
                    <Clock3 size={18} />
                  )}

                  Open
                </button>

                <button
                  onClick={() => handleDelete(c.id)}
                  className="rounded-xl bg-red-500 p-3 transition hover:bg-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/5 py-16 text-center">
          <FolderSearch
            size={60}
            className="mx-auto text-cyan-300"
          />

          <h2 className="mt-6 text-2xl font-bold text-white">
            No Cases Found
          </h2>

          <p className="mt-2 text-slate-400">
            Create your first investigation case.
          </p>
        </div>
      )}
    </div>
  );
}