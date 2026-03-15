"use client";

// Animation library
import { motion } from "motion/react";

// Next.js link component for navigation
import Link from "next/link";

// Lucide icons used throughout the landing page
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

// Feature cards data shown in the features section
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

// Stats shown in the dark stats section
const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "5K+", label: "Events Hosted" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "50+", label: "Communities" },
];

// Testimonials from community organizers
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

export default function Page() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">

            {/* Logo and brand name */}
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-[#4285F4] via-[#EA4335] to-[#FBBC05] flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm md:text-lg">G</span>
              </div>
              <span className="text-base md:text-xl font-semibold text-gray-900">
                GDGC Management
              </span>
            </div>

            {/* Navigation links */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link
                href="/login"
                className="px-3 md:px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-3 md:px-4 py-2 bg-gradient-to-r from-[#4285F4] to-[#4285F4]/80 text-white text-sm rounded-lg hover:opacity-90 transition-opacity shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">

            {/* Hero text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Trust badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-full mb-4 md:mb-6">
                <Shield className="w-4 h-4 text-[#4285F4]" />
                <span className="text-sm text-[#4285F4] font-medium">
                  Trusted by 50+ Communities
                </span>
              </div>

              {/* Main headline */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
                Smart Event Management for{" "}
                <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] bg-clip-text text-transparent">
                  Developer Communities
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8">
                Streamline your event planning, automate attendance tracking,
                and engage your community with powerful analytics and
                gamification.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <Link
                  href="/signup"
                  className="flex items-center space-x-2 px-5 md:px-6 py-3 bg-gradient-to-r from-[#4285F4] to-[#4285F4]/80 text-white rounded-lg hover:opacity-90 transition-opacity shadow-lg text-sm md:text-base"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </Link>
                <button className="px-5 md:px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base">
                  Watch Demo
                </button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-3 md:gap-6 mt-6 md:mt-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#34A853]" />
                  <span className="text-xs md:text-sm text-gray-600">No credit card</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#34A853]" />
                  <span className="text-xs md:text-sm text-gray-600">14-day trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#34A853]" />
                  <span className="text-xs md:text-sm text-gray-600">Cancel anytime</span>
                </div>
              </div>
            </motion.div>

            {/* Hero dashboard preview card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 p-5 md:p-8">
                <div className="space-y-4">

                  {/* Event row */}
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-[#4285F4] to-[#34A853] flex items-center justify-center">
                      <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm md:text-base">Cloud Study Jam</div>
                      <div className="text-xs md:text-sm text-gray-600">73 registered</div>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 md:p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl md:text-3xl font-bold text-[#4285F4]">1,284</div>
                      <div className="text-xs md:text-sm text-gray-600">Members</div>
                    </div>
                    <div className="p-3 md:p-4 bg-green-50 rounded-xl">
                      <div className="text-2xl md:text-3xl font-bold text-[#34A853]">87%</div>
                      <div className="text-xs md:text-sm text-gray-600">Attendance</div>
                    </div>
                  </div>

                  {/* Certificate progress */}
                  <div className="p-3 md:p-4 bg-gradient-to-r from-yellow-50 to-red-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs md:text-sm text-gray-600">Certificate Progress</span>
                      <span className="text-xs md:text-sm font-semibold text-gray-900">956/1000</span>
                    </div>
                    <div className="h-2 bg-white rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#FBBC05] to-[#EA4335] w-[95%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating trending icon */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-[#4285F4] to-[#34A853] rounded-2xl shadow-xl flex items-center justify-center"
              >
                <TrendingUp className="w-7 h-7 md:w-10 md:h-10 text-white" />
              </motion.div>

              {/* Floating award icon */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#FBBC05] to-[#EA4335] rounded-xl shadow-xl flex items-center justify-center"
              >
                <Award className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-[#4285F4] via-[#FBBC05] to-[#34A853] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Events
            </h2>
            <p className="text-base md:text-xl text-gray-600">
              Powerful features designed for modern developer communities
            </p>
          </motion.div>

          {/* Feature cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ── */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by Event Organizers
            </h2>
            <p className="text-base md:text-xl text-gray-600">
              See what our users have to say
            </p>
          </motion.div>

          {/* Testimonial cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#4285F4] to-[#34A853] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-sm">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.name}</div>
                    <div className="text-xs md:text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-700">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Ready to Transform Your Event Management?
            </h2>
            <p className="text-base md:text-xl mb-6 md:mb-8 opacity-90">
              Join thousands of organizers using GDGC Management
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center space-x-2 px-6 md:px-8 py-3 md:py-4 bg-white text-[#4285F4] rounded-lg hover:bg-gray-50 transition-colors shadow-2xl font-semibold text-sm md:text-base"
            >
              <span>Start Your Free Trial</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 md:py-12 px-4 md:px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Footer logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-[#4285F4] via-[#EA4335] to-[#FBBC05] flex items-center justify-center">
                <span className="text-white font-bold text-sm md:text-lg">G</span>
              </div>
              <span className="text-base md:text-lg font-semibold">GDGC Management</span>
            </div>
            {/* Copyright */}
            <div className="text-xs md:text-sm text-gray-400">
              © 2026 GDGC Management. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}