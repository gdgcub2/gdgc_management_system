"use client";

// Animation library
import { motion, AnimatePresence } from "motion/react";

// Lucide icons for scanner and status indicators
import { Camera, Users, CheckCircle, XCircle, Clock, QrCode, X, Download } from "lucide-react";

// React hooks
import { useState, useEffect, useRef } from "react";

// QR Code library
import { QRCodeSVG } from "qrcode.react";

// Sample attendees list with check-in status and unique IDs
const initialAttendees = [
  { id: "member-001", name: "John Doe", email: "john@example.com", checkedInAt: "2:15 PM", status: "checked-in" },
  { id: "member-002", name: "Jane Smith", email: "jane@example.com", checkedInAt: "2:18 PM", status: "checked-in" },
  { id: "member-003", name: "Bob Johnson", email: "bob@example.com", checkedInAt: "2:22 PM", status: "checked-in" },
  { id: "member-004", name: "Alice Williams", email: "alice@example.com", checkedInAt: null, status: "pending" },
  { id: "member-005", name: "Alex Thompson", email: "alex@example.com", checkedInAt: null, status: "pending" },
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

  // Attendees state (mutable for check-in updates)
  const [attendees, setAttendees] = useState(initialAttendees);

  // Total registered count — fixed
  const [total] = useState(67);

  // Last scan result — shown briefly after each scan
  const [lastScan, setLastScan] = useState<{ name: string; success: boolean } | null>(null);

  // Selected member for QR modal
  const [selectedMember, setSelectedMember] = useState<typeof initialAttendees[0] | null>(null);

  // Filter state
  const [filter, setFilter] = useState<"all" | "checked-in" | "pending">("all");

  // QR SVG ref for download
  const qrRef = useRef<HTMLDivElement>(null);

  // Checked in count derived from attendees
  const checkedIn = attendees.filter((a) => a.status === "checked-in").length;

  // Attendance rate as a percentage
  const attendanceRate = Math.round((checkedIn / total) * 100);

  // Simulate a QR code scan — picks a random pending member
  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      const pendingMembers = attendees.filter((a) => a.status === "pending");
      const success = pendingMembers.length > 0 && Math.random() > 0.2;

      if (success && pendingMembers.length > 0) {
        const scanned = pendingMembers[Math.floor(Math.random() * pendingMembers.length)];
        const now = new Date();
        const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

        setAttendees((prev) =>
          prev.map((a) =>
            a.id === scanned.id ? { ...a, status: "checked-in", checkedInAt: time } : a
          )
        );
        setLastScan({ name: scanned.name, success: true });
      } else {
        setLastScan({ name: "Invalid QR Code", success: false });
      }

      setScanning(false);
    }, 2000);
  };

  // Download QR code as PNG
  const downloadQR = () => {
    if (!qrRef.current || !selectedMember) return;
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    canvas.width = 200;
    canvas.height = 200;

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      const a = document.createElement("a");
      a.download = `qr-${selectedMember.id}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  // Filtered attendees
  const filteredAttendees = attendees.filter((a) =>
    filter === "all" ? true : a.status === filter
  );

  return (
    <div className="space-y-4 md:space-y-6">

      {/* Page header */}
      <div>
        <h1 className="text-xl md:text-3xl font-semibold text-gray-900">QR Code Attendance</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">Real-time attendance tracking with QR codes</p>
      </div>

      {/* ── SCANNER + STATS ROW ── */}
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
            <div className="absolute inset-0 flex items-center justify-center">
              <Camera className="w-12 h-12 md:w-16 md:h-16 text-gray-600" />
            </div>

            {/* Scanning laser line */}
            {scanning && (
              <motion.div
                initial={{ top: 0 }}
                animate={{ top: "100%" }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#4285F4] to-transparent"
              />
            )}

            {/* Flash overlay */}
            {lastScan && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 ${lastScan.success ? "bg-[#34A853]/50" : "bg-[#EA4335]/50"}`}
              />
            )}

            {/* Corner brackets */}
            <div className="absolute inset-4 border-2 border-white/30">
              <div className="absolute top-0 left-0 w-5 h-5 md:w-6 md:h-6 border-t-4 border-l-4 border-[#4285F4]" />
              <div className="absolute top-0 right-0 w-5 h-5 md:w-6 md:h-6 border-t-4 border-r-4 border-[#4285F4]" />
              <div className="absolute bottom-0 left-0 w-5 h-5 md:w-6 md:h-6 border-b-4 border-l-4 border-[#4285F4]" />
              <div className="absolute bottom-0 right-0 w-5 h-5 md:w-6 md:h-6 border-b-4 border-r-4 border-[#4285F4]" />
            </div>
          </div>

          {/* Last scan result */}
          {lastScan && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-lg mb-4 ${
                lastScan.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
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

        {/* Stats and capacity */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-3 md:gap-4">
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
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 bg-[#34A853] rounded-full"
            />
          </div>
          {/* Filter buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFilter("checked-in")}
              className={`px-3 py-1 text-xs md:text-sm rounded-lg transition-colors ${
                filter === "checked-in" ? "bg-[#34A853] text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              Checked In
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-3 py-1 text-xs md:text-sm rounded-lg transition-colors ${
                filter === "pending" ? "bg-[#FBBC05] text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 text-xs md:text-sm rounded-lg transition-colors ${
                filter === "all" ? "bg-[#4285F4] text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              All
            </button>
          </div>
        </div>

        {/* Attendee rows */}
        <div className="space-y-2">
          <AnimatePresence>
            {filteredAttendees.map((attendee, index) => (
              <motion.div
                key={attendee.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
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

                <div className="flex items-center space-x-2 md:space-x-3">
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

                  {/* Show QR button */}
                  <button
                    onClick={() => setSelectedMember(attendee)}
                    className="flex items-center gap-1 px-2 md:px-3 py-1 text-xs bg-[#4285F4] text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <QrCode className="w-3 h-3" />
                    <span className="hidden sm:inline">QR</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── QR CODE MODAL ── */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between w-full">
                <h3 className="text-lg font-semibold text-gray-900">Member QR Code</h3>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Avatar */}
              <div className={`w-14 h-14 rounded-full ${
                selectedMember.status === "checked-in"
                  ? "bg-gradient-to-br from-[#34A853] to-[#34A853]/80"
                  : "bg-gradient-to-br from-[#4285F4] to-[#4285F4]/80"
              } flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">
                  {selectedMember.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>

              {/* Member info */}
              <div className="text-center">
                <p className="font-semibold text-gray-900 text-base">{selectedMember.name}</p>
                <p className="text-sm text-gray-500">{selectedMember.email}</p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                  selectedMember.status === "checked-in"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {selectedMember.status === "checked-in" ? "✓ Checked In" : "Pending"}
                </span>
              </div>

              {/* QR Code */}
              <div ref={qrRef} className="p-3 border-2 border-gray-100 rounded-xl">
                <QRCodeSVG
                  value={selectedMember.id}
                  size={180}
                  level="H"
                  includeMargin={false}
                  bgColor="#ffffff"
                  fgColor="#1a1a1a"
                />
              </div>

              {/* Member ID */}
              <p className="text-xs text-gray-400 font-mono">ID: {selectedMember.id}</p>

              {/* Actions */}
              <div className="flex gap-2 w-full">
                <button
                  onClick={downloadQR}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#4285F4] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  Download QR
                </button>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}