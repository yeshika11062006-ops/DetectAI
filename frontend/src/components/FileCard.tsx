import {
  FileText,
  CheckCircle2,
  Calendar,
  HardDrive,
} from "lucide-react";

interface Props {
  file: File;
}

export default function FileCard({ file }: Props) {
  return (
    <div
      className="
      group
      rounded-3xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      p-6
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-cyan-400/40
      hover:shadow-[0_0_35px_rgba(34,211,238,0.18)]
      "
    >

      <div className="flex items-center justify-between">

        {/* LEFT */}

        <div className="flex items-center gap-5">

          <div
            className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-cyan-500
            via-blue-600
            to-purple-600
            shadow-lg
            "
          >

            <FileText
              size={30}
              className="text-white"
            />

          </div>

          <div>

            <h3 className="text-lg font-bold text-white">

              {file.name}

            </h3>

            <div className="mt-3 flex flex-wrap gap-5 text-sm text-slate-400">

              <div className="flex items-center gap-2">

                <HardDrive size={15} />

                {(file.size / 1024).toFixed(1)} KB

              </div>

              <div className="flex items-center gap-2">

                <Calendar size={15} />

                Just Uploaded

              </div>

            </div>

          </div>

        </div>

        {/* STATUS */}

        <div
          className="
          flex
          items-center
          gap-2
          rounded-full
          border
          border-green-400/30
          bg-green-500/10
          px-4
          py-2
          "
        >

          <CheckCircle2
            size={18}
            className="text-green-400"
          />

          <span className="font-semibold text-green-300">

            Ready

          </span>

        </div>

      </div>

      {/* Progress */}

      <div className="mt-6">

        <div className="mb-2 flex justify-between text-sm">

          <span className="text-slate-400">

            AI Processing

          </span>

          <span className="text-cyan-300">

            100%

          </span>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-700">

          <div
            className="
            h-full
            w-full
            rounded-full
            bg-gradient-to-r
            from-cyan-400
            via-blue-500
            to-purple-500
            "
          />

        </div>

      </div>

    </div>
  );
}