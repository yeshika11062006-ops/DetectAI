import { useRef, useState } from "react";
import {
  Bot,
  User,
  Send,
  Paperclip,
  Sparkles,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { chatWithEvidence } from "../api/chat";

interface Message {
  role: "ai" | "user";
  text: string;
}

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [evidence, setEvidence] = useState("");
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text:
        "Welcome to DetectAI.\n\nUpload evidence and I will summarize documents, generate timelines, detect entities and answer investigation questions.",
    },
  ]);

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "text/plain",
      "application/pdf",
    ];

    const isAllowed =
      allowedTypes.includes(file.type) ||
      file.name.toLowerCase().endsWith(".txt") ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isAllowed) {
      alert("Please select a TXT or PDF file.");
      event.target.value = "";
      return;
    }

    setFileName(file.name);

    // TXT files can be read directly in the browser.
    if (
      file.type === "text/plain" ||
      file.name.toLowerCase().endsWith(".txt")
    ) {
      const text = await file.text();
      setEvidence(text);
      return;
    }

    // PDF extraction should be handled by your backend.
    // We keep the file selected here so it can be uploaded through
    // the evidence upload system.
    setEvidence(
      `PDF file selected: ${file.name}`
    );
  }

  function removeFile() {
    setFileName("");
    setEvidence("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function sendMessage() {
    if (!message.trim() || isLoading) return;

    if (!evidence) {
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          text: message,
        },
        {
          role: "ai",
          text: "Please attach evidence first using the 📎 button.",
        },
      ]);

      setMessage("");
      return;
    }

    const question = message;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: question,
      },
    ]);

    setMessage("");
    setIsLoading(true);

    try {
      const response = await chatWithEvidence(
        evidence,
        question
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: response.answer,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "Sorry, I couldn't analyze the evidence. Please check that the backend is running and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
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

        {isLoading && (
          <div className="flex gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500">
              <Bot size={18} className="text-white" />
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/40 p-5 text-slate-300">
              Analyzing your evidence...
            </div>
          </div>
        )}

      </div>

      {/* Input */}
      <div className="border-t border-white/10 p-5">

        {/* Selected file */}
        {fileName && (
          <div className="mb-3 flex items-center justify-between rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3">

            <span className="truncate text-sm text-cyan-300">
              📄 {fileName}
            </span>

            <button
              onClick={removeFile}
              className="ml-3 text-slate-400 hover:text-red-400"
              type="button"
            >
              <X size={18} />
            </button>

          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.pdf,text/plain,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-3">

          <button
            type="button"
            onClick={openFilePicker}
            className="text-cyan-400 transition hover:text-cyan-300"
            title="Attach evidence"
          >
            <Paperclip />
          </button>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              fileName
                ? "Ask about this evidence..."
                : "Attach evidence, then ask a question..."
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-500"
          />

          <button
            onClick={sendMessage}
            disabled={isLoading}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 p-3 transition hover:scale-105 disabled:opacity-50"
            type="button"
          >
            <Send size={18} className="text-white" />
          </button>

        </div>
      </div>

    </div>
  );
}