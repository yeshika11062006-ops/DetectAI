import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Search,
  UserCircle2,
  CalendarDays,
  Cpu,
  MoonStar,
  LogOut,
  Settings,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // ---------------------------------------------------
  // LOAD SAVED THEME + CLOSE DROPDOWNS ON OUTSIDE CLICK
  // ---------------------------------------------------

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("detectai_theme");

    if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        profileRef.current &&
        !profileRef.current.contains(target)
      ) {
        setProfileOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setNotificationOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ---------------------------------------------------
  // PROFILE
  // ---------------------------------------------------

  function handleProfileClick() {
    setProfileOpen((prev) => !prev);
    setNotificationOpen(false);
  }

  // ---------------------------------------------------
  // NOTIFICATIONS
  // ---------------------------------------------------

  function handleNotificationClick() {
    setNotificationOpen((prev) => !prev);
    setProfileOpen(false);
  }

  // ---------------------------------------------------
  // THEME
  // ---------------------------------------------------

  function handleThemeToggle() {
    setDarkMode((prev) => {
      const newMode = !prev;

      if (newMode) {
        document.documentElement.classList.add("dark");

        localStorage.setItem(
          "detectai_theme",
          "dark"
        );
      } else {
        document.documentElement.classList.remove(
          "dark"
        );

        localStorage.setItem(
          "detectai_theme",
          "light"
        );
      }

      return newMode;
    });
  }

  // ---------------------------------------------------
  // LOGOUT
  // ---------------------------------------------------

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("detectai_analysis");
    navigate("/login");
  }

  return (
    <div className="flex h-24 items-center justify-between px-8">

      {/* ================================================= */}
      {/* LEFT */}
      {/* ================================================= */}

      <div>

        <h1 className="text-3xl font-bold tracking-tight text-white">
          DetectAI Command Center
        </h1>

        <div className="mt-1 flex items-center gap-4">

          <p className="text-sm text-slate-400">
            AI-powered Investigation Intelligence
          </p>

          <span className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">

            <Cpu size={14} />

            AI Online

          </span>

        </div>

      </div>

      {/* ================================================= */}
      {/* RIGHT */}
      {/* ================================================= */}

      <div className="flex items-center gap-5">

        {/* ================================================= */}
        {/* SEARCH */}
        {/* ================================================= */}

        <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 transition-all duration-300 focus-within:border-cyan-500 focus-within:shadow-lg focus-within:shadow-cyan-500/20 lg:flex">

          <Search
            className="text-slate-400"
            size={18}
          />

          <input
            placeholder="Search investigations..."
            className="w-64 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />

        </div>

        {/* ================================================= */}
        {/* DATE */}
        {/* ================================================= */}

        <div className="hidden items-center gap-2 rounded-xl bg-slate-900/70 px-4 py-3 text-sm xl:flex">

          <CalendarDays
            size={17}
            className="text-cyan-400"
          />

          <span className="text-slate-300">
            {today}
          </span>

        </div>

        {/* ================================================= */}
        {/* DARK / LIGHT MODE */}
        {/* ================================================= */}

        <motion.button
          type="button"
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={handleThemeToggle}
          className="rounded-xl bg-slate-900 p-3 transition hover:bg-slate-800"
          title={
            darkMode
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          aria-label="Toggle appearance"
        >

          <MoonStar
            size={20}
            className={
              darkMode
                ? "text-cyan-400"
                : "text-yellow-400"
            }
          />

        </motion.button>

        {/* ================================================= */}
        {/* NOTIFICATIONS */}
        {/* ================================================= */}

        <div
          ref={notificationRef}
          className="relative"
        >

          <motion.button
            type="button"
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={
              handleNotificationClick
            }
            className="relative rounded-xl bg-slate-900 p-3 transition hover:bg-slate-800"
            title="Notifications"
          >

            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

          </motion.button>

          {/* NOTIFICATION DROPDOWN */}

          {notificationOpen && (
            <div className="absolute right-0 top-14 z-50 w-80 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl shadow-black/40">

              {/* HEADER */}

              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">

                <div>

                  <h3 className="font-semibold text-white">
                    Notifications
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Recent system activity
                  </p>

                </div>

                <Bell
                  size={18}
                  className="text-cyan-400"
                />

              </div>

              {/* NOTIFICATIONS */}

              <div className="p-3">

                {/* SYSTEM */}

                <div className="flex gap-3 rounded-xl p-3 transition hover:bg-white/5">

                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-500/10">

                    <CheckCircle2
                      size={16}
                      className="text-green-400"
                    />

                  </div>

                  <div>

                    <p className="text-sm text-slate-200">
                      DetectAI is operational
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      All systems are running normally.
                    </p>

                  </div>

                </div>

                {/* AI ENGINE */}

                <div className="flex gap-3 rounded-xl p-3 transition hover:bg-white/5">

                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10">

                    <Cpu
                      size={16}
                      className="text-cyan-400"
                    />

                  </div>

                  <div>

                    <p className="text-sm text-slate-200">
                      AI Engine Online
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Investigation intelligence is ready.
                    </p>

                  </div>

                </div>

              </div>

            </div>
          )}

        </div>

        {/* ================================================= */}
        {/* PROFILE */}
        {/* ================================================= */}

        <div
          ref={profileRef}
          className="relative"
        >

          <motion.button
            type="button"
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={handleProfileClick}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-2 transition hover:border-cyan-400/30 hover:bg-slate-800"
            aria-label="Open investigator profile"
          >

            {/* PROFILE ICON */}

            <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 p-1">

              <UserCircle2 size={38} />

            </div>

            {/* PROFILE TEXT */}

            <div className="text-left">

              <h3 className="font-semibold text-white">
                Investigator
              </h3>

              <p className="text-xs text-green-400">
                ● Active Session
              </p>

            </div>

          </motion.button>

          {/* PROFILE DROPDOWN */}

          {profileOpen && (
            <div className="absolute right-0 top-16 z-50 w-64 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl shadow-black/40">

              {/* PROFILE HEADER */}

              <div className="border-b border-white/10 px-5 py-4">

                <div className="flex items-center gap-3">

                  <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 p-1">

                    <UserCircle2 size={38} />

                  </div>

                  <div>

                    <p className="font-semibold text-white">
                      Investigator
                    </p>

                    <p className="text-xs text-green-400">
                      ● Active Session
                    </p>

                  </div>

                </div>

              </div>

              {/* MENU */}

              <div className="p-2">

                {/* SETTINGS */}

                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/settings");
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                >

                  <Settings size={18} />

                  Settings

                </button>

                {/* LOGOUT */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-red-400 transition hover:bg-red-500/10"
                >

                  <LogOut size={18} />

                  Sign Out

                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}