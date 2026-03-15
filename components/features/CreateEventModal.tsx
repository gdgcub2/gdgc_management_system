"use client";

// React hooks
import { useState } from "react";

// Radix UI components for modal, tabs, slider, and toggle
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import * as Slider from "@radix-ui/react-slider";
import * as Switch from "@radix-ui/react-switch";

// Shape of a new event created from the modal
export interface NewEvent {
  title: string;
  description: string;
  date: string;
  time: string;
  capacity: number;
  autoClose: boolean;
}

// Props for the modal — open state and callbacks
interface CreateEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateEvent?: (event: NewEvent) => void;
}

export function CreateEventModal({ open, onOpenChange, onCreateEvent }: CreateEventModalProps) {
  // Capacity slider value
  const [capacity, setCapacity] = useState([100]);

  // Auto-close registration toggle
  const [autoClose, setAutoClose] = useState(false);

  // Form field values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Reset form fields to defaults
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setCapacity([100]);
    setAutoClose(false);
  };

  // Handle create button — pass new event data to parent and close modal
  const handleCreate = () => {
    if (onCreateEvent) {
      onCreateEvent({
        title: title || "Untitled Event",
        description,
        date: date || "TBD",
        time: time || "TBD",
        capacity: capacity[0],
        autoClose,
      });
    }
    resetForm();
    onOpenChange(false);
  };

  // Handle cancel — reset form and close
  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <Dialog.Title className="text-2xl font-semibold text-gray-900">
              Create New Event
            </Dialog.Title>

            {/* Tabs: Basic Info, Capacity, Registration */}
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

              {/* Basic Info Tab */}
              <Tabs.Content value="basic" className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter event title"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter event description"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                    />
                  </div>
                </div>
              </Tabs.Content>

              {/* Capacity Tab */}
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

              {/* Registration Tab */}
              <Tabs.Content value="registration" className="mt-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Auto-close Registration</div>
                    <div className="text-sm text-gray-600">Close when capacity is reached</div>
                  </div>
                  <Switch.Root
                    checked={autoClose}
                    onCheckedChange={setAutoClose}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      autoClose ? "bg-[#4285F4]" : "bg-gray-300"
                    }`}
                  >
                    <Switch.Thumb className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      autoClose ? "translate-x-6" : "translate-x-1"
                    }`} />
                  </Switch.Root>
                </div>
              </Tabs.Content>
            </Tabs.Root>

            {/* Action buttons */}
            <div className="mt-6 flex items-center justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-gradient-to-r from-[#4285F4] to-[#4285F4]/80 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Create Event
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}