import { useState } from "react";
import {
  Bot,
  User,
  Send,
  Paperclip,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  role: "ai" | "user";
  text: string;
}

export default function ChatBox() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text:
        "Welcome to DetectAI.\n\nUpload evidence and I will summarize documents, generate timelines, detect entities and answer investigation questions.",
    },
  ]);

  function sendMessage() {
    if (!message.trim()) return;

    const userMessage: Message = {
      role: "user",
      text: message,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        role: "ai",
        text:
          "Analyzing evidence...\n\n✔ Timeline Generated\n✔ Entities Detected\n✔ Risk Assessment Complete\n\nConfidence Score: 96%",
      },
    ]);

    setMessage("");
  }

  return (
    <div className="h-[720px] rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-xl flex flex-col overflow-hidden">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-white/10 p-6">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600">

            <Bot size={28} className="text-white" />

          </div>

          <div>

            <h2 className="text-xl font-bold text-white">
              DetectAI Assistant
            </h2>

            <p className="text-sm text-green-400">
              ● AI Online
            </p>

          </div>

        </div>

        <Sparkles className="text-cyan-400" />

      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {messages.map((msg: Message, index: number) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-4 ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            {msg.role === "ai" && (

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500">

                <Bot size={18} className="text-white" />

              </div>

            )}

            <div
              className={`max-w-xl rounded-3xl p-5 whitespace-pre-line ${
                msg.role === "ai"
                  ? "border border-white/10 bg-black/40 text-slate-200"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
              }`}
            >

              {msg.text}

            </div>

            {msg.role === "user" && (

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600">

                <User size={18} className="text-white" />

              </div>

            )}

          </motion.div>

        ))}

      </div>

      {/* Input */}

      <div className="border-t border-white/10 p-5">

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-3">

          <button className="text-cyan-400">

            <Paperclip />

          </button>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask DetectAI to analyze evidence..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-500"
          />

          <button
            onClick={sendMessage}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 p-3 transition hover:scale-105"
          >

            <Send size={18} className="text-white" />

          </button>

        </div>

      </div>

    </div>
  );
}