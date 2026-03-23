"use client";

// Animation library
import { motion } from "motion/react";

// Lucide icons for event history and badges
import { Award, Calendar, Trophy, Star, Download } from "lucide-react";

// Next.js Link for navigation
import Link from "next/link";

// User profile data
const userProfile = {
  name: "Alex Morgan",
  email: "alex@example.com",
  joinDate: "September 2025",
  totalPoints: 850,
  currentLevel: "Gold",
  nextLevel: "Platinum",
  pointsToNext: 150,
};

// Past events the member attended
const eventHistory = [
  { name: "Cloud Study Jam", date: "March 5, 2026", points: 100, status: "Completed", certificate: true },
  { name: "Mobile Dev Workshop", date: "February 20, 2026", points: 120, status: "Completed", certificate: true },
  { name: "Web Bootcamp", date: "February 10, 2026", points: 150, status: "Completed", certificate: true },
  { name: "AI/ML Session", date: "January 25, 2026", points: 100, status: "Completed", certificate: true },
];

// Badges the member has earned or not yet earned
const badges = [
  { name: "Early Bird", icon: "🌅", description: "Attend 5 events", earned: true },
  { name: "Perfect Attendance", icon: "✨", description: "100% attendance streak", earned: true },
  { name: "Knowledge Seeker", icon: "📚", description: "Complete 10 workshops", earned: true },
  { name: "Team Player", icon: "🤝", description: "Participate in 3 hackathons", earned: true },
  { name: "Master Learner", icon: "🎓", description: "Earn 1000 points", earned: false },
  { name: "Community Leader", icon: "👑", description: "Help 20 members", earned: false },
];

// Upcoming events recommended for the member — each has an id for the register link
const upcomingEvents = [
  { id: "ai-workshop-2026", name: "AI Workshop", date: "March 20, 2026", time: "2:00 PM", spots: 45 },
  { id: "hackathon-2026", name: "Hackathon 2026", date: "March 25, 2026", time: "9:00 AM", spots: 28 },
  { id: "flutter-bootcamp-2026", name: "Flutter Bootcamp", date: "April 5, 2026", time: "10:00 AM", spots: 67 },
];

export default function Page() {
  // Calculate progress percentage toward next level
  const progressPercent =
    (userProfile.totalPoints /
      (userProfile.totalPoints + userProfile.pointsToNext)) *
    100;

  return (
    <div className="space-y-4 md:space-y-6">

      {/* Page header */}
      <div>
        <h1 className="text-xl md:text-3xl font-semibold text-gray-900">Member Dashboard</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">Your personal learning journey</p>
      </div>

      {/* ── PROFILE HEADER CARD ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#4285F4] via-[#EA4335] to-[#FBBC05] rounded-2xl p-5 md:p-8 text-white shadow-xl"
      >
        {/* Profile info and points — stacks vertically on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Avatar with initials */}
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30 flex-shrink-0">
              <span className="text-2xl md:text-4xl font-bold">
                {userProfile.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <div>
              <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">{userProfile.name}</h2>
              <div className="text-white/80 mb-1 md:mb-2 text-sm md:text-base">{userProfile.email}</div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm">
                  {userProfile.currentLevel} Member
                </span>
                <span className="text-white/80 text-xs md:text-sm">• Joined {userProfile.joinDate}</span>
              </div>
            </div>
          </div>
          {/* Total points */}
          <div className="text-left sm:text-right">
            <div className="text-3xl md:text-5xl font-bold mb-1 md:mb-2">{userProfile.totalPoints}</div>
            <div className="text-white/80 text-sm md:text-base">Total Points</div>
          </div>
        </div>

        {/* Level progress bar */}
        <div className="mt-5 md:mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs md:text-sm">Progress to {userProfile.nextLevel}</span>
            <span className="text-xs md:text-sm">{userProfile.pointsToNext} points needed</span>
          </div>
          <div className="h-2 md:h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* ── BADGES SECTION ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-900">Badges & Achievements</h3>
          <div className="text-xs md:text-sm text-gray-600">
            {badges.filter((b) => b.earned).length} / {badges.length} earned
          </div>
        </div>

        {/* Badge grid — 2 cols on mobile, 3 on sm, 6 on lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className={`relative p-3 md:p-4 rounded-xl text-center transition-all ${
                badge.earned
                  ? "bg-gradient-to-br from-[#4285F4]/10 to-[#34A853]/10 border-2 border-[#4285F4]/30"
                  : "bg-gray-100 border-2 border-gray-200 opacity-50 grayscale"
              }`}
            >
              <div className="text-3xl md:text-4xl mb-1 md:mb-2">{badge.icon}</div>
              <div className="text-xs font-medium text-gray-900 mb-0.5 md:mb-1">{badge.name}</div>
              <div className="text-xs text-gray-600 hidden sm:block">{badge.description}</div>
              {badge.earned && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 bg-[#34A853] rounded-full flex items-center justify-center"
                >
                  <Star className="w-2 h-2 md:w-3 md:h-3 text-white fill-white" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── EVENT HISTORY + RECOMMENDED EVENTS ── */}
      {/* Responsive: 1 col on mobile, 3 cols on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

        {/* Event history list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm"
        >
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Event History</h3>
          <div className="space-y-3">
            {eventHistory.map((event, index) => (
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
                  {/* Points earned */}
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-[#FBBC05]">
                      <Trophy className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="font-semibold text-sm md:text-base">+{event.points}</span>
                    </div>
                    <div className="text-xs text-gray-600">points</div>
                  </div>
                  {/* Certificate download button */}
                  {event.certificate && (
                    <button className="p-1.5 md:p-2 bg-[#4285F4] hover:bg-[#4285F4]/90 text-white rounded-lg transition-colors">
                      <Download className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recommended upcoming events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm"
        >
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Recommended Events</h3>
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="p-3 md:p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="font-medium text-gray-900 text-sm md:text-base mb-1 md:mb-2">{event.name}</div>
                <div className="text-xs md:text-sm text-gray-600 mb-2">{event.date} • {event.time}</div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-600">{event.spots} spots left</div>
                  {/* Link to dynamic registration page */}
                  <Link
                    href={`/register/${event.id}`}
                    className="px-2 md:px-3 py-1 bg-[#4285F4] hover:bg-[#4285F4]/90 text-white text-xs rounded-lg transition-colors"
                  >
                    Register
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── MY CERTIFICATES ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-900">My Certificates</h3>
          <button className="px-3 py-1.5 text-xs md:text-sm text-[#4285F4] hover:bg-blue-50 rounded-lg transition-colors">
            View All
          </button>
        </div>

        {/* Certificate cards grid — 2 cols on mobile, 4 on md */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {eventHistory.slice(0, 4).map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-[1.4/1] bg-gradient-to-br from-gray-100 to-white border-2 border-gray-200 rounded-xl p-3 md:p-4 cursor-pointer hover:shadow-lg transition-all"
            >
              {/* Award icon badge */}
              <div className="absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8 bg-[#4285F4] rounded-full flex items-center justify-center">
                <Award className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
              <div className="h-full flex flex-col justify-center items-center text-center">
                <div className="text-xs md:text-sm font-medium text-gray-900 mb-1">{event.name}</div>
                <div className="text-xs text-gray-600">{event.date}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}