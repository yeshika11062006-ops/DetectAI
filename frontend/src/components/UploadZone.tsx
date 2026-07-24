import { useState } from "react";
import {
  UploadCloud,
  FileText,
  FileImage,
  FileVideo,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  onFiles: (files: File[]) => void;
}

export default function UploadZone({ onFiles }: Props) {
  const [files, setFiles] = useState<File[]>([]);

  function handleFiles(selected: File[]) {
    setFiles(selected);
    onFiles(selected);
  }

  return (
    <div className="space-y-8">

      {/* Upload Area */}

      <motion.label
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="
        relative
        overflow-hidden
        flex
        flex-col
        items-center
        justify-center
        rounded-3xl
        border-2
        border-dashed
        border-cyan-500/40
        bg-slate-900/70
        backdrop-blur-xl
        p-16
        cursor-pointer
        transition
        hover:border-cyan-400
        hover:bg-slate-900
        "
      >

        <div className="
        absolute
        w-96
        h-96
        bg-cyan-500/10
        blur-3xl
        rounded-full
        " />

        <UploadCloud
          size={70}
          className="text-cyan-400 relative z-10"
        />

        <h2 className="mt-6 text-3xl font-bold text-white relative z-10">

          Upload Investigation Evidence

        </h2>

        <p className="mt-3 text-slate-400 relative z-10">

          Drag & Drop files here or click to browse

        </p>

        <div className="
        mt-8
        flex
        flex-wrap
        justify-center
        gap-3
        relative
        z-10
        ">

          <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-300">
            PDF
          </span>

          <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-300">
            DOCX
          </span>

          <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-300">
            JPG
          </span>

          <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-300">
            PNG
          </span>

          <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-300">
            MP4
          </span>

        </div>

        <input
          hidden
          multiple
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt,.mp4"
          onChange={(e) =>
            handleFiles(Array.from(e.target.files || []))
          }
        />

      </motion.label>

      {/* AI Processing */}

      <div className="
      rounded-3xl
      bg-slate-900/70
      border
      border-white/10
      p-6
      ">

        <div className="flex items-center gap-3 mb-6">

          <Sparkles className="text-cyan-400" />

          <h2 className="text-xl font-bold text-white">

            AI Processing Pipeline

          </h2>

        </div>

        <div className="grid md:grid-cols-4 gap-4">

          {[
            "OCR Extraction",
            "Entity Detection",
            "Timeline Generation",
            "AI Report",
          ].map((step) => (

            <div
              key={step}
              className="
              rounded-2xl
              bg-black/30
              p-5
              text-center
              "
            >

              <CheckCircle2
                className="
                text-green-400
                mx-auto
                mb-3
                "
              />

              <p className="text-white">

                {step}

              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Uploaded Files */}

      {files.length > 0 && (

        <div className="space-y-4">

          <h2 className="text-2xl font-bold text-white">

            Uploaded Evidence

          </h2>

          {files.map((file, index) => {

            let Icon = FileText;

            if (file.type.includes("image")) {
              Icon = FileImage;
            }

            if (file.type.includes("video")) {
              Icon = FileVideo;
            }

            return (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                rounded-2xl
                bg-slate-900/70
                border
                border-white/10
                p-5
                flex
                items-center
                justify-between
                "
              >

                <div className="flex items-center gap-4">

                  <Icon
                    size={34}
                    className="text-cyan-400"
                  />

                  <div>

                    <h3 className="font-semibold text-white">

                      {file.name}

                    </h3>

                    <p className="text-sm text-slate-400">

                      {(file.size / 1024).toFixed(1)} KB

                    </p>

                  </div>

                </div>

                <span className="
                rounded-full
                bg-green-500/20
                px-4
                py-2
                text-green-400
                text-sm
                ">

                  Uploaded

                </span>

              </motion.div>

            );

          })}

        </div>

      )}

    </div>
  );
}