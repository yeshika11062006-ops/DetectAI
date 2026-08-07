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

type TimelineItem = {
  date: string;
  event: string;
};

type Analysis = {
  summary?: string;
  people?: string[];
  organizations?: string[];
  locations?: string[];
  dates?: string[];
  keywords?: string[];
  insights?: string[];
  timeline?: TimelineItem[];
};

export default function Evidence() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [analysis, setAnalysis] =
    useState<Analysis | null>(null);

  const [streamText, setStreamText] = useState("");

  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  // ---------------------------------------------------
  // UPLOAD + AI ANALYSIS
  // ---------------------------------------------------

  async function handleUpload() {
    if (!file) return;

    try {
      setLoading(true);

      setMessage("");

      setStreamText("");

      setAnalysis(null);

      setAnswer("");

      const data = await uploadEvidence(file);

      setMessage(
        `✅ ${data.original_name} uploaded successfully`
      );

      // ------------------------------------------------
      // STREAMING AI RESPONSE
      // ------------------------------------------------

      if (data.text) {
        await streamAnalysis(
          data.text,
          (chunk: string) => {
            setStreamText((prev) => prev + chunk);
          }
        );
      }

      // ------------------------------------------------
      // REAL AI ANALYSIS
      // ------------------------------------------------

      if (data.analysis) {
        setAnalysis(data.analysis);

        // Save the real AI analysis so Timeline.tsx
        // can display it after navigating away.
        localStorage.setItem(
          "detectai_analysis",
          JSON.stringify(data.analysis)
        );
      }

      setFile(null);

    } catch (error) {
      console.error(error);

      setMessage("❌ Upload failed");

    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------
  // CHAT WITH EVIDENCE
  // ---------------------------------------------------

  async function handleChat() {
    if (!analysis || !question.trim()) return;

    try {
      const result = await chatWithEvidence(
        JSON.stringify(analysis),
        question
      );

      setAnswer(result.answer);

    } catch (error) {
      console.error(error);

      setAnswer(
        "Unable to generate answer."
      );
    }
  }

  // ---------------------------------------------------
  // DOWNLOAD REPORT
  // ---------------------------------------------------

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

    } catch (error) {
      console.error(error);

      alert(
        "Failed to generate report."
      );
    }
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div>
        <h1 className="mb-8 text-5xl font-black text-white">
          Evidence Upload
        </h1>
      </div>

      {/* UPLOAD CARD */}

      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-10">

        {/* ICON */}

        <div className="mb-8 flex justify-center">
          <Upload
            size={70}
            className="text-cyan-400"
          />
        </div>

        {/* HIDDEN FILE INPUT */}

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,.txt,.doc,.docx,.png,.jpg,.jpeg"
          onChange={(e) =>
            setFile(
              e.target.files?.[0] || null
            )
          }
        />

        {/* CHOOSE FILE */}

        <button
          type="button"
          onClick={() =>
            inputRef.current?.click()
          }
          className="mb-6 w-full rounded-2xl bg-slate-800 py-4 font-bold transition hover:bg-slate-700"
        >
          📁 Choose Evidence File
        </button>

        {/* SELECTED FILE */}

        {file && (
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-cyan-500/10 p-4">

            <FileText />

            <span className="text-white">
              {file.name}
            </span>

          </div>
        )}

        {/* UPLOAD BUTTON */}

        <button
          type="button"
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 py-4 font-bold transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Uploading & Streaming..."
            : "Upload & Analyze"}
        </button>

        {/* SUCCESS / ERROR */}

        {message && (
          <div className="mt-8 flex items-center gap-3 rounded-xl bg-green-500/20 p-4">

            <CheckCircle />

            <span>
              {message}
            </span>

          </div>
        )}

        {/* -------------------------------------------- */}
        {/* STREAMING RESPONSE */}
        {/* -------------------------------------------- */}

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

        {/* -------------------------------------------- */}
        {/* AI ANALYSIS */}
        {/* -------------------------------------------- */}

        {analysis && (

          <div className="mt-10 rounded-2xl bg-slate-900 p-8">

            <h2 className="mb-8 text-3xl font-bold text-cyan-400">
              AI Investigation Analysis
            </h2>

            {/* SUMMARY */}

            <div className="mb-8">

              <h3 className="mb-3 text-xl font-bold text-white">
                Investigation Summary
              </h3>

              <p className="leading-7 text-slate-300">
                {analysis.summary ||
                  "No summary available."}
              </p>

            </div>

            {/* PEOPLE */}

            <div className="mb-8">

              <h3 className="mb-3 text-xl font-bold text-white">
                People
              </h3>

              {analysis.people &&
              analysis.people.length > 0 ? (
                <ul className="space-y-2">
                  {analysis.people.map(
                    (person) => (
                      <li
                        key={person}
                        className="text-slate-300"
                      >
                        • {person}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-slate-500">
                  No people identified.
                </p>
              )}

            </div>

            {/* ORGANIZATIONS */}

            <div className="mb-8">

              <h3 className="mb-3 text-xl font-bold text-white">
                Organizations
              </h3>

              {analysis.organizations &&
              analysis.organizations.length > 0 ? (
                <ul className="space-y-2">
                  {analysis.organizations.map(
                    (org) => (
                      <li
                        key={org}
                        className="text-slate-300"
                      >
                        • {org}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-slate-500">
                  No organizations identified.
                </p>
              )}

            </div>

            {/* LOCATIONS */}

            <div className="mb-8">

              <h3 className="mb-3 text-xl font-bold text-white">
                Locations
              </h3>

              {analysis.locations &&
              analysis.locations.length > 0 ? (
                <ul className="space-y-2">
                  {analysis.locations.map(
                    (location) => (
                      <li
                        key={location}
                        className="text-slate-300"
                      >
                        • {location}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-slate-500">
                  No locations identified.
                </p>
              )}

            </div>

            {/* DATES */}

            <div className="mb-8">

              <h3 className="mb-3 text-xl font-bold text-white">
                Dates
              </h3>

              {analysis.dates &&
              analysis.dates.length > 0 ? (
                <ul className="space-y-2">
                  {analysis.dates.map(
                    (date) => (
                      <li
                        key={date}
                        className="text-slate-300"
                      >
                        • {date}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-slate-500">
                  No dates identified.
                </p>
              )}

            </div>

            {/* KEYWORDS */}

            <div className="mb-8">

              <h3 className="mb-4 text-xl font-bold text-white">
                Keywords
              </h3>

              {analysis.keywords &&
              analysis.keywords.length > 0 ? (
                <div className="flex flex-wrap gap-3">

                  {analysis.keywords.map(
                    (keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full bg-cyan-500/20 px-4 py-2 text-cyan-300"
                      >
                        {keyword}
                      </span>
                    )
                  )}

                </div>
              ) : (
                <p className="text-slate-500">
                  No keywords identified.
                </p>
              )}

            </div>

            {/* INVESTIGATION INSIGHTS */}

            <div className="mb-8">

              <h3 className="mb-4 text-xl font-bold text-cyan-400">
                Investigation Insights
              </h3>

              {analysis.insights &&
              analysis.insights.length > 0 ? (
                <ul className="space-y-3">

                  {analysis.insights.map(
                    (insight, index) => (
                      <li
                        key={index}
                        className="rounded-xl border border-cyan-500/20 bg-slate-800 p-4 text-slate-300"
                      >
                        • {insight}
                      </li>
                    )
                  )}

                </ul>
              ) : (
                <p className="text-slate-500">
                  No insights available.
                </p>
              )}

            </div>

            {/* REAL AI TIMELINE */}

            {analysis.timeline &&
              analysis.timeline.length > 0 && (

                <div className="mb-10">

                  <div className="mb-4 flex items-center justify-between">

                    <h3 className="text-xl font-bold text-cyan-400">
                      Investigation Timeline
                    </h3>

                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                      AI Generated
                    </span>

                  </div>

                  <div className="space-y-4">

                    {analysis.timeline.map(
                      (item, index) => (

                        <div
                          key={`${item.date}-${index}`}
                          className="rounded-xl border border-cyan-500/20 bg-slate-800 p-5"
                        >

                          <p className="font-bold text-cyan-300">
                            {item.date}
                          </p>

                          <p className="mt-2 text-slate-300">
                            {item.event}
                          </p>

                        </div>

                      )
                    )}

                  </div>

                </div>
              )}

            {/* -------------------------------------- */}
            {/* CHAT WITH EVIDENCE */}
            {/* -------------------------------------- */}

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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleChat();
                    }
                  }}
                  placeholder="Ask anything about the uploaded evidence..."
                  className="flex-1 rounded-xl bg-slate-800 p-4 outline-none"
                />

                <button
                  type="button"
                  onClick={handleChat}
                  disabled={!question.trim()}
                  className="rounded-xl bg-cyan-500 px-6 transition hover:bg-cyan-600 disabled:opacity-50"
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

            {/* -------------------------------------- */}
            {/* DOWNLOAD REPORT */}
            {/* -------------------------------------- */}

            <button
              type="button"
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