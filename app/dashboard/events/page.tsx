"use client";

import { motion } from "motion/react";
import { Calendar, MapPin, Edit, Trash2, Eye } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Cloud Study Jam",
    date: "March 15, 2026",
    time: "2:00 PM - 5:00 PM",
    location: "Google Meet",
    capacity: 100,
    registered: 73,
    checkedIn: 0,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  },
  {
    id: 2,
    title: "Mobile Dev Workshop",
    date: "March 10, 2026",
    time: "10:00 AM - 4:00 PM",
    location: "Tech Hub",
    capacity: 80,
    registered: 67,
    checkedIn: 45,
    status: "Ongoing",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
  },
  {
    id: 3,
    title: "Web Dev Bootcamp",
    date: "March 5, 2026",
    time: "9:00 AM - 6:00 PM",
    location: "Campus Hall",
    capacity: 120,
    registered: 89,
    checkedIn: 89,
    status: "Completed",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
  },
  {
    id: 4,
    title: "AI/ML Workshop",
    date: "March 20, 2026",
    time: "3:00 PM - 6:00 PM",
    location: "Online",
    capacity: 150,
    registered: 112,
    checkedIn: 0,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
];

export default function EventManagementPage() {

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Event Management</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                    event.status === "Upcoming"
                      ? "bg-blue-500/90 text-white"
                      : event.status === "Ongoing"
                      ? "bg-green-500/90 text-white"
                      : "bg-gray-500/90 text-white"
                  }`}
                >
                  {event.status}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>

              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date} • {event.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Capacity</span>
                  <span className="font-medium text-gray-900">
                    {event.registered}/{event.capacity}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(event.registered / event.capacity) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    className="h-full bg-gradient-to-r from-[#4285F4] to-[#34A853]"
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-2xl font-semibold text-[#4285F4]">{event.registered}</div>
                  <div className="text-xs text-gray-600">Registered</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-2xl font-semibold text-[#34A853]">{event.checkedIn}</div>
                  <div className="text-xs text-gray-600">Checked-in</div>
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">View</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-[#4285F4] hover:bg-[#4285F4]/90 text-white rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                  <span className="text-sm">Edit</span>
                </button>
                <button className="p-2 bg-red-50 hover:bg-red-100 text-[#EA4335] rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}