"use client";

// Animation library
import { motion } from "motion/react";

// Lucide icons for scanner and status indicators
import { Camera, Users, CheckCircle, XCircle, Clock } from "lucide-react";

// React hooks
import { useState, useEffect } from "react";

// Sample attendees list with check-in status
const attendees = [
  { name: "John Doe", email: "john@example.com", checkedInAt: "2:15 PM", status: "checked-in" },
  { name: "Jane Smith", email: "jane@example.com", checkedInAt: "2:18 PM", status: "checked-in" },
  { name: "Bob Johnson", email: "bob@example.com", checkedInAt: "2:22 PM", status: "checked-in" },
  { name: "Alice Williams", email: "alice@example.com", checkedInAt: null, status: "pending" },
];

// Animated counter that counts up from 0 to target value
function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return <>{count}</>;
}

export default function QRAttendancePage() {
  // Whether the QR scanner is currently active
  const [scanning, setScanning] = useState(false);

  // Current checked-in count
  const [checkedIn, setCheckedIn] = useState(45);

  // Total registered count — fixed
  const [total] = useState(67);

  // Last scan result — shown briefly after each scan
  const [lastScan, setLastScan] = useState<{ name: string; success: boolean } | null>(null);

  // Attendance rate as a percentage
  const attendanceRate = Math.round((checkedIn / total) * 100);

  // Simulate a QR code scan — randomly succeeds or fails
  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      const success = Math.random() > 0.2;
      setLastScan({
        name: success ? "Alex Thompson" : "Invalid QR Code",
        success,
      });
      if (success) setCheckedIn((prev) => prev + 1);
      setScanning(false);
    }, 2000);
  };

  return (
    <div className="space-y-4 md:space-y-6">

      {/* Page header */}
      <div>
        <h1 className="text-xl md:text-3xl font-semibold text-gray-900">QR Code Attendance</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">Real-time attendance tracking with QR codes</p>
      </div>

      {/* ── SCANNER + STATS ROW ── */}
      {/* Responsive: 1 col on mobile, 3 cols on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

        {/* QR Scanner panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm"
        >
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Live Scanner</h3>

          {/* Camera viewfinder */}
          <div className="relative aspect-square bg-gray-900 rounded-xl overflow-hidden mb-4">
            {/* Camera placeholder icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Camera className="w-12 h-12 md:w-16 md:h-16 text-gray-600" />
            </div>

            {/* Scanning laser line animation */}
            {scanning && (
              <motion.div
                initial={{ top: 0 }}
                animate={{ top: "100%" }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#4285F4] to-transparent"
              />
            )}

            {/* Flash overlay on scan result */}
            {lastScan && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 ${lastScan.success ? "bg-[#34A853]/50" : "bg-[#EA4335]/50"}`}
              />
            )}

            {/* Corner bracket decorations */}
            <div className="absolute inset-4 border-2 border-white/30">
              <div className="absolute top-0 left-0 w-5 h-5 md:w-6 md:h-6 border-t-4 border-l-4 border-[#4285F4]" />
              <div className="absolute top-0 right-0 w-5 h-5 md:w-6 md:h-6 border-t-4 border-r-4 border-[#4285F4]" />
              <div className="absolute bottom-0 left-0 w-5 h-5 md:w-6 md:h-6 border-b-4 border-l-4 border-[#4285F4]" />
              <div className="absolute bottom-0 right-0 w-5 h-5 md:w-6 md:h-6 border-b-4 border-r-4 border-[#4285F4]" />
            </div>
          </div>

          {/* Last scan result message */}
          {lastScan && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-lg mb-4 ${
                lastScan.success
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <div className="flex items-center space-x-2">
                {lastScan.success ? (
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#34A853]" />
                ) : (
                  <XCircle className="w-4 h-4 md:w-5 md:h-5 text-[#EA4335]" />
                )}
                <span className={`text-xs md:text-sm font-medium ${lastScan.success ? "text-green-900" : "text-red-900"}`}>
                  {lastScan.name}
                </span>
              </div>
            </motion.div>
          )}

          {/* Simulate scan button */}
          <button
            onClick={simulateScan}
            disabled={scanning}
            className="w-full py-2.5 md:py-3 bg-gradient-to-r from-[#4285F4] to-[#4285F4]/80 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 font-medium text-sm md:text-base"
          >
            {scanning ? "Scanning..." : "Simulate Scan"}
          </button>
        </motion.div>

        {/* Stats and capacity section */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">

          {/* Stat cards row — 3 cols */}
          <div className="grid grid-cols-3 gap-3 md:gap-4">

            {/* Checked in stat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#4285F4] to-[#4285F4]/80 rounded-2xl p-3 md:p-6 text-white shadow-lg"
            >
              <Users className="w-5 h-5 md:w-8 md:h-8 mb-2 md:mb-3 opacity-80" />
              <div className="text-2xl md:text-4xl font-bold mb-1">
                <AnimatedCounter value={checkedIn} />
              </div>
              <div className="text-xs md:text-sm opacity-80">Checked In</div>
            </motion.div>

            {/* Pending stat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#FBBC05] to-[#FBBC05]/80 rounded-2xl p-3 md:p-6 text-white shadow-lg"
            >
              <Clock className="w-5 h-5 md:w-8 md:h-8 mb-2 md:mb-3 opacity-80" />
              <div className="text-2xl md:text-4xl font-bold mb-1">{total - checkedIn}</div>
              <div className="text-xs md:text-sm opacity-80">Pending</div>
            </motion.div>

            {/* Attendance rate stat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-[#34A853] to-[#34A853]/80 rounded-2xl p-3 md:p-6 text-white shadow-lg"
            >
              <CheckCircle className="w-5 h-5 md:w-8 md:h-8 mb-2 md:mb-3 opacity-80" />
              <div className="text-2xl md:text-4xl font-bold mb-1">
                <AnimatedCounter value={attendanceRate} />%
              </div>
              <div className="text-xs md:text-sm opacity-80">Rate</div>
            </motion.div>
          </div>

          {/* Capacity meter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">Capacity Meter</h3>
              <div className="text-xs md:text-sm text-gray-600">{checkedIn} / {total}</div>
            </div>
            <div className="h-3 md:h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${attendanceRate}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-[#4285F4] via-[#FBBC05] to-[#34A853]"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── LIVE PARTICIPANT FEED ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
          <div className="flex items-center space-x-3">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">Live Participant Feed</h3>
            {/* Pulsing live indicator */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 bg-[#34A853] rounded-full"
            />
          </div>
          {/* Filter buttons */}
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-xs md:text-sm bg-[#34A853] text-white rounded-lg">
              Checked In
            </button>
            <button className="px-3 py-1 text-xs md:text-sm bg-gray-200 text-gray-700 rounded-lg">
              All
            </button>
          </div>
        </div>

        {/* Attendee rows */}
        <div className="space-y-2">
          {attendees.map((attendee, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3 md:space-x-4">
                {/* Avatar */}
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${
                  attendee.status === "checked-in"
                    ? "bg-gradient-to-br from-[#34A853] to-[#34A853]/80"
                    : "bg-gray-300"
                } flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-medium text-sm">
                    {attendee.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm md:text-base">{attendee.name}</div>
                  <div className="text-xs md:text-sm text-gray-600">{attendee.email}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-4">
                {/* Check-in time */}
                {attendee.checkedInAt && (
                  <div className="text-xs md:text-sm text-gray-600 hidden sm:block">{attendee.checkedInAt}</div>
                )}
                {/* Status badge */}
                <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                  attendee.status === "checked-in"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {attendee.status === "checked-in" ? "Checked In" : "Pending"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}