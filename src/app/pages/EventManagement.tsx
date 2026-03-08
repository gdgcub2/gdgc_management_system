import { motion } from "motion/react";
import { Calendar, Users, MapPin, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import * as Slider from "@radix-ui/react-slider";
import * as Switch from "@radix-ui/react-switch";

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
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
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
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
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
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
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
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
];

export function EventManagement() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [capacity, setCapacity] = useState([100]);
  const [autoClose, setAutoClose] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Event Management
          </h1>
          <p className="text-gray-600 mt-1">
            Create and manage your events
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#4285F4] to-[#4285F4]/80 text-white rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/30"
        >
          <Plus className="w-5 h-5" />
          <span>Create Event</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
          >
            {/* Cover Image */}
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

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {event.title}
              </h3>

              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {event.date} • {event.time}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>

              {/* Progress Bar */}
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
                    animate={{
                      width: `${(event.registered / event.capacity) * 100}%`,
                    }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    className="h-full bg-gradient-to-r from-[#4285F4] to-[#34A853]"
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-2xl font-semibold text-[#4285F4]">
                    {event.registered}
                  </div>
                  <div className="text-xs text-gray-600">Registered</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-2xl font-semibold text-[#34A853]">
                    {event.checkedIn}
                  </div>
                  <div className="text-xs text-gray-600">Checked-in</div>
                </div>
              </div>

              {/* Actions */}
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

      {/* Create Event Modal */}
      <Dialog.Root open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <Dialog.Title className="text-2xl font-semibold text-gray-900">
                Create New Event
              </Dialog.Title>

              <Tabs.Root defaultValue="basic" className="mt-6">
                <Tabs.List className="flex space-x-1 border-b border-gray-200">
                  <Tabs.Trigger
                    value="basic"
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 data-[state=active]:text-[#4285F4] data-[state=active]:border-b-2 data-[state=active]:border-[#4285F4] -mb-px transition-colors"
                  >
                    Basic Info
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="capacity"
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 data-[state=active]:text-[#4285F4] data-[state=active]:border-b-2 data-[state=active]:border-[#4285F4] -mb-px transition-colors"
                  >
                    Capacity
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="registration"
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 data-[state=active]:text-[#4285F4] data-[state=active]:border-b-2 data-[state=active]:border-[#4285F4] -mb-px transition-colors"
                  >
                    Registration
                  </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="basic" className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter event title"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Enter event description"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time
                      </label>
                      <input
                        type="time"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                      />
                    </div>
                  </div>
                </Tabs.Content>

                <Tabs.Content value="capacity" className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Maximum Capacity: {capacity[0]}
                    </label>
                    <Slider.Root
                      value={capacity}
                      onValueChange={setCapacity}
                      max={500}
                      step={10}
                      className="relative flex items-center w-full h-5"
                    >
                      <Slider.Track className="relative bg-gray-200 rounded-full h-2 flex-1">
                        <Slider.Range className="absolute bg-gradient-to-r from-[#4285F4] to-[#34A853] rounded-full h-full" />
                      </Slider.Track>
                      <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-[#4285F4] rounded-full shadow-lg focus:outline-none" />
                    </Slider.Root>
                  </div>
                </Tabs.Content>

                <Tabs.Content value="registration" className="mt-6 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">
                        Auto-close Registration
                      </div>
                      <div className="text-sm text-gray-600">
                        Close when capacity is reached
                      </div>
                    </div>
                    <Switch.Root
                      checked={autoClose}
                      onCheckedChange={setAutoClose}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        autoClose ? "bg-[#4285F4]" : "bg-gray-300"
                      }`}
                    >
                      <Switch.Thumb
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          autoClose ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </Switch.Root>
                  </div>
                </Tabs.Content>
              </Tabs.Root>

              <div className="mt-6 flex items-center justify-end space-x-3">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-[#4285F4] to-[#4285F4]/80 text-white rounded-lg hover:opacity-90 transition-opacity">
                  Create Event
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
