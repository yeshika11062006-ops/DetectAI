import ChatBox from "../components/ChatBox";
import {
  Bot,
  Shield,
  Sparkles,
  MessageSquare,
} from "lucide-react";

export default function Chat() {
  return (
    <div className="space-y-8">

      {/* HERO */}

      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 p-10 shadow-2xl">

        {/* Glow */}

        <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2">

              <Sparkles size={16} className="text-cyan-300" />

              <span className="text-sm font-medium text-cyan-300">
                AI Investigation Assistant
              </span>

            </div>

            <h1 className="text-5xl font-black leading-tight">

              <span className="text-white">
                Ask
              </span>

              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}DetectAI
              </span>

            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">

              Chat with your investigation assistant to summarize
              evidence, generate timelines, detect entities,
              identify inconsistencies, and produce intelligent
              investigation insights in real time.

            </p>

          </div>

          {/* AI Icon */}

          <div className="mt-10 flex justify-center lg:mt-0">

            <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 shadow-[0_0_80px_rgba(56,189,248,0.4)]">

              <Bot size={70} className="text-white" />

            </div>

          </div>

        </div>

      </div>

      {/* QUICK STATS */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-6 backdrop-blur-xl">

          <Shield className="mb-4 text-cyan-300" size={34} />

          <h2 className="text-3xl font-bold text-white">

            100%

          </h2>

          <p className="mt-2 text-slate-300">

            Secure AI Conversations

          </p>

        </div>

        <div className="rounded-3xl border border-purple-400/20 bg-purple-500/10 p-6 backdrop-blur-xl">

          <MessageSquare className="mb-4 text-purple-300" size={34} />

          <h2 className="text-3xl font-bold text-white">

            Unlimited

          </h2>

          <p className="mt-2 text-slate-300">

            Investigation Questions

          </p>

        </div>

        <div className="rounded-3xl border border-green-400/20 bg-green-500/10 p-6 backdrop-blur-xl">

          <Sparkles className="mb-4 text-green-300" size={34} />

          <h2 className="text-3xl font-bold text-white">

            AI Ready

          </h2>

          <p className="mt-2 text-slate-300">

            Real-time Evidence Analysis

          </p>

        </div>

      </div>

      {/* CHAT */}

      <ChatBox />

    </div>
  );
}