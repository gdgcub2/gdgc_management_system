"use client";

// Animation library
import { motion } from "motion/react";

// Next.js Link for navigation
import Link from "next/link";

// Lucide icons
import {
  Calendar,
  Users,
  TrendingUp,
  Clock,
  Plus,
  Edit,
  QrCode,
  Award,
  Eye,
} from "lucide-react";

// React hooks
import { useState } from "react";

// Reusable create event modal and NewEvent type
import { CreateEventModal, NewEvent } from "@/components/features/CreateEventModal";

// Initial upcoming events data
const initialUpcomingEvents = [
  { id: 1, title: "Cloud Study Jam", date: "March 15, 2026", time: "2:00 PM", registered: 73, capacity: 100, status: "upcoming", venue: "Tech Hub, Building A" },
  { id: 2, title: "Android Workshop", date: "March 20, 2026", time: "10:00 AM", registered: 45, capacity: 60, status: "upcoming", venue: "Lab 201" },
  { id: 3, title: "Flutter Bootcamp", date: "March 25, 2026", time: "3:00 PM", registered: 89, capacity: 80, status: "full", venue: "Conference Hall" },
];

// Recent completed events with performance stats
const recentEvents = [
  { id: 1, title: "Web Development Basics", date: "March 1, 2026", attendance: 56, registered: 60, certificatesIssued: 52 },
  { id: 2, title: "Firebase Fundamentals", date: "Feb 28, 2026", attendance: 42, registered: 50, certificatesIssued: 40 },
];

// Quick stat cards data
const quickStats = [
  { title: "Active Events", value: "8", change: "+2 this month", icon: Calendar, color: "from-[#4285F4] to-[#4285F4]/80" },
  { title: "Total Registrations", value: "207", change: "+34 this week", icon: Users, color: "from-[#34A853] to-[#34A853]/80" },
  { title: "Avg. Attendance", value: "87%", change: "+5% from last month", icon: TrendingUp, color: "from-[#FBBC05] to-[#FBBC05]/80" },
  { title: "Certificates Issued", value: "156", change: "+23 this week", icon: Award, color: "from-[#EA4335] to-[#EA4335]/80" },
];

// Pending tasks list
const pendingTasks = [
  { id: 1, title: "Review Cloud Study Jam registrations", priority: "high", dueDate: "Today" },
  { id: 2, title: "Upload materials for Android Workshop", priority: "medium", dueDate: "Tomorrow" },
  { id: 3, title: "Send reminder emails for Flutter Bootcamp", priority: "medium", dueDate: "March 10" },
  { id: 4, title: "Process feedback from Web Dev event", priority: "low", dueDate: "March 12" },
];

export default function EventManagerDashboardPage() {
  // Controls the create event modal visibility
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Events list — managed with useState so new events appear immediately
  const [events, setEvents] = useState(initialUpcomingEvents);

  // Handle new event creation from the modal — prepends it to the list
  const handleCreateEvent = (newEvent: NewEvent) => {
    setEvents((prev) => [
      {
        id: prev.length + 1,
        title: newEvent.title,
        date: newEvent.date,
        time: newEvent.time,
        registered: 0,
        capacity: newEvent.capacity,
        status: "upcoming",
        venue: "TBD",
      },
      ...prev,
    ]);
  };

  return (
    <div className="space-y-4 md:space-y-6">

      {/* Page header with create event button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900">Event Manager Dashboard</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">Manage your events and track performance</p>
        </div>
        {/* Opens the create event modal */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-gradient-to-r from-[#4285F4] to-[#4285F4]/80 text-white rounded-lg shadow-lg hover:opacity-90 transition-opacity text-sm md:text-base w-fit"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          <span>Create Event</span>
        </button>
      </div>

      {/* ── QUICK STAT CARDS ── */}
      {/* Responsive: 1 col on mobile, 2 on sm, 4 on lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {quickStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-xs md:text-sm text-gray-600 mb-1">{stat.title}</div>
            <div className="text-xs text-[#34A853] font-medium">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      {/* ── MAIN CONTENT GRID ── */}
      {/* Responsive: 1 col on mobile, 3 cols on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

        {/* Left: upcoming events + recent performance */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">

          {/* Upcoming events list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm"
          >
            <div className="p-4 md:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-base md:text-xl font-semibold text-gray-900">Upcoming Events</h2>
                <Link href="/dashboard/events" className="text-xs md:text-sm text-[#4285F4] hover:underline">
                  View all
                </Link>
              </div>
            </div>
            <div className="p-4 md:p-6 space-y-3 md:space-y-4">

              {/* Empty state — shown when no events exist */}
              {events.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No events yet. Click &quot;Create Event&quot; to add one.
                </div>
              )}

              {/* Event rows */}
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start justify-between p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {/* Event info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1 md:mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">{event.title}</h3>
                      {event.status === "full" && (
                        <span className="px-2 py-0.5 bg-[#EA4335] text-white text-xs rounded-full flex-shrink-0">Full</span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600 mb-1 md:mb-2">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 md:w-4 md:h-4" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 mb-2">📍 {event.venue}</div>

                    {/* Capacity bar — capped at 100% to prevent overflow */}
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5 md:h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#4285F4] to-[#34A853] h-full rounded-full"
                          style={{
                            width: `${Math.min((event.registered / event.capacity) * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs md:text-sm text-gray-600 flex-shrink-0">
                        {event.registered}/{event.capacity}
                      </span>
                    </div>
                  </div>

                  {/* Action icons: edit and QR */}
                  <div className="flex items-center space-x-1 md:space-x-2 ml-2 md:ml-4 flex-shrink-0">
                    {/* Edit icon — links to event management page */}
                    <Link href="/dashboard/events" className="p-1.5 md:p-2 hover:bg-white rounded-lg transition-colors">
                      <Edit className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                    </Link>
                    {/* QR icon — links to attendance page */}
                    <Link href="/dashboard/attendance" className="p-1.5 md:p-2 hover:bg-white rounded-lg transition-colors">
                      <QrCode className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent events performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm"
          >
            <div className="p-4 md:p-6 border-b border-gray-200">
              <h2 className="text-base md:text-xl font-semibold text-gray-900">Recent Events Performance</h2>
            </div>
            <div className="p-4 md:p-6 space-y-3 md:space-y-4">
              {recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">{event.title}</h3>
                    <span className="text-xs md:text-sm text-gray-600">{event.date}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <div>
                      <div className="text-xs md:text-sm text-gray-600 mb-1">Attendance</div>
                      <div className="text-lg md:text-2xl font-bold text-gray-900">
                        {Math.round((event.attendance / event.registered) * 100)}%
                      </div>
                      <div className="text-xs text-gray-500">{event.attendance}/{event.registered}</div>
                    </div>
                    <div>
                      <div className="text-xs md:text-sm text-gray-600 mb-1">Certificates</div>
                      <div className="text-lg md:text-2xl font-bold text-gray-900">{event.certificatesIssued}</div>
                      <div className="text-xs text-gray-500">issued</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <Link
                        href="/dashboard/analytics"
                        className="flex items-center space-x-1 text-[#4285F4] hover:underline text-xs md:text-sm"
                      >
                        <Eye className="w-3 h-3 md:w-4 md:h-4" />
                        <span>Details</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: pending tasks + quick actions */}
        <div className="space-y-4 md:space-y-6">

          {/* Pending tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm"
          >
            <div className="p-4 md:p-6 border-b border-gray-200">
              <h2 className="text-base md:text-xl font-semibold text-gray-900">Pending Tasks</h2>
            </div>
            <div className="p-4 md:p-6 space-y-2 md:space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start space-x-3 p-2.5 md:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="mt-1 w-3 h-3 md:w-4 md:h-4 text-[#4285F4] border-gray-300 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs md:text-sm text-gray-900 mb-1 truncate">{task.title}</div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-1.5 md:px-2 py-0.5 rounded-full ${
                        task.priority === "high"
                          ? "bg-[#EA4335] text-white"
                          : task.priority === "medium"
                          ? "bg-[#FBBC05] text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}>
                        {task.priority}
                      </span>
                      <span className="text-xs text-gray-500">{task.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick action links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm"
          >
            <div className="p-4 md:p-6 border-b border-gray-200">
              <h2 className="text-base md:text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-4 md:p-6 space-y-2 md:space-y-3">
              <Link
                href="/dashboard/events"
                className="flex items-center space-x-3 p-2.5 md:p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#4285F4] flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <span className="font-medium text-gray-900 text-sm md:text-base">Manage Events</span>
              </Link>
              <Link
                href="/dashboard/attendance"
                className="flex items-center space-x-3 p-2.5 md:p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#34A853] flex items-center justify-center flex-shrink-0">
                  <QrCode className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <span className="font-medium text-gray-900 text-sm md:text-base">Scan Attendance</span>
              </Link>
              <Link
                href="/dashboard/certificates"
                className="flex items-center space-x-3 p-2.5 md:p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#FBBC05] flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <span className="font-medium text-gray-900 text-sm md:text-base">Issue Certificates</span>
              </Link>
              <Link
                href="/dashboard/analytics"
                className="flex items-center space-x-3 p-2.5 md:p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-lg hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#EA4335] flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <span className="font-medium text-gray-900 text-sm md:text-base">View Analytics</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Reusable create event modal with callback */}
      <CreateEventModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onCreateEvent={handleCreateEvent}
      />
    </div>
  );
}