"use client";

import { motion } from "motion/react";
import {
  Calendar,
  Users,
  TrendingUp,
  Award,
  Download,
  ArrowUp,
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
  Legend,
} from "recharts";
import { useState, useEffect } from "react";

const eventGrowthData = [
  { month: "Sep", events: 2, attendance: 45 },
  { month: "Oct", events: 4, attendance: 78 },
  { month: "Nov", events: 3, attendance: 62 },
  { month: "Dec", events: 5, attendance: 95 },
  { month: "Jan", events: 6, attendance: 110 },
  { month: "Feb", events: 7, attendance: 125 },
  { month: "Mar", events: 8, attendance: 142 },
];

const eventPerformance = [
  { name: "Cloud Study Jam", attendance: 85, satisfaction: 92 },
  { name: "Mobile Workshop", attendance: 78, satisfaction: 88 },
  { name: "Web Bootcamp", attendance: 95, satisfaction: 94 },
  { name: "AI/ML Session", attendance: 72, satisfaction: 85 },
  { name: "Hackathon", attendance: 88, satisfaction: 90 },
];

const memberActivity = [
  { name: "Highly Active", value: 245, color: "#34A853" },
  { name: "Active", value: 512, color: "#4285F4" },
  { name: "Moderate", value: 328, color: "#FBBC05" },
  { name: "Inactive", value: 199, color: "#EA4335" },
];

const topPerformers = [
  {
    name: "Sarah Johnson",
    events: 12,
    points: 1250,
    badges: 8,
    rank: 1,
  },
  {
    name: "Mike Chen",
    events: 11,
    points: 1180,
    badges: 7,
    rank: 2,
  },
  {
    name: "Emily Davis",
    events: 10,
    points: 1050,
    badges: 6,
    rank: 3,
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

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Comprehensive insights and data visualization
          </p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#4285F4] to-[#4285F4]/80 text-white rounded-lg hover:opacity-90 transition-opacity shadow-lg">
          <Download className="w-5 h-5" />
          <span>Export Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Events",
            value: 48,
            change: "+12%",
            icon: Calendar,
            color: "from-[#4285F4] to-[#4285F4]/80",
          },
          {
            label: "Total Members",
            value: 1284,
            change: "+8%",
            icon: Users,
            color: "from-[#EA4335] to-[#EA4335]/80",
          },
          {
            label: "Avg Attendance Rate",
            value: 87,
            change: "+5%",
            icon: TrendingUp,
            color: "from-[#FBBC05] to-[#FBBC05]/80",
          },
          {
            label: "Event Growth %",
            value: 18,
            change: "+15%",
            icon: Award,
            color: "from-[#34A853] to-[#34A853]/80",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1 text-sm text-green-600">
                <ArrowUp className="w-4 h-4" />
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="text-3xl font-semibold text-gray-900 mb-1">
              <AnimatedCounter value={stat.value} />
              {stat.label.includes("Rate") || stat.label.includes("%")
                ? "%"
                : ""}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
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
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={eventGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="events"
                stroke="#4285F4"
                strokeWidth={3}
                dot={{ fill: "#4285F4", r: 5 }}
                name="Events"
              />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#34A853"
                strokeWidth={3}
                dot={{ fill: "#34A853", r: 5 }}
                name="Attendance"
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
            Event Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={eventPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="attendance"
                fill="#4285F4"
                radius={[8, 8, 0, 0]}
                name="Attendance"
              />
              <Bar
                dataKey="satisfaction"
                fill="#34A853"
                radius={[8, 8, 0, 0]}
                name="Satisfaction"
              />
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
            Member Activity
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={memberActivity}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                dataKey="value"
              >
                {memberActivity.map((entry, index) => (
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
            Top Performers
          </h3>
          <div className="space-y-3">
            {topPerformers.map((performer, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full ${
                      performer.rank === 1
                        ? "bg-gradient-to-br from-[#FBBC05] to-[#FBBC05]/80"
                        : performer.rank === 2
                        ? "bg-gradient-to-br from-gray-400 to-gray-400/80"
                        : "bg-gradient-to-br from-[#EA4335] to-[#EA4335]/80"
                    } flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-white text-xl font-bold">
                      {performer.rank === 1
                        ? "🥇"
                        : performer.rank === 2
                        ? "🥈"
                        : "🥉"}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {performer.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {performer.events} events attended
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-[#4285F4]">
                      {performer.points}
                    </div>
                    <div className="text-xs text-gray-600">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-[#34A853]">
                      {performer.badges}
                    </div>
                    <div className="text-xs text-gray-600">Badges</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm overflow-x-auto"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Events Data
        </h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Event Name
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">
                Registered
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">
                Attended
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">
                Rate
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {eventPerformance.map((event, index) => (
              <tr
                key={index}
                className={`border-b border-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50/50" : ""
                }`}
              >
                <td className="py-4 px-4 text-sm text-gray-900">
                  {event.name}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  Mar {5 + index}, 2026
                </td>
                <td className="py-4 px-4 text-sm text-gray-900 text-center">
                  {event.attendance + 10}
                </td>
                <td className="py-4 px-4 text-sm text-gray-900 text-center">
                  {event.attendance}
                </td>
                <td className="py-4 px-4 text-sm text-center">
                  <span className="inline-flex items-center space-x-1 text-green-600">
                    <span>{event.satisfaction}%</span>
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Completed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

