import {
  UploadCloud,
  FileSearch,
  FileText,
  Image,
  ShieldCheck,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Upload() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-5xl font-bold text-white">
          Evidence Upload Center
        </h1>

        <p className="mt-3 text-lg text-slate-400">
          Securely upload investigation files for AI-powered analysis.
        </p>
      </div>

      {/* Upload Zone */}

      <motion.div
        whileHover={{ scale: 1.01 }}
        className="rounded-3xl border-2 border-dashed border-cyan-500/40 bg-slate-900/70 p-16 text-center backdrop-blur-xl"
      >
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500/20">
          <UploadCloud
            size={48}
            className="text-cyan-400"
          />
        </div>

        <h2 className="mt-8 text-3xl font-bold text-white">
          Drag & Drop Investigation Files
        </h2>

        <p className="mt-4 text-slate-400">
          Upload PDF, DOCX, TXT, PNG, JPG and other evidence files.
        </p>

        <div className="mt-10 flex justify-center gap-4">

          <button
            type="button"
            className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 font-semibold text-white transition hover:scale-105"
          >
            Select Files
          </button>

          <button
            type="button"
            className="rounded-2xl border border-white/10 px-8 py-4 text-white transition hover:bg-white/10"
          >
            Upload Folder
          </button>

        </div>
      </motion.div>

      {/* Features */}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <FileText
            className="mb-4 text-cyan-400"
            size={34}
          />

          <h3 className="text-xl font-semibold text-white">
            Documents
          </h3>

          <p className="mt-2 text-slate-400">
            PDF, DOCX and TXT evidence.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <Image
            className="mb-4 text-pink-400"
            size={34}
          />

          <h3 className="text-xl font-semibold text-white">
            Images
          </h3>

          <p className="mt-2 text-slate-400">
            Photos, screenshots and scans.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <ShieldCheck
            className="mb-4 text-green-400"
            size={34}
          />

          <h3 className="text-xl font-semibold text-white">
            Secure Storage
          </h3>

          <p className="mt-2 text-slate-400">
            Evidence is encrypted and protected.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <Sparkles
            className="mb-4 text-yellow-400"
            size={34}
          />

          <h3 className="text-xl font-semibold text-white">
            AI Analysis
          </h3>

          <p className="mt-2 text-slate-400">
            OCR, entity extraction and summarization.
          </p>
        </div>

      </div>

      {/* AI Status */}

      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">

        <div className="flex items-center gap-3">

          <CheckCircle className="text-green-400" />

          <div>
            <h3 className="text-xl font-bold text-white">
              AI Processing Ready
            </h3>

            <p className="mt-1 text-slate-400">
              Upload evidence to start OCR, entity recognition,
              timeline generation and report creation.
            </p>
          </div>

        </div>

      </div>

      {/* Recent Upload */}

      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">

        <div className="mb-5 flex items-center gap-3">

          <FileSearch className="text-cyan-400" />

          <h2 className="text-2xl font-bold text-white">
            Recent Uploads
          </h2>

        </div>

        <div className="space-y-4">

          <div className="flex justify-between rounded-xl bg-black/30 p-4">
            <span className="text-white">
              FIR_Report.pdf
            </span>

            <span className="text-green-400">
              Processed
            </span>
          </div>

          <div className="flex justify-between rounded-xl bg-black/30 p-4">
            <span className="text-white">
              CCTV_Image.png
            </span>

            <span className="text-yellow-400">
              Processing...
            </span>
          </div>

          <div className="flex justify-between rounded-xl bg-black/30 p-4">
            <span className="text-white">
              Witness_Statement.docx
            </span>

            <span className="text-green-400">
              Completed
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}