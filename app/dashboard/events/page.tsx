"use client";

// Animation library
import { motion } from "motion/react";

// Lucide icons for event cards and modals
import { Calendar, MapPin, Edit, Trash2, Eye, X } from "lucide-react";

// React hooks
import { useState } from "react";

// Radix UI Dialog for modals
import * as Dialog from "@radix-ui/react-dialog";

// Next.js optimized image component
import Image from "next/image";

// Initial events data — managed with useState so delete/edit updates the UI
const initialEvents = [
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

// TypeScript type derived from the events array
type Event = typeof initialEvents[0];

export default function EventManagementPage() {
  // Events list — updated when user edits or deletes an event
  const [events, setEvents] = useState(initialEvents);

  // Currently selected event for view/edit/delete modals
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Modal open states
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Edit form state — pre-filled when edit modal opens
  const [editForm, setEditForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    status: "",
  });

  // Open view modal for selected event
  const handleView = (event: Event) => {
    setSelectedEvent(event);
    setViewOpen(true);
  };

  // Open edit modal and pre-fill form with selected event data
  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setEditForm({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      status: event.status,
    });
    setEditOpen(true);
  };

  // Open delete confirmation modal for selected event
  const handleDelete = (event: Event) => {
    setSelectedEvent(event);
    setDeleteOpen(true);
  };

  // Save edited event data back to the events list
  const handleSaveEdit = () => {
    if (!selectedEvent) return;
    setEvents((prev) =>
      prev.map((e) => e.id === selectedEvent.id ? { ...e, ...editForm } : e)
    );
    setEditOpen(false);
  };

  // Remove selected event from the events list
  const handleConfirmDelete = () => {
    if (!selectedEvent) return;
    setEvents((prev) => prev.filter((e) => e.id !== selectedEvent.id));
    setDeleteOpen(false);
  };

  return (
    <div className="space-y-4 md:space-y-6">

      {/* Page header */}
      <div>
        <h1 className="text-xl md:text-3xl font-semibold text-gray-900">Event Management</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">View and manage your events</p>
      </div>

      {/* ── EVENT CARDS GRID ── */}
      {/* Responsive: 1 col on mobile, 2 cols on md and above */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
          >
            {/* Event image with status badge */}
            <div className="relative h-40 md:h-48 overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
              {/* Status badge overlay */}
              <div className="absolute top-3 right-3 md:top-4 md:right-4">
                <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                  event.status === "Upcoming"
                    ? "bg-blue-500/90 text-white"
                    : event.status === "Ongoing"
                    ? "bg-green-500/90 text-white"
                    : "bg-gray-500/90 text-white"
                }`}>
                  {event.status}
                </span>
              </div>
            </div>

            {/* Event card body */}
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">{event.title}</h3>

              {/* Event meta info */}
              <div className="mt-3 md:mt-4 space-y-2">
                <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-600">
                  <Calendar className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                  <span>{event.date} • {event.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-600">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                  <span>{event.location}</span>
                </div>
              </div>

              {/* Capacity progress bar */}
              <div className="mt-3 md:mt-4">
                <div className="flex items-center justify-between text-xs md:text-sm mb-2">
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

              {/* Registered and checked-in stats */}
              <div className="mt-3 md:mt-4 grid grid-cols-2 gap-3 md:gap-4">
                <div className="bg-blue-50 rounded-lg p-2 md:p-3">
                  <div className="text-xl md:text-2xl font-semibold text-[#4285F4]">{event.registered}</div>
                  <div className="text-xs text-gray-600">Registered</div>
                </div>
                <div className="bg-green-50 rounded-lg p-2 md:p-3">
                  <div className="text-xl md:text-2xl font-semibold text-[#34A853]">{event.checkedIn}</div>
                  <div className="text-xs text-gray-600">Checked-in</div>
                </div>
              </div>

              {/* Action buttons: View, Edit, Delete */}
              <div className="mt-3 md:mt-4 flex items-center space-x-2">
                <button
                  onClick={() => handleView(event)}
                  className="flex-1 flex items-center justify-center space-x-1 md:space-x-2 px-3 md:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Eye className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm">View</span>
                </button>
                <button
                  onClick={() => handleEdit(event)}
                  className="flex-1 flex items-center justify-center space-x-1 md:space-x-2 px-3 md:px-4 py-2 bg-[#4285F4] hover:bg-[#4285F4]/90 text-white rounded-lg transition-colors"
                >
                  <Edit className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm">Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(event)}
                  className="p-2 bg-red-50 hover:bg-red-100 text-[#EA4335] rounded-lg transition-colors"
                >
                  <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── VIEW MODAL ── */}
      <Dialog.Root open={viewOpen} onOpenChange={setViewOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl w-[calc(100%-2rem)] max-w-lg z-50 overflow-hidden">
            {selectedEvent && (
              <>
                {/* Event image header */}
                <div className="relative h-40 md:h-48 overflow-hidden">
                  <Image
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    fill
                    className="object-cover"
                  />
                  {/* Status badge */}
                  <div className="absolute top-3 right-3 md:top-4 md:right-4">
                    <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                      selectedEvent.status === "Upcoming"
                        ? "bg-blue-500/90 text-white"
                        : selectedEvent.status === "Ongoing"
                        ? "bg-green-500/90 text-white"
                        : "bg-gray-500/90 text-white"
                    }`}>
                      {selectedEvent.status}
                    </span>
                  </div>
                  {/* Close button */}
                  <Dialog.Close className="absolute top-3 left-3 md:top-4 md:left-4 p-2 bg-white/80 hover:bg-white rounded-lg transition-colors">
                    <X className="w-4 h-4 text-gray-700" />
                  </Dialog.Close>
                </div>

                {/* Modal content */}
                <div className="p-4 md:p-6">
                  <Dialog.Title className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                    {selectedEvent.title}
                  </Dialog.Title>

                  <div className="space-y-2 md:space-y-3">
                    <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-600">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 text-[#4285F4]" />
                      <span>{selectedEvent.date} • {selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-600">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4 text-[#34A853]" />
                      <span>{selectedEvent.location}</span>
                    </div>
                  </div>

                  {/* Capacity bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs md:text-sm mb-2">
                      <span className="text-gray-600">Capacity</span>
                      <span className="font-medium text-gray-900">
                        {selectedEvent.registered}/{selectedEvent.capacity}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#4285F4] to-[#34A853]"
                        style={{ width: `${(selectedEvent.registered / selectedEvent.capacity) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-4 grid grid-cols-2 gap-3 md:gap-4">
                    <div className="bg-blue-50 rounded-lg p-2 md:p-3">
                      <div className="text-xl md:text-2xl font-semibold text-[#4285F4]">{selectedEvent.registered}</div>
                      <div className="text-xs text-gray-600">Registered</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2 md:p-3">
                      <div className="text-xl md:text-2xl font-semibold text-[#34A853]">{selectedEvent.checkedIn}</div>
                      <div className="text-xs text-gray-600">Checked-in</div>
                    </div>
                  </div>

                  <Dialog.Close asChild>
                    <button className="mt-4 md:mt-6 w-full py-2 md:py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm md:text-base">
                      Close
                    </button>
                  </Dialog.Close>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* ── EDIT MODAL ── */}
      <Dialog.Root open={editOpen} onOpenChange={setEditOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-5 md:p-8 w-[calc(100%-2rem)] max-w-lg z-50">
            <div className="flex items-center justify-between mb-5 md:mb-6">
              <Dialog.Title className="text-lg md:text-xl font-semibold text-gray-900">
                Edit Event
              </Dialog.Title>
              <Dialog.Close className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
              </Dialog.Close>
            </div>

            <div className="space-y-3 md:space-y-4">
              {/* Title input */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Event Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                />
              </div>

              {/* Date and time inputs side by side */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Date</label>
                  <input
                    type="text"
                    value={editForm.date}
                    onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Time</label>
                  <input
                    type="text"
                    value={editForm.time}
                    onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Location input */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Location</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                />
              </div>

              {/* Status select */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Action buttons */}
              <div className="flex space-x-3 pt-1 md:pt-2">
                <Dialog.Close asChild>
                  <button className="flex-1 py-2 md:py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm md:text-base">
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 py-2 md:py-3 bg-gradient-to-r from-[#4285F4] to-[#4285F4]/80 text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm md:text-base"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* ── DELETE CONFIRMATION MODAL ── */}
      <Dialog.Root open={deleteOpen} onOpenChange={setDeleteOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-5 md:p-8 w-[calc(100%-2rem)] max-w-md z-50">
            <div className="flex items-center justify-between mb-5 md:mb-6">
              <Dialog.Title className="text-lg md:text-xl font-semibold text-gray-900">
                Delete Event
              </Dialog.Title>
              <Dialog.Close className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
              </Dialog.Close>
            </div>

            {/* Confirmation message */}
            <p className="text-sm md:text-base text-gray-600 mb-5 md:mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">{selectedEvent?.title}</span>?
              This action cannot be undone.
            </p>

            {/* Action buttons */}
            <div className="flex space-x-3">
              <Dialog.Close asChild>
                <button className="flex-1 py-2 md:py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm md:text-base">
                  Cancel
                </button>
              </Dialog.Close>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2 md:py-3 bg-[#EA4335] hover:bg-[#EA4335]/90 text-white rounded-lg transition-colors font-medium text-sm md:text-base"
              >
                Delete
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}