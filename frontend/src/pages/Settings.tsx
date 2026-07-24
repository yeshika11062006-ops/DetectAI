import {
  User,
  Shield,
  Bell,
  Moon,
  Database,
  KeyRound,
  Save,
  CheckCircle,
} from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-5xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-3 text-lg text-slate-400">
          Configure your DetectAI investigation workspace.
        </p>

      </div>

      {/* Grid */}

      <div className="grid gap-8 lg:grid-cols-2">

        {/* Profile */}

        <div className="rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-white/10 p-8">

          <div className="flex items-center gap-3 mb-6">

            <User className="text-cyan-400" />

            <h2 className="text-2xl font-bold text-white">
              Investigator Profile
            </h2>

          </div>

          <div className="space-y-5">

            <input
              placeholder="Full Name"
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
            />

            <input
              placeholder="Email"
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
            />

            <input
              placeholder="Department"
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"
            />

          </div>

        </div>

        {/* Security */}

        <div className="rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-white/10 p-8">

          <div className="flex items-center gap-3 mb-6">

            <Shield className="text-green-400" />

            <h2 className="text-2xl font-bold text-white">
              Security
            </h2>

          </div>

          <div className="space-y-5">

            <div className="flex justify-between items-center">

              <span className="text-white">
                Two Factor Authentication
              </span>

              <input type="checkbox" defaultChecked />

            </div>

            <div className="flex justify-between items-center">

              <span className="text-white">
                Auto Logout
              </span>

              <input type="checkbox" defaultChecked />

            </div>

            <div className="flex justify-between items-center">

              <span className="text-white">
                End-to-End Encryption
              </span>

              <input type="checkbox" defaultChecked />

            </div>

          </div>

        </div>

        {/* Notifications */}

        <div className="rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-white/10 p-8">

          <div className="flex items-center gap-3 mb-6">

            <Bell className="text-yellow-400" />

            <h2 className="text-2xl font-bold text-white">
              Notifications
            </h2>

          </div>

          <div className="space-y-5">

            <div className="flex justify-between">

              <span className="text-white">
                AI Analysis Alerts
              </span>

              <input type="checkbox" defaultChecked />

            </div>

            <div className="flex justify-between">

              <span className="text-white">
                Email Notifications
              </span>

              <input type="checkbox" defaultChecked />

            </div>

            <div className="flex justify-between">

              <span className="text-white">
                Case Updates
              </span>

              <input type="checkbox" defaultChecked />

            </div>

          </div>

        </div>

        {/* System */}

        <div className="rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-white/10 p-8">

          <div className="flex items-center gap-3 mb-6">

            <Database className="text-purple-400" />

            <h2 className="text-2xl font-bold text-white">
              System Preferences
            </h2>

          </div>

          <div className="space-y-5">

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">

                <Moon className="text-slate-300" />

                <span className="text-white">
                  Dark Mode
                </span>

              </div>

              <input type="checkbox" defaultChecked />

            </div>

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">

                <KeyRound className="text-cyan-400" />

                <span className="text-white">
                  API Access
                </span>

              </div>

              <span className="text-green-400">
                Connected
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Status */}

      <div className="rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-white/10 p-6">

        <div className="flex items-center gap-3">

          <CheckCircle className="text-green-400" />

          <div>

            <h3 className="text-xl font-bold text-white">
              System Status
            </h3>

            <p className="text-slate-400 mt-1">
              DetectAI AI Engine, Database and Security Services are running normally.
            </p>

          </div>

        </div>

      </div>

      {/* Save Button */}

      <div className="flex justify-end">

        <button className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 font-semibold text-white hover:scale-105 transition">

          <Save size={20} />

          Save Settings

        </button>

      </div>

    </div>
  );
}