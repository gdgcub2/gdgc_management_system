"use client";

// Animation library
import { motion } from "motion/react";

// Lucide icons for leaderboard, badges, and notifications sections
import { Trophy, Medal, Bell, Mail, Star, TrendingUp } from "lucide-react";

// React hooks
import { useState } from "react";

// Radix UI Switch for notification toggles
import * as Switch from "@radix-ui/react-switch";

// Top 10 leaderboard data with rank, points, and trend
const leaderboard = [
  { rank: 1, name: "Sarah Johnson", points: 1250, events: 12, badges: 8, trend: "up" },
  { rank: 2, name: "Mike Chen", points: 1180, events: 11, badges: 7, trend: "up" },
  { rank: 3, name: "Emily Davis", points: 1050, events: 10, badges: 6, trend: "down" },
  { rank: 4, name: "James Wilson", points: 980, events: 9, badges: 6, trend: "same" },
  { rank: 5, name: "Lisa Anderson", points: 920, events: 9, badges: 5, trend: "up" },
  { rank: 6, name: "David Lee", points: 850, events: 8, badges: 5, trend: "up" },
  { rank: 7, name: "Anna Martinez", points: 780, events: 7, badges: 4, trend: "down" },
  { rank: 8, name: "Tom Brown", points: 720, events: 7, badges: 4, trend: "same" },
  { rank: 9, name: "Nina Patel", points: 680, events: 6, badges: 3, trend: "up" },
  { rank: 10, name: "Chris Taylor", points: 620, events: 6, badges: 3, trend: "same" },
];

// All available badges — earned and locked
const allBadges = [
  { id: 1, name: "Early Bird", icon: "🌅", description: "Attend 5 events before 10 AM", requirement: "Attend 5 early events", locked: false },
  { id: 2, name: "Perfect Attendance", icon: "✨", description: "100% attendance for 3 consecutive events", requirement: "3-event streak", locked: false },
  { id: 3, name: "Knowledge Seeker", icon: "📚", description: "Complete 10 workshops", requirement: "Complete 10 workshops", locked: false },
  { id: 4, name: "Team Player", icon: "🤝", description: "Participate in 3 hackathons", requirement: "Join 3 hackathons", locked: false },
  { id: 5, name: "Master Learner", icon: "🎓", description: "Earn 1000 points", requirement: "Reach 1000 points", locked: true },
  { id: 6, name: "Community Leader", icon: "👑", description: "Help 20 members", requirement: "Help 20 members", locked: true },
  { id: 7, name: "Tech Guru", icon: "💻", description: "Attend all tech stack events", requirement: "5/8 completed", locked: true },
  { id: 8, name: "Marathon Runner", icon: "🏃", description: "Attend a full-day bootcamp", requirement: "Complete bootcamp", locked: true },
];

export default function AdvancedFeaturesPage() {
  // Email notification preferences state
  const [emailPreferences, setEmailPreferences] = useState({
    eventReminders: true,
    certificateSent: true,
    newBadgeEarned: true,
    weeklyDigest: false,
    eventUpdates: true,
    leaderboardUpdates: false,
  });

  // Toggle a single email preference on or off
  const togglePreference = (key: keyof typeof emailPreferences) => {
    setEmailPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4 md:space-y-6">

      {/* Page header */}
      <div>
        <h1 className="text-xl md:text-3xl font-semibold text-gray-900">Advanced Features</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">Leaderboards, badges, and notifications</p>
      </div>

      {/* ── LEADERBOARD SECTION ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-[#FBBC05] to-[#FBBC05]/80 rounded-lg">
              <Trophy className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-base md:text-xl font-semibold text-gray-900">Top 10 Leaderboard</h3>
          </div>
          <div className="text-xs md:text-sm text-gray-600">Updated daily</div>
        </div>

        {/* Leaderboard rows */}
        <div className="space-y-2">
          {leaderboard.map((user, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center justify-between p-3 md:p-4 rounded-xl transition-all ${
                user.rank <= 3
                  ? "bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
                {/* Rank medal or number */}
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 ${
                  user.rank === 1 ? "bg-gradient-to-br from-[#FBBC05] to-[#FBBC05]/80"
                  : user.rank === 2 ? "bg-gradient-to-br from-gray-400 to-gray-400/80"
                  : user.rank === 3 ? "bg-gradient-to-br from-[#EA4335] to-[#EA4335]/80"
                  : "bg-gray-300"
                } flex items-center justify-center shadow-lg`}>
                  {user.rank <= 3 ? (
                    <span className="text-lg md:text-2xl">
                      {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : "🥉"}
                    </span>
                  ) : (
                    <span className="text-white font-bold text-sm md:text-base">#{user.rank}</span>
                  )}
                </div>

                {/* User name and stats */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <div className="font-medium text-gray-900 text-sm md:text-base truncate">{user.name}</div>
                    {user.rank <= 3 && <Medal className="w-3 h-3 md:w-4 md:h-4 text-[#FBBC05] flex-shrink-0" />}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    {user.events} events • {user.badges} badges
                  </div>
                </div>

                {/* Points and trend */}
                <div className="flex items-center space-x-3 md:space-x-8 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-lg md:text-2xl font-bold text-[#4285F4]">{user.points}</div>
                    <div className="text-xs text-gray-600">points</div>
                  </div>
                  {/* Trend arrow indicator */}
                  <div className="w-4 md:w-6 hidden sm:block">
                    {user.trend === "up" ? (
                      <div className="text-[#34A853]"><TrendingUp className="w-4 h-4 md:w-5 md:h-5" /></div>
                    ) : user.trend === "down" ? (
                      <div className="text-[#EA4335]"><TrendingUp className="w-4 h-4 md:w-5 md:h-5 rotate-180" /></div>
                    ) : (
                      <div className="text-gray-400"><div className="w-4 md:w-5 h-0.5 bg-gray-400" /></div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Current user rank card */}
        <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium text-gray-900 text-sm md:text-base">Your Rank</div>
            <div className="text-xl md:text-2xl font-bold text-[#4285F4]">#6</div>
          </div>
          <div className="text-xs md:text-sm text-gray-600 mb-2">You need 70 more points to reach rank #5</div>
          <div className="h-2 md:h-3 bg-white rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "85%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-[#4285F4] to-[#34A853]"
            />
          </div>
        </div>
      </motion.div>

      {/* ── BADGE SYSTEM SECTION ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm"
      >
        <div className="flex items-center space-x-3 mb-4 md:mb-6">
          <div className="p-2 bg-gradient-to-br from-[#34A853] to-[#34A853]/80 rounded-lg">
            <Star className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <h3 className="text-base md:text-xl font-semibold text-gray-900">Badge System</h3>
        </div>

        {/* Badge grid — 2 cols on mobile, 4 on md */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {allBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: badge.locked ? 1 : 1.05 }}
              className={`relative p-3 md:p-4 rounded-xl text-center transition-all cursor-pointer ${
                badge.locked
                  ? "bg-gray-100 border-2 border-gray-200 opacity-60 grayscale"
                  : "bg-gradient-to-br from-[#4285F4]/10 to-[#34A853]/10 border-2 border-[#4285F4]/30 hover:shadow-lg"
              }`}
            >
              <div className="text-3xl md:text-5xl mb-2 md:mb-3">{badge.icon}</div>
              <div className="font-medium text-gray-900 mb-0.5 md:mb-1 text-xs md:text-sm">{badge.name}</div>
              <div className="text-xs text-gray-600 mb-1 md:mb-2 hidden sm:block">{badge.description}</div>
              <div className={`text-xs px-2 py-0.5 md:py-1 rounded-full ${
                badge.locked ? "bg-gray-200 text-gray-600" : "bg-green-100 text-green-700"
              }`}>
                {badge.locked ? badge.requirement : "Unlocked"}
              </div>
              {/* Unlocked checkmark */}
              {!badge.locked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-[#34A853] rounded-full flex items-center justify-center shadow-lg"
                >
                  <Star className="w-3 h-3 md:w-4 md:h-4 text-white fill-white" />
                </motion.div>
              )}
              {/* Locked padlock */}
              {badge.locked && (
                <div className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm md:text-lg">🔒</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── EMAIL NOTIFICATIONS SECTION ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm"
      >
        <div className="flex items-center space-x-3 mb-4 md:mb-6">
          <div className="p-2 bg-gradient-to-br from-[#EA4335] to-[#EA4335]/80 rounded-lg">
            <Bell className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <h3 className="text-base md:text-xl font-semibold text-gray-900">Email Notifications</h3>
        </div>

        {/* Notification preference toggles — 1 col on mobile, 2 on md */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {Object.entries(emailPreferences).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#EA4335] flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-medium text-gray-900 text-xs md:text-sm truncate">
                    {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  </div>
                  <div className="text-xs text-gray-600 hidden sm:block">
                    {key === "eventReminders" && "Get notified before events start"}
                    {key === "certificateSent" && "When your certificate is ready"}
                    {key === "newBadgeEarned" && "When you unlock a new badge"}
                    {key === "weeklyDigest" && "Summary of your week"}
                    {key === "eventUpdates" && "Changes to registered events"}
                    {key === "leaderboardUpdates" && "Your rank changes"}
                  </div>
                </div>
              </div>
              {/* Toggle switch */}
              <Switch.Root
                checked={value}
                onCheckedChange={() => togglePreference(key as keyof typeof emailPreferences)}
                className={`relative inline-flex h-5 w-9 md:h-6 md:w-11 items-center rounded-full transition-colors flex-shrink-0 ml-2 ${
                  value ? "bg-[#4285F4]" : "bg-gray-300"
                }`}
              >
                <Switch.Thumb className={`inline-block h-4 w-4 md:h-5 md:w-5 transform rounded-full bg-white transition-transform ${
                  value ? "translate-x-5 md:translate-x-6" : "translate-x-1"
                }`} />
              </Switch.Root>
            </motion.div>
          ))}
        </div>

        {/* Notification preview examples */}
        <div className="mt-4 md:mt-6 p-4 md:p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3 md:mb-4 text-sm md:text-base">Notification Preview</h4>
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-start space-x-3 p-2.5 md:p-3 bg-white rounded-lg border border-gray-200">
              <Bell className="w-4 h-4 md:w-5 md:h-5 text-[#4285F4] mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-xs md:text-sm">Event Reminder: Cloud Study Jam</div>
                <div className="text-xs text-gray-600 mt-0.5 md:mt-1">
                  Your event starts in 1 hour. Don&apos;t forget to join!
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-2.5 md:p-3 bg-white rounded-lg border border-gray-200">
              <Star className="w-4 h-4 md:w-5 md:h-5 text-[#FBBC05] mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-xs md:text-sm">New Badge Earned: Early Bird 🌅</div>
                <div className="text-xs text-gray-600 mt-0.5 md:mt-1">
                  Congratulations! You&apos;ve unlocked a new achievement.
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}