import { motion } from "motion/react";
import {
  Award,
  Calendar,
  Trophy,
  Star,
  Download,
  TrendingUp,
} from "lucide-react";

const userProfile = {
  name: "Alex Morgan",
  email: "alex@example.com",
  joinDate: "September 2025",
  totalPoints: 850,
  currentLevel: "Gold",
  nextLevel: "Platinum",
  pointsToNext: 150,
};

const eventHistory = [
  {
    name: "Cloud Study Jam",
    date: "March 5, 2026",
    points: 100,
    status: "Completed",
    certificate: true,
  },
  {
    name: "Mobile Dev Workshop",
    date: "February 20, 2026",
    points: 120,
    status: "Completed",
    certificate: true,
  },
  {
    name: "Web Bootcamp",
    date: "February 10, 2026",
    points: 150,
    status: "Completed",
    certificate: true,
  },
  {
    name: "AI/ML Session",
    date: "January 25, 2026",
    points: 100,
    status: "Completed",
    certificate: true,
  },
];

const badges = [
  {
    name: "Early Bird",
    icon: "🌅",
    description: "Attend 5 events",
    earned: true,
  },
  {
    name: "Perfect Attendance",
    icon: "✨",
    description: "100% attendance streak",
    earned: true,
  },
  {
    name: "Knowledge Seeker",
    icon: "📚",
    description: "Complete 10 workshops",
    earned: true,
  },
  {
    name: "Team Player",
    icon: "🤝",
    description: "Participate in 3 hackathons",
    earned: true,
  },
  {
    name: "Master Learner",
    icon: "🎓",
    description: "Earn 1000 points",
    earned: false,
  },
  {
    name: "Community Leader",
    icon: "👑",
    description: "Help 20 members",
    earned: false,
  },
];

const upcomingEvents = [
  {
    name: "AI Workshop",
    date: "March 20, 2026",
    time: "2:00 PM",
    spots: 45,
  },
  {
    name: "Hackathon 2026",
    date: "March 25, 2026",
    time: "9:00 AM",
    spots: 28,
  },
  {
    name: "Flutter Bootcamp",
    date: "April 5, 2026",
    time: "10:00 AM",
    spots: 67,
  },
];

export function MemberDashboard() {
  const progressPercent =
    (userProfile.totalPoints /
      (userProfile.totalPoints + userProfile.pointsToNext)) *
    100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Member Dashboard
        </h1>
        <p className="text-gray-600 mt-1">Your personal learning journey</p>
      </div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#4285F4] via-[#EA4335] to-[#FBBC05] rounded-2xl p-8 text-white shadow-xl"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
              <span className="text-4xl font-bold">
                {userProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">{userProfile.name}</h2>
              <div className="text-white/80 mb-2">{userProfile.email}</div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  {userProfile.currentLevel} Member
                </span>
                <span className="text-white/80 text-sm">
                  • Joined {userProfile.joinDate}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-5xl font-bold mb-2">
              {userProfile.totalPoints}
            </div>
            <div className="text-white/80">Total Points</div>
          </div>
        </div>

        {/* Progress to Next Level */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">
              Progress to {userProfile.nextLevel}
            </span>
            <span className="text-sm">
              {userProfile.pointsToNext} points needed
            </span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Badges Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Badges & Achievements
          </h3>
          <div className="text-sm text-gray-600">
            {badges.filter((b) => b.earned).length} / {badges.length} earned
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className={`relative p-4 rounded-xl text-center transition-all ${
                badge.earned
                  ? "bg-gradient-to-br from-[#4285F4]/10 to-[#34A853]/10 border-2 border-[#4285F4]/30"
                  : "bg-gray-100 border-2 border-gray-200 opacity-50 grayscale"
              }`}
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <div className="text-xs font-medium text-gray-900 mb-1">
                {badge.name}
              </div>
              <div className="text-xs text-gray-600">{badge.description}</div>
              {badge.earned && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-[#34A853] rounded-full flex items-center justify-center"
                >
                  <Star className="w-3 h-3 text-white fill-white" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Event History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Event History
          </h3>

          <div className="space-y-3">
            {eventHistory.map((event, index) => (
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
                    <div className="flex items-center space-x-1 text-[#FBBC05]">
                      <Trophy className="w-4 h-4" />
                      <span className="font-semibold">+{event.points}</span>
                    </div>
                    <div className="text-xs text-gray-600">points</div>
                  </div>
                  {event.certificate && (
                    <button className="p-2 bg-[#4285F4] hover:bg-[#4285F4]/90 text-white rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Recommended Events
          </h3>

          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="font-medium text-gray-900 mb-2">
                  {event.name}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {event.date} • {event.time}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-600">
                    {event.spots} spots left
                  </div>
                  <button className="px-3 py-1 bg-[#4285F4] hover:bg-[#4285F4]/90 text-white text-xs rounded-lg transition-colors">
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Certificates Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            My Certificates
          </h3>
          <button className="flex items-center space-x-2 px-3 py-1.5 text-sm text-[#4285F4] hover:bg-blue-50 rounded-lg transition-colors">
            <span>View All</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {eventHistory.slice(0, 4).map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-[1.4/1] bg-gradient-to-br from-gray-100 to-white border-2 border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="absolute top-2 right-2 w-8 h-8 bg-[#4285F4] rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
              <div className="h-full flex flex-col justify-center items-center text-center">
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {event.name}
                </div>
                <div className="text-xs text-gray-600">{event.date}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
