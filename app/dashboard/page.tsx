"use client";

// Animation library
import { motion } from "motion/react";

// Lucide icons for stat cards and event list
import {
  Calendar,
  Users,
  TrendingUp,
  Award,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

// Recharts components for data visualization
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// React hooks
import { useState, useEffect } from "react";

// Stat cards data for the top summary section
const stats = [
  {
    name: "Total Events",
    value: 48,
    change: "+12%",
    trend: "up",
    icon: Calendar,
    color: "from-[#4285F4] to-[#4285F4]/80",
    bgColor: "bg-blue-50",
  },
  {
    name: "Total Members",
    value: 1284,
    change: "+8%",
    trend: "up",
    icon: Users,
    color: "from-[#EA4335] to-[#EA4335]/80",
    bgColor: "bg-red-50",
  },
  {
    name: "Avg Attendance",
    value: "87%",
    change: "+5%",
    trend: "up",
    icon: TrendingUp,
    color: "from-[#FBBC05] to-[#FBBC05]/80",
    bgColor: "bg-yellow-50",
  },
  {
    name: "Certificates Issued",
    value: 956,
    change: "+15%",
    trend: "up",
    icon: Award,
    color: "from-[#34A853] to-[#34A853]/80",
    bgColor: "bg-green-50",
  },
];

// Data for the event growth line chart
const eventData = [
  { month: "Jan", events: 3 },
  { month: "Feb", events: 5 },
  { month: "Mar", events: 4 },
  { month: "Apr", events: 7 },
  { month: "May", events: 6 },
  { month: "Jun", events: 8 },
];

// Data for the attendance bar chart
const attendanceData = [
  { name: "Workshop A", attendance: 85 },
  { name: "Hackathon", attendance: 92 },
  { name: "Tech Talk", attendance: 78 },
  { name: "Bootcamp", attendance: 95 },
];

// Data for the member distribution pie chart
const memberData = [
  { name: "Active", value: 856, color: "#34A853" },
  { name: "Inactive", value: 428, color: "#EA4335" },
];

// Recent events list for the bottom section
const recentEvents = [
  { name: "Cloud Study Jam", date: "Mar 8, 2026", status: "Upcoming", registered: 45 },
  { name: "Mobile Dev Workshop", date: "Mar 6, 2026", status: "Ongoing", registered: 67 },
  { name: "Web Dev Bootcamp", date: "Mar 2, 2026", status: "Completed", registered: 89 },
];

// Animated number counter component — counts up from 0 to the target value
function AnimatedCounter({ value }: { value: number | string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof value === "number") {
      const duration = 1500;
      const steps = 60;
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
    }
  }, [value]);

  return <>{typeof value === "number" ? count : value}</>;
}

export default function DashboardPage() {
  return (
    <div className="space-y-4 md:space-y-6">

      {/* Page header */}
      <div>
        <h1 className="text-xl md:text-3xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">
          Welcome to GDGC Smart Event Management System
        </p>
      </div>

      {/* ── STAT CARDS ── */}
      {/* Responsive: 1 col on mobile, 2 on sm, 4 on lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bgColor} rounded-2xl p-4 md:p-6 border border-gray-200/50`}
          >
            <div className="flex items-center justify-between">
              {/* Stat icon */}
              <div className={`p-2 md:p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              {/* Trend indicator */}
              <div className={`flex items-center space-x-1 text-xs md:text-sm ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {stat.trend === "up" ? (
                  <ArrowUp className="w-3 h-3 md:w-4 md:h-4" />
                ) : (
                  <ArrowDown className="w-3 h-3 md:w-4 md:h-4" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl md:text-3xl font-semibold text-gray-900">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-xs md:text-sm text-gray-600 mt-1">{stat.name}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── CHARTS ROW ── */}
      {/* Responsive: 1 col on mobile, 2 cols on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">

        {/* Event growth line chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm"
        >
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
            Event Growth Over Time
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={eventData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" tick={{ fontSize: 12 }} />
              <YAxis stroke="#666" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="events"
                stroke="#4285F4"
                strokeWidth={3}
                dot={{ fill: "#4285F4", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Attendance by event bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm"
        >
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
            Attendance by Event
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" tick={{ fontSize: 10 }} />
              <YAxis stroke="#666" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="attendance" fill="#34A853" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* ── BOTTOM ROW ── */}
      {/* Pie chart + recent events list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6">

        {/* Member distribution pie chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm"
        >
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
            Member Distribution
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={memberData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
              >
                {memberData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent events list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-2 bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm"
        >
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
            Recent Events
          </h3>
          <div className="space-y-3">
            {recentEvents.map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3 md:space-x-4">
                  {/* Event icon */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-[#4285F4] to-[#34A853] flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm md:text-base">{event.name}</div>
                    <div className="text-xs md:text-sm text-gray-600">{event.date}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 md:space-x-4">
                  {/* Registered count */}
                  <div className="text-right hidden sm:block">
                    <div className="text-xs md:text-sm text-gray-600">Registered</div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">{event.registered}</div>
                  </div>
                  {/* Status badge */}
                  <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                    event.status === "Upcoming"
                      ? "bg-blue-100 text-blue-700"
                      : event.status === "Ongoing"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}