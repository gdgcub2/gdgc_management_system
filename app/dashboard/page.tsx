"use client";

import { motion } from "motion/react";
import {
  Calendar,
  Users,
  TrendingUp,
  Award,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
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
import { useState, useEffect } from "react";

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

const eventData = [
  { month: "Jan", events: 3 },
  { month: "Feb", events: 5 },
  { month: "Mar", events: 4 },
  { month: "Apr", events: 7 },
  { month: "May", events: 6 },
  { month: "Jun", events: 8 },
];

const attendanceData = [
  { name: "Workshop A", attendance: 85 },
  { name: "Hackathon", attendance: 92 },
  { name: "Tech Talk", attendance: 78 },
  { name: "Bootcamp", attendance: 95 },
];

const memberData = [
  { name: "Active", value: 856, color: "#34A853" },
  { name: "Inactive", value: 428, color: "#EA4335" },
];

const recentEvents = [
  {
    name: "Cloud Study Jam",
    date: "Mar 8, 2026",
    status: "Upcoming",
    registered: 45,
  },
  {
    name: "Mobile Dev Workshop",
    date: "Mar 6, 2026",
    status: "Ongoing",
    registered: 67,
  },
  {
    name: "Web Dev Bootcamp",
    date: "Mar 2, 2026",
    status: "Completed",
    registered: 89,
  },
];

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome to GDGC Smart Event Management System
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bgColor} rounded-2xl p-6 border border-gray-200/50 backdrop-blur-sm`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div
                className={`flex items-center space-x-1 text-sm ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-semibold text-gray-900">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-sm text-gray-600 mt-1">{stat.name}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Event Growth Over Time
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={eventData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="events"
                stroke="#4285F4"
                strokeWidth={3}
                dot={{ fill: "#4285F4", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Attendance by Event
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Bar dataKey="attendance" fill="#34A853" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
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
                outerRadius={80}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Events
          </h3>
          <div className="space-y-3">
            {recentEvents.map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#4285F4] to-[#34A853] flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {event.name}
                    </div>
                    <div className="text-sm text-gray-600">{event.date}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Registered</div>
                    <div className="font-semibold text-gray-900">
                      {event.registered}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === "Upcoming"
                        ? "bg-blue-100 text-blue-700"
                        : event.status === "Ongoing"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
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


