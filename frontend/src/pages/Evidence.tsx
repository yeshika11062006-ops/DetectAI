import { useRef, useState } from "react";

import {
  Upload,
  FileText,
  CheckCircle,
  Download,
  Send,
} from "lucide-react";

import { uploadEvidence } from "../api/upload";
import { downloadReport } from "../api/report";
import { chatWithEvidence } from "../api/chat";
import { streamAnalysis } from "../api/stream";

export default function Evidence() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [analysis, setAnalysis] = useState<any>(null);

  const [streamText, setStreamText] = useState("");

  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  async function handleUpload() {
    if (!file) return;

    try {
      setLoading(true);

      setMessage("");

      setStreamText("");

      setAnalysis(null);

      const data = await uploadEvidence(file);

      setMessage(
        `✅ ${data.original_name} uploaded successfully`
      );

      if (data.text) {
        await streamAnalysis(
          data.text,
          (chunk: string) => {
            setStreamText((prev) => prev + chunk);
          }
        );
      }

      if (data.analysis) {
        setAnalysis(data.analysis);
      }

      setFile(null);

    } catch (error) {
      console.error(error);

      setMessage("❌ Upload failed");

    } finally {
      setLoading(false);
    }
  }

  async function handleChat() {
    if (!analysis || !question) return;

    try {
      const result = await chatWithEvidence(
        JSON.stringify(analysis),
        question
      );

      setAnswer(result.answer);

    } catch {

      setAnswer(
        "Unable to generate answer."
      );

    }
  }

  async function handleDownload() {
    if (!analysis) return;

    try {
      const blob =
        await downloadReport(analysis);

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        "DetectAI_Report.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch {

      alert(
        "Failed to generate report."
      );

    }
  }

  return (
    <div className="min-h-screen bg-slate-950 p-10 text-white">

      <h1 className="mb-8 text-5xl font-black">
        Evidence Upload
      </h1>

      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-10">

        <div className="mb-8 flex justify-center">

          <Upload
            size={70}
            className="text-cyan-400"
          />

        </div>

        {/* Hidden Input */}

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) =>
            setFile(
              e.target.files?.[0] || null
            )
          }
        />

        {/* Choose File */}

        <button
          onClick={() =>
            inputRef.current?.click()
          }
          className="mb-6 w-full rounded-2xl bg-slate-800 py-4 font-bold transition hover:bg-slate-700"
        >
          📁 Choose Evidence File
        </button>

        {/* Selected */}

        {file && (
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-cyan-500/10 p-4">

            <FileText />

            <span>{file.name}</span>

          </div>
        )}

        {/* Upload */}

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 py-4 font-bold transition hover:scale-105 disabled:opacity-50"
        >
          {loading
            ? "Uploading & Streaming..."
            : "Upload & Analyze"}
        </button>

        {/* Success */}

        {message && (
          <div className="mt-8 flex items-center gap-3 rounded-xl bg-green-500/20 p-4">

            <CheckCircle />

            {message}

          </div>
        )}
                {/* ---------------- STREAMING RESPONSE ---------------- */}

        {streamText && (
          <div className="mt-10 rounded-2xl border border-cyan-500/20 bg-slate-900 p-8">

            <h2 className="mb-6 text-3xl font-bold text-cyan-400">
              Live AI Analysis
            </h2>

            <div className="rounded-xl bg-slate-800 p-6">

              <pre className="whitespace-pre-wrap text-slate-300">
                {streamText}
              </pre>

            </div>

          </div>
        )}

        {/* ---------------- ANALYSIS ---------------- */}

        {analysis && (

          <div className="mt-10 rounded-2xl bg-slate-900 p-8">

            <h2 className="mb-8 text-3xl font-bold text-cyan-400">
              AI Investigation Analysis
            </h2>

            {/* Summary */}

            <div className="mb-8">

              <h3 className="mb-3 text-xl font-bold">
                Investigation Summary
              </h3>

              <p className="leading-7 text-slate-300">
                {analysis.summary}
              </p>

            </div>

            {/* People */}

            <div className="mb-8">

              <h3 className="mb-3 text-xl font-bold">
                People
              </h3>

              <ul className="space-y-2">

                {analysis.people?.map((person: string) => (

                  <li key={person}>
                    • {person}
                  </li>

                ))}

              </ul>

            </div>

            {/* Organizations */}

            <div className="mb-8">

              <h3 className="mb-3 text-xl font-bold">
                Organizations
              </h3>

              <ul className="space-y-2">

                {analysis.organizations?.map((org: string) => (

                  <li key={org}>
                    • {org}
                  </li>

                ))}

              </ul>

            </div>

            {/* Locations */}

            <div className="mb-8">

              <h3 className="mb-3 text-xl font-bold">
                Locations
              </h3>

              <ul className="space-y-2">

                {analysis.locations?.map((loc: string) => (

                  <li key={loc}>
                    • {loc}
                  </li>

                ))}

              </ul>

            </div>

            {/* Dates */}

            <div className="mb-8">

              <h3 className="mb-3 text-xl font-bold">
                Dates
              </h3>

              <ul className="space-y-2">

                {analysis.dates?.map((date: string) => (

                  <li key={date}>
                    • {date}
                  </li>

                ))}

              </ul>

            </div>

            {/* Keywords */}

            <div className="mb-8">

              <h3 className="mb-4 text-xl font-bold">
                Keywords
              </h3>

              <div className="flex flex-wrap gap-3">

                {analysis.keywords?.map((keyword: string) => (

                  <span
                    key={keyword}
                    className="rounded-full bg-cyan-500/20 px-4 py-2"
                  >
                    {keyword}
                  </span>

                ))}

              </div>

            </div>
                        {/* Investigation Insights */}

            <div className="mb-8">

              <h3 className="mb-4 text-xl font-bold text-cyan-400">
                Investigation Insights
              </h3>

              <ul className="space-y-3">

                {analysis.insights?.map((insight: string, index: number) => (

                  <li
                    key={index}
                    className="rounded-xl border border-cyan-500/20 bg-slate-800 p-4"
                  >
                    • {insight}
                  </li>

                ))}

              </ul>

            </div>

            {/* Timeline */}

            {analysis.timeline?.length > 0 && (

              <div className="mb-10">

                <h3 className="mb-4 text-xl font-bold text-cyan-400">
                  Investigation Timeline
                </h3>

                <div className="space-y-4">

                  {analysis.timeline.map((item: any, index: number) => (

                    <div
                      key={index}
                      className="rounded-xl border border-cyan-500/20 bg-slate-800 p-5"
                    >

                      <p className="font-bold text-cyan-300">
                        {item.date}
                      </p>

                      <p className="mt-2 text-slate-300">
                        {item.event}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            )}

            {/* Chat With Evidence */}

            <div className="mt-10">

              <h3 className="mb-5 text-2xl font-bold text-cyan-400">
                Chat with Evidence
              </h3>

              <div className="flex gap-3">

                <input
                  value={question}
                  onChange={(e) =>
                    setQuestion(e.target.value)
                  }
                  placeholder="Ask anything about the uploaded evidence..."
                  className="flex-1 rounded-xl bg-slate-800 p-4 outline-none"
                />

                <button
                  onClick={handleChat}
                  className="rounded-xl bg-cyan-500 px-6 transition hover:bg-cyan-600"
                >
                  <Send size={22} />
                </button>

              </div>

              {answer && (

                <div className="mt-6 rounded-xl bg-slate-800 p-5">

                  <p className="text-slate-300">
                    {answer}
                  </p>

                </div>

              )}

            </div>

            {/* Download Report */}

            <button
              onClick={handleDownload}
              className="mt-10 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 py-4 text-lg font-bold transition hover:scale-105"
            >
              <Download size={22} />

              Download Investigation Report

            </button>

          </div>

        )}

      </div>

    </div>

  );

}