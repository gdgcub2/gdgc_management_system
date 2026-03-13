"use client";

import { motion } from "motion/react";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle,
  Download,
} from "lucide-react";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useParams } from "next/navigation";

export default function RegistrationPage() {
  const params = useParams();
  const eventId = params?.eventId as string | undefined;

  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4285F4]/10 via-[#FBBC05]/10 to-[#34A853]/10 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/20"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#34A853] to-[#34A853]/80 mb-4"
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Registration Confirmed!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for registering, {formData.name}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
            <div className="flex justify-center mb-4">
              <QRCodeSVG
                value={`EVENT-2026-${Date.now()}`}
                size={200}
                level="H"
                includeMargin
              />
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900 mb-1">
                {formData.name}
              </div>
              <div className="text-sm text-gray-600">Cloud Study Jam</div>
              <div className="text-xs text-gray-500 mt-2">
                ID: EVENT-2026-{Date.now().toString().slice(-6)}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-[#4285F4] to-[#4285F4]/80 text-white rounded-lg hover:opacity-90 transition-opacity shadow-lg">
              <Download className="w-5 h-5" />
              <span>Download QR Code</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors">
              <Calendar className="w-5 h-5" />
              <span>Add to Calendar</span>
            </button>
          </div>

          <p className="text-xs text-center text-gray-500 mt-6">
            Please save this QR code. You'll need it for check-in at the event.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4285F4]/10 via-[#FBBC05]/10 to-[#34A853]/10">
      <div className="relative overflow-hidden bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto px-6 text-center text-white"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cloud Study Jam 2026
          </h1>
          <p className="text-xl opacity-90">
            Learn cloud computing with hands-on labs and expert guidance
          </p>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Event Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-[#4285F4] mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">
                      March 15, 2026
                    </div>
                    <div className="text-sm text-gray-600">Friday</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-[#EA4335] mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">
                      2:00 PM - 5:00 PM
                    </div>
                    <div className="text-sm text-gray-600">3 hours</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#34A853] mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Google Meet</div>
                    <div className="text-sm text-gray-600">Online Event</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-[#FBBC05] mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">
                      73 / 100 Registered
                    </div>
                    <div className="text-sm text-gray-600">
                      27 spots remaining
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Register for Event
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white rounded-lg hover:opacity-90 transition-opacity shadow-lg font-medium"
              >
                Register Now
              </motion.button>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              By registering, you agree to receive event updates and
              notifications
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

