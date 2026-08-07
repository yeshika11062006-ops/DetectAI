import {
  FileText,
  Download,
  Eye,
  Calendar,
  Sparkles,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { downloadReport } from "../api/report";

type Report = {
  title: string;
  status: string;
  confidence: string;
  date: string;
};

const reports: Report[] = [
  {
    title: "Investigation Summary",
    status: "Completed",
    confidence: "96%",
    date: "Today",
  },
  {
    title: "Evidence Analysis",
    status: "Completed",
    confidence: "94%",
    date: "Yesterday",
  },
  {
    title: "Timeline Report",
    status: "Ready",
    confidence: "98%",
    date: "Today",
  },
  {
    title: "Entity Extraction",
    status: "Completed",
    confidence: "95%",
    date: "2 Days Ago",
  },
];

export default function Reports() {
  const [analysis, setAnalysis] = useState<any | null>(null);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState("");

  // ---------------------------------------------------
  // LOAD REAL AI ANALYSIS
  // ---------------------------------------------------

  useEffect(() => {
    const savedAnalysis = localStorage.getItem(
      "detectai_analysis"
    );

    if (savedAnalysis) {
      try {
        const parsedAnalysis = JSON.parse(
          savedAnalysis
        );

        setAnalysis(parsedAnalysis);

      } catch (error) {
        console.error(
          "Failed to load analysis:",
          error
        );
      }
    }
  }, []);

  // ---------------------------------------------------
  // GENERATE REPORT
  // ---------------------------------------------------

  async function handleGenerateReport() {
    if (!analysis) {
      setMessage(
        "⚠️ Please upload and analyze evidence first."
      );

      return;
    }

    try {
      setGenerating(true);
      setMessage("");

      const blob = await downloadReport(
        analysis
      );

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        "DetectAI_Investigation_Report.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      setMessage(
        "✅ Investigation report generated successfully."
      );

    } catch (error) {
      console.error(
        "Report generation failed:",
        error
      );

      setMessage(
        "❌ Failed to generate investigation report."
      );

    } finally {
      setGenerating(false);
    }
  }

  // ---------------------------------------------------
  // VIEW REPORT
  // ---------------------------------------------------

  async function handleViewReport() {
    if (!analysis) {
      setMessage(
        "⚠️ Please upload and analyze evidence first."
      );

      return;
    }

    try {
      setGenerating(true);
      setMessage("");

      const blob = await downloadReport(
        analysis
      );

      const url =
        window.URL.createObjectURL(blob);

      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );

      setMessage(
        "✅ Report opened successfully."
      );

    } catch (error) {
      console.error(
        "Unable to open report:",
        error
      );

      setMessage(
        "❌ Unable to open report."
      );

    } finally {
      setGenerating(false);
    }
  }

  // ---------------------------------------------------
  // DOWNLOAD REPORT
  // ---------------------------------------------------

  async function handleDownloadReport() {
    if (!analysis) {
      setMessage(
        "⚠️ Please upload and analyze evidence first."
      );

      return;
    }

    try {
      setGenerating(true);
      setMessage("");

      const blob = await downloadReport(
        analysis
      );

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        "DetectAI_Investigation_Report.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      setMessage(
        "✅ PDF downloaded successfully."
      );

    } catch (error) {
      console.error(
        "PDF download failed:",
        error
      );

      setMessage(
        "❌ Failed to download PDF."
      );

    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div className="flex items-center justify-between gap-6">

        <div>

          <h1 className="text-4xl font-bold text-white">
            AI Generated Reports
          </h1>

          <p className="mt-2 text-slate-400">
            Investigation summaries generated automatically
          </p>

        </div>

        {/* GENERATE REPORT */}

        <button
          type="button"
          onClick={handleGenerateReport}
          disabled={generating}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 font-semibold text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
        >

          {generating ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />

              Generating...
            </>
          ) : (
            <>
              <Sparkles size={18} />

              Generate Report
            </>
          )}

        </button>

      </div>

      {/* STATUS MESSAGE */}

      {message && (
        <div
          className={`flex items-center gap-3 rounded-2xl border p-4 ${
            message.startsWith("❌")
              ? "border-red-500/20 bg-red-500/10 text-red-400"
              : message.startsWith("⚠️")
              ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
              : "border-green-500/20 bg-green-500/10 text-green-400"
          }`}
        >

          {message.startsWith("❌") ||
          message.startsWith("⚠️") ? (
            <AlertCircle size={20} />
          ) : (
            <ShieldCheck size={20} />
          )}

          <span>
            {message}
          </span>

        </div>
      )}

      {/* NO ANALYSIS WARNING */}

      {!analysis && (
        <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-6">

          <div className="flex items-center gap-3">

            <AlertCircle className="text-yellow-400" />

            <div>

              <h2 className="font-semibold text-white">
                No investigation analysis available
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Upload and analyze evidence first.
                The generated AI analysis will be used
                to create your investigation report.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* REPORT CARDS */}

      <div className="grid gap-6 lg:grid-cols-2">

        {reports.map((report, index) => (

          <motion.div
            key={index}
            whileHover={{
              y: -6,
            }}
            className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
          >

            {/* TOP */}

            <div className="flex justify-between">

              <div className="flex gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20">

                  <FileText className="text-cyan-400" />

                </div>

                <div>

                  <h2 className="text-xl font-bold text-white">
                    {report.title}
                  </h2>

                  <div className="mt-2 flex gap-3">

                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                      {report.status}
                    </span>

                    <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-300">
                      {report.confidence}
                    </span>

                  </div>

                </div>

              </div>

              <ShieldCheck className="text-green-400" />

            </div>

            {/* META */}

            <div className="mt-6 flex justify-between text-sm text-slate-400">

              <div className="flex items-center gap-2">

                <Calendar size={15} />

                {report.date}

              </div>

              <div className="flex items-center gap-2">

                <Sparkles size={15} />

                AI Generated

              </div>

            </div>

            {/* BUTTONS */}

            <div className="mt-8 flex gap-3">

              <button
                type="button"
                onClick={handleViewReport}
                disabled={!analysis || generating}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 font-semibold text-slate-900 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
              >

                <Eye size={18} />

                View

              </button>

              <button
                type="button"
                onClick={handleDownloadReport}
                disabled={!analysis || generating}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >

                <Download size={18} />

                PDF

              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  );
}