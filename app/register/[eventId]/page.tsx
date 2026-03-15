"use client";

// Animation library
import { motion } from "motion/react";

// Lucide icons for event details and confirmation screen
import { Calendar, MapPin, Users, Clock, CheckCircle, Download } from "lucide-react";

// React hooks
import { useState } from "react";

// QR code generator component
import { QRCodeSVG } from "qrcode.react";

// Next.js hook to read URL params
import { useParams } from "next/navigation";

// Shared event data utility — returns event details by slug
import { getEventData } from "@/lib/events-data";

export default function RegistrationPage() {
  // Read eventId from the URL e.g. /register/ai-workshop-2026
  const params = useParams();
  const eventId = params?.eventId as string;

  // Get event details dynamically — known events return full data, unknown slugs get auto-generated title
  const event = getEventData(eventId);

  // Track whether the registration form has been submitted
  const [isRegistered, setIsRegistered] = useState(false);

  // Stable registration ID generated once on mount — used for QR code
  const [registrationId] = useState(() => Date.now());

  // Registration form field values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Handle form submission — show confirmation screen
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);
  };

  // ── CONFIRMATION SCREEN ── shown after successful registration
  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4285F4]/10 via-[#FBBC05]/10 to-[#34A853]/10 flex items-center justify-center p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 max-w-md w-full border border-white/20"
        >
          {/* Success icon */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#34A853] to-[#34A853]/80 mb-4"
            >
              <CheckCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </motion.div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Registration Confirmed!</h2>
            <p className="text-sm md:text-base text-gray-600 mb-5 md:mb-6">
              Thank you for registering, {formData.name}
            </p>
          </div>

          {/* QR code card */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg mb-5 md:mb-6">
            <div className="flex justify-center mb-4">
              <QRCodeSVG
                value={`EVENT-2026-${registrationId}`}
                size={160}
                level="H"
                includeMargin
              />
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900 mb-1 text-sm md:text-base">{formData.name}</div>
              <div className="text-xs md:text-sm text-gray-600">{event.title}</div>
              <div className="text-xs text-gray-500 mt-2">
                ID: EVENT-2026-{registrationId.toString().slice(-6)}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 md:py-3 bg-gradient-to-r from-[#4285F4] to-[#4285F4]/80 text-white rounded-lg hover:opacity-90 transition-opacity shadow-lg text-sm md:text-base">
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              <span>Download QR Code</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 md:py-3 border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors text-sm md:text-base">
              <Calendar className="w-4 h-4 md:w-5 md:h-5" />
              <span>Add to Calendar</span>
            </button>
          </div>

          <p className="text-xs text-center text-gray-500 mt-5 md:mt-6">
            Please save this QR code. You&apos;ll need it for check-in at the event.
          </p>
        </motion.div>
      </div>
    );
  }

  // ── REGISTRATION FORM SCREEN ──
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4285F4]/10 via-[#FBBC05]/10 to-[#34A853]/10">

      {/* Hero section with dynamic event title */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto px-4 md:px-6 text-center text-white"
        >
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">{event.title}</h1>
          <p className="text-base md:text-xl opacity-90">{event.date} • {event.location}</p>
        </motion.div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto" preserveAspectRatio="none">
            <path
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mt-4 md:mt-6 pb-12 md:pb-20">
        {/* Responsive: 1 col on mobile, 3 cols on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

          {/* Event details card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200"
            >
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
              <div className="space-y-3 md:space-y-4">

                {/* Date */}
                <div className="flex items-start space-x-3">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-[#4285F4] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm md:text-base">{event.date}</div>
                    <div className="text-xs md:text-sm text-gray-600">{event.day}</div>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-[#EA4335] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm md:text-base">{event.time}</div>
                    <div className="text-xs md:text-sm text-gray-600">{event.duration}</div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#34A853] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm md:text-base">{event.location}</div>
                    <div className="text-xs md:text-sm text-gray-600">{event.locationType}</div>
                  </div>
                </div>

                {/* Capacity */}
                <div className="flex items-start space-x-3">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-[#FBBC05] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm md:text-base">
                      {event.registered} / {event.capacity} Registered
                    </div>
                    <div className="text-xs md:text-sm text-gray-600">
                      {event.capacity - event.registered} spots remaining
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Registration form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-2xl p-5 md:p-8 shadow-lg border border-gray-200"
          >
            <h2 className="text-lg md:text-2xl font-semibold text-gray-900 mb-5 md:mb-6">
              Register for {event.title}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full name field */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                />
              </div>

              {/* Email field */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                />
              </div>

              {/* Phone field */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                />
              </div>

              {/* Submit button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-2.5 md:py-3 bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white rounded-lg hover:opacity-90 transition-opacity shadow-lg font-medium text-sm md:text-base"
              >
                Register Now
              </motion.button>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              By registering, you agree to receive event updates and notifications
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}