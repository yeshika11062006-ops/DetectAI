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

        <p className="text-slate-400 mt-3 text-lg">
          Securely upload investigation files for AI-powered analysis.
        </p>

      </div>

      {/* Upload Zone */}

      <motion.div
        whileHover={{ scale: 1.01 }}
        className="rounded-3xl border-2 border-dashed border-cyan-500/40 bg-slate-900/70 backdrop-blur-xl p-16 text-center"
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

          <button className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 font-semibold text-white hover:scale-105 transition">

            Select Files

          </button>

          <button className="rounded-2xl border border-white/10 px-8 py-4 text-white hover:bg-white/10 transition">

            Upload Folder

          </button>

        </div>

      </motion.div>

      {/* Features */}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-6">

          <FileText className="text-cyan-400 mb-4" size={34} />

          <h3 className="text-xl font-semibold text-white">
            Documents
          </h3>

          <p className="mt-2 text-slate-400">
            PDF, DOCX and TXT evidence.
          </p>

        </div>

        <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-6">

          <Image className="text-pink-400 mb-4" size={34} />

          <h3 className="text-xl font-semibold text-white">
            Images
          </h3>

          <p className="mt-2 text-slate-400">
            Photos, screenshots and scans.
          </p>

        </div>

        <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-6">

          <ShieldCheck className="text-green-400 mb-4" size={34} />

          <h3 className="text-xl font-semibold text-white">
            Secure Storage
          </h3>

          <p className="mt-2 text-slate-400">
            Evidence is encrypted and protected.
          </p>

        </div>

        <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-6">

          <Sparkles className="text-yellow-400 mb-4" size={34} />

          <h3 className="text-xl font-semibold text-white">
            AI Analysis
          </h3>

          <p className="mt-2 text-slate-400">
            OCR, entity extraction and summarization.
          </p>

        </div>

      </div>

      {/* AI Status */}

      <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-6">

        <div className="flex items-center gap-3">

          <CheckCircle className="text-green-400" />

          <div>

            <h3 className="text-xl font-bold text-white">
              AI Processing Ready
            </h3>

            <p className="text-slate-400 mt-1">
              Upload evidence to start OCR, entity recognition, timeline generation and report creation.
            </p>

          </div>

        </div>

      </div>

      {/* Recent Upload */}

      <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-6">

        <div className="flex items-center gap-3 mb-5">

          <FileSearch className="text-cyan-400" />

          <h2 className="text-2xl font-bold text-white">
            Recent Uploads
          </h2>

        </div>

        <div className="space-y-4">

          <div className="rounded-xl bg-black/30 p-4 flex justify-between">

            <span className="text-white">
              FIR_Report.pdf
            </span>

            <span className="text-green-400">
              Processed
            </span>

          </div>

          <div className="rounded-xl bg-black/30 p-4 flex justify-between">

            <span className="text-white">
              CCTV_Image.png
            </span>

            <span className="text-yellow-400">
              Processing...
            </span>

          </div>

          <div className="rounded-xl bg-black/30 p-4 flex justify-between">

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