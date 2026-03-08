import { motion } from "motion/react";
import { Link } from "react-router";
import {
  Calendar,
  Award,
  QrCode,
  BarChart3,
  Users,
  Zap,
  Shield,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Event Management",
    description: "Create, manage, and track events with ease",
    color: "from-[#4285F4] to-[#4285F4]/80",
  },
  {
    icon: QrCode,
    title: "QR Attendance",
    description: "Real-time attendance tracking with QR codes",
    color: "from-[#EA4335] to-[#EA4335]/80",
  },
  {
    icon: Award,
    title: "Auto Certificates",
    description: "Generate and distribute certificates automatically",
    color: "from-[#FBBC05] to-[#FBBC05]/80",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Comprehensive insights and data visualization",
    color: "from-[#34A853] to-[#34A853]/80",
  },
  {
    icon: Users,
    title: "Role Management",
    description: "Granular permission control for team members",
    color: "from-[#4285F4] to-[#4285F4]/80",
  },
  {
    icon: Zap,
    title: "Gamification",
    description: "Badges, points, and leaderboards to engage members",
    color: "from-[#EA4335] to-[#EA4335]/80",
  },
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "5K+", label: "Events Hosted" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "50+", label: "Communities" },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Event Manager, GDGC Seattle",
    content:
      "This platform transformed how we manage events. Everything is automated and our attendance has increased by 40%!",
    avatar: "SJ",
  },
  {
    name: "Mike Chen",
    role: "Community Lead, GDGC Boston",
    content:
      "The QR attendance and certificate automation saved us countless hours. It's a game-changer for event management.",
    avatar: "MC",
  },
  {
    name: "Emily Davis",
    role: "Organizer, GDGC Austin",
    content:
      "The analytics dashboard gives us incredible insights. We can now make data-driven decisions for our events.",
    avatar: "ED",
  },
];

export function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4285F4] via-[#EA4335] to-[#FBBC05] flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">
                GDGC Management
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-gradient-to-r from-[#4285F4] to-[#4285F4]/80 text-white rounded-lg hover:opacity-90 transition-opacity shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
                <Shield className="w-4 h-4 text-[#4285F4]" />
                <span className="text-sm text-[#4285F4] font-medium">
                  Trusted by 50+ Communities
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Smart Event Management for{" "}
                <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] bg-clip-text text-transparent">
                  Developer Communities
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                Streamline your event planning, automate attendance tracking,
                and engage your community with powerful analytics and
                gamification.
              </p>

              <div className="flex items-center space-x-4">
                <Link
                  to="/signup"
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#4285F4] to-[#4285F4]/80 text-white rounded-lg hover:opacity-90 transition-opacity shadow-lg"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center space-x-6 mt-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#34A853]" />
                  <span className="text-sm text-gray-600">No credit card</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#34A853]" />
                  <span className="text-sm text-gray-600">14-day trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#34A853]" />
                  <span className="text-sm text-gray-600">
                    Cancel anytime
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#4285F4] to-[#34A853] flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Cloud Study Jam
                      </div>
                      <div className="text-sm text-gray-600">
                        73 registered
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <div className="text-3xl font-bold text-[#4285F4]">
                        1,284
                      </div>
                      <div className="text-sm text-gray-600">Members</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl">
                      <div className="text-3xl font-bold text-[#34A853]">
                        87%
                      </div>
                      <div className="text-sm text-gray-600">Attendance</div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-yellow-50 to-red-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        Certificate Progress
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        956/1000
                      </span>
                    </div>
                    <div className="h-2 bg-white rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#FBBC05] to-[#EA4335] w-[95%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#4285F4] to-[#34A853] rounded-2xl shadow-xl flex items-center justify-center"
              >
                <TrendingUp className="w-10 h-10 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#FBBC05] to-[#EA4335] rounded-xl shadow-xl flex items-center justify-center"
              >
                <Award className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#4285F4] via-[#FBBC05] to-[#34A853] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Events
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features designed for modern developer communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Event Organizers
            </h2>
            <p className="text-xl text-gray-600">
              See what our users have to say
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4285F4] to-[#34A853] flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Event Management?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of organizers using GDGC Management
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-[#4285F4] rounded-lg hover:bg-gray-50 transition-colors shadow-2xl font-semibold"
            >
              <span>Start Your Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4285F4] via-[#EA4335] to-[#FBBC05] flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-lg font-semibold">GDGC Management</span>
            </div>
            <div className="text-gray-400">
              © 2026 GDGC Management. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
