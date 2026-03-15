"use client";

// React core imports
import { useState, useRef, useEffect } from "react";

// Next.js navigation imports
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Lucide icon imports for navigation, header actions, and modals
import {
  LayoutDashboard,
  Users,
  Calendar,
  QrCode,
  Award,
  BarChart3,
  UserCircle,
  Star,
  Search,
  Bell,
  Menu,
  X,
  LogOut,
  User,
  Lock,
  CheckCheck,
  CalendarClock,
  UserPlus,
  ShieldCheck,
} from "lucide-react";

// Animation library
import { motion } from "motion/react";

// Radix UI headless components for notifications, profile dropdown, and modals
import * as Popover from "@radix-ui/react-popover";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";

// Sidebar navigation links
const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Role Management", href: "/dashboard/roles", icon: Users },
  { name: "Event Management", href: "/dashboard/events", icon: Calendar },
  { name: "QR Attendance", href: "/dashboard/attendance", icon: QrCode },
  { name: "Certificates", href: "/dashboard/certificates", icon: Award },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Event Manager View", href: "/dashboard/event-manager", icon: Calendar },
  { name: "Member Profile", href: "/dashboard/member", icon: UserCircle },
  { name: "Advanced", href: "/dashboard/advanced", icon: Star },
];

// Searchable data for the global search bar — events, members, and pages
const searchData = [
  { type: "event", title: "Cloud Study Jam", subtitle: "March 15, 2026 • Google Meet", href: "/dashboard/events" },
  { type: "event", title: "Mobile Dev Workshop", subtitle: "March 10, 2026 • Tech Hub", href: "/dashboard/events" },
  { type: "event", title: "Web Dev Bootcamp", subtitle: "March 5, 2026 • Campus Hall", href: "/dashboard/events" },
  { type: "event", title: "AI/ML Workshop", subtitle: "March 20, 2026 • Online", href: "/dashboard/events" },
  { type: "event", title: "Android Workshop", subtitle: "March 20, 2026 • Lab 201", href: "/dashboard/events" },
  { type: "event", title: "Flutter Bootcamp", subtitle: "March 25, 2026 • Conference Hall", href: "/dashboard/events" },
  { type: "member", title: "Alex Morgan", subtitle: "Gold Member • 850 points", href: "/dashboard/member" },
  { type: "member", title: "John Doe", subtitle: "Silver Member • 420 points", href: "/dashboard/member" },
  { type: "member", title: "Sarah Ahmed", subtitle: "Platinum Member • 1200 points", href: "/dashboard/member" },
  { type: "page", title: "Role Management", subtitle: "Manage member roles", href: "/dashboard/roles" },
  { type: "page", title: "QR Attendance", subtitle: "Scan and track attendance", href: "/dashboard/attendance" },
  { type: "page", title: "Certificates", subtitle: "Issue and verify certificates", href: "/dashboard/certificates" },
  { type: "page", title: "Analytics", subtitle: "View event analytics", href: "/dashboard/analytics" },
];

// Sample notifications data with read/unread status
const initialNotifications = [
  { id: 1, title: "New registration for Cloud Study Jam", time: "2 min ago", read: false, icon: UserPlus, color: "text-[#4285F4]", bg: "bg-blue-50" },
  { id: 2, title: "Flutter Bootcamp is now full", time: "1 hour ago", read: false, icon: CalendarClock, color: "text-[#EA4335]", bg: "bg-red-50" },
  { id: 3, title: "Certificate issued to John Doe", time: "3 hours ago", read: false, icon: Award, color: "text-[#34A853]", bg: "bg-green-50" },
  { id: 4, title: "New member joined the club", time: "Yesterday", read: true, icon: Users, color: "text-[#FBBC05]", bg: "bg-yellow-50" },
  { id: 5, title: "Event reminder: Android Workshop tomorrow", time: "Yesterday", read: true, icon: ShieldCheck, color: "text-[#4285F4]", bg: "bg-blue-50" },
];

// Icon mapping for search result types
const typeIcon: Record<string, React.ElementType> = {
  event: Calendar,
  member: UserCircle,
  page: LayoutDashboard,
};

// Color mapping for search result type badges
const typeColor: Record<string, string> = {
  event: "text-[#4285F4] bg-blue-50",
  member: "text-[#34A853] bg-green-50",
  page: "text-[#FBBC05] bg-yellow-50",
};

export function Layout({ children }: { children: React.ReactNode }) {
  // Desktop sidebar: true = 240px wide, false = 80px collapsed
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mobile sidebar overlay: controls whether the mobile drawer is visible
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Notifications list with read/unread tracking
  const [notifications, setNotifications] = useState(initialNotifications);

  // Profile modal open states
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  // Search bar query and dropdown visibility
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  // Ref for detecting clicks outside the search dropdown
  const searchRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  // Count unread notifications for the badge
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Filter search results based on current query
  const searchResults = searchQuery.trim().length > 0
    ? searchData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Close search dropdown when user clicks outside the search area
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mark all notifications as read and remove unread dots
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Navigate to login page on logout
  const handleLogout = () => {
    router.push("/login");
  };

  // Handle search result selection — navigate and close dropdown
  const handleSelectResult = (href: string) => {
    setSearchQuery("");
    setSearchOpen(false);
    router.push(href);
  };

  // Close mobile sidebar when a nav link is clicked
  const handleMobileNavClick = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── MOBILE SIDEBAR BACKDROP ── */}
      {/* Dark overlay shown behind sidebar on mobile when open */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ── DESKTOP SIDEBAR ── */}
      {/* Hidden on mobile, always visible on md and above */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 240 : 80 }}
        className="hidden md:flex fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-30 overflow-hidden flex-col"
      >
        <div className="flex flex-col h-full">

          {/* Sidebar logo and brand name */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            {sidebarOpen ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4285F4] via-[#EA4335] to-[#FBBC05] flex items-center justify-center">
                  <span className="text-white text-sm font-bold">G</span>
                </div>
                <span className="font-semibold text-gray-900">GDGC Management</span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4285F4] via-[#EA4335] to-[#FBBC05] flex items-center justify-center">
                <span className="text-white text-sm font-bold">G</span>
              </div>
            )}
          </div>

          {/* Desktop navigation links */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#4285F4] text-white shadow-lg shadow-blue-500/30"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && (
                      <span className="text-sm font-medium truncate">{item.name}</span>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Desktop sidebar collapse/expand toggle button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-12 flex items-center justify-center border-t border-gray-200 hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </motion.aside>

      {/* ── MOBILE SIDEBAR OVERLAY ── */}
      {/* Slides in from the left on mobile when hamburger is clicked */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 z-50 flex flex-col transform transition-transform duration-300 md:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile sidebar header with logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4285F4] via-[#EA4335] to-[#FBBC05] flex items-center justify-center">
              <span className="text-white text-sm font-bold">G</span>
            </div>
            <span className="font-semibold text-gray-900">GDGC Management</span>
          </div>
        </div>

        {/* Mobile navigation links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} onClick={handleMobileNavClick}>
                <div
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#4285F4] text-white shadow-lg shadow-blue-500/30"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Mobile sidebar close button */}
        <button
          onClick={() => setMobileSidebarOpen(false)}
          className="h-12 flex items-center justify-center border-t border-gray-200 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
          <span className="ml-2 text-sm text-gray-600">Close</span>
        </button>
      </div>

      {/* ── MAIN CONTENT AREA ── */}
      {/* On mobile: no left margin. On desktop: margin matches sidebar width */}
      <div
  className={`transition-all duration-300 ${
    sidebarOpen ? "md:ml-[240px]" : "md:ml-[80px]"
  }`}
>
        {/* ── TOP HEADER BAR ── */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="h-full px-3 md:px-6 flex items-center justify-between gap-2">

            {/* Hamburger button — visible only on mobile */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden flex-shrink-0"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            {/* ── SEARCH BAR ── */}
            {/* Hidden on mobile to save space, visible on md and above */}
            <div className="hidden md:flex flex-1 max-w-lg relative" ref={searchRef}>
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  placeholder="Search events, members..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                />
                {/* Clear search button */}
                {searchQuery && (
                  <button
                    onClick={() => { setSearchQuery(""); setSearchOpen(false); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Search results dropdown */}
              {searchOpen && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden max-h-80 overflow-y-auto">
                  {searchResults.map((result, index) => {
                    const Icon = typeIcon[result.type];
                    return (
                      <button
                        key={index}
                        onClick={() => handleSelectResult(result.href)}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${typeColor[result.type]}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{result.title}</div>
                          <div className="text-xs text-gray-500">{result.subtitle}</div>
                        </div>
                        <span className="ml-auto text-xs text-gray-400 capitalize">{result.type}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* No results message */}
              {searchOpen && searchQuery.trim().length > 0 && searchResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 px-4 py-6 text-center">
                  <p className="text-sm text-gray-500">
                    No results found for &quot;<span className="font-medium">{searchQuery}</span>&quot;
                  </p>
                </div>
              )}
            </div>

            {/* ── RIGHT HEADER SECTION ── */}
            <div className="flex items-center space-x-1 md:space-x-4 ml-auto">

              {/* Live indicator — hidden on mobile */}
              <div className="hidden md:flex items-center space-x-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-2 h-2 bg-[#34A853] rounded-full"
                />
                <span className="text-sm text-gray-600">Live</span>
              </div>

              {/* ── NOTIFICATIONS POPOVER ── */}
              <Popover.Root>
                <Popover.Trigger asChild>
                  <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell className="w-5 h-5 text-gray-600" />
                    {/* Unread count badge */}
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#EA4335] text-white text-xs rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content align="end" sideOffset={8} className="w-72 md:w-80 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                    {/* Notifications header with mark all as read */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      <button onClick={markAllAsRead} className="flex items-center space-x-1 text-xs text-[#4285F4] hover:underline">
                        <CheckCheck className="w-3 h-3" />
                        <span>Mark all as read</span>
                      </button>
                    </div>
                    {/* Notifications list */}
                    <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="flex items-start space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                          <div className={`w-8 h-8 rounded-full ${notification.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <notification.icon className={`w-4 h-4 ${notification.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 leading-snug">{notification.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{notification.time}</p>
                          </div>
                          {/* Unread blue dot indicator */}
                          {!notification.read && (
                            <div className="w-2 h-2 bg-[#4285F4] rounded-full flex-shrink-0 mt-1.5" />
                          )}
                        </div>
                      ))}
                    </div>
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>

              {/* ── PROFILE DROPDOWN ── */}
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="flex items-center space-x-2 md:space-x-3 pl-2 md:pl-3 pr-2 md:pr-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                    {/* Avatar circle */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4285F4] to-[#34A853] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-medium">AD</span>
                    </div>
                    {/* Name and role — hidden on mobile */}
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium text-gray-900">Admin</div>
                      <div className="text-xs text-gray-500">Super Admin</div>
                    </div>
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content align="end" sideOffset={8} className="w-56 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden py-2">
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="font-semibold text-gray-900 text-sm">Admin</div>
                      <div className="text-xs text-gray-500">admin@gdgc.com</div>
                    </div>
                    {/* Edit profile option */}
                    <DropdownMenu.Item
                      onSelect={() => setEditProfileOpen(true)}
                      className="flex items-center space-x-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer outline-none"
                    >
                      <User className="w-4 h-4 text-gray-500" />
                      <span>Edit Profile</span>
                    </DropdownMenu.Item>
                    {/* Change password option */}
                    <DropdownMenu.Item
                      onSelect={() => setChangePasswordOpen(true)}
                      className="flex items-center space-x-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer outline-none"
                    >
                      <Lock className="w-4 h-4 text-gray-500" />
                      <span>Change Password</span>
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className="my-1 h-px bg-gray-100" />
                    {/* Logout option */}
                    <DropdownMenu.Item
                      onSelect={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2.5 text-sm text-[#EA4335] hover:bg-red-50 cursor-pointer outline-none"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>

            </div>
          </div>
        </header>

        {/* Page content rendered here */}
        <main className="p-3 md:p-6">{children}</main>
      </div>

      {/* ── EDIT PROFILE MODAL ── */}
      <Dialog.Root open={editProfileOpen} onOpenChange={setEditProfileOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md z-50 mx-4">
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-xl font-semibold text-gray-900">Edit Profile</Dialog.Title>
              <Dialog.Close className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </Dialog.Close>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" defaultValue="Admin" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" defaultValue="admin@gdgc.com" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <input type="text" defaultValue="Super Admin" readOnly className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea rows={3} placeholder="Write a short bio..." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent resize-none" />
              </div>
              <div className="flex space-x-3 pt-2">
                <Dialog.Close asChild>
                  <button className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">Cancel</button>
                </Dialog.Close>
                <button onClick={() => setEditProfileOpen(false)} className="flex-1 py-3 bg-gradient-to-r from-[#4285F4] to-[#4285F4]/80 text-white rounded-lg hover:opacity-90 transition-opacity font-medium">Save Changes</button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* ── CHANGE PASSWORD MODAL ── */}
      <Dialog.Root open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md z-50 mx-4">
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-xl font-semibold text-gray-900">Change Password</Dialog.Title>
              <Dialog.Close className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </Dialog.Close>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input type="password" placeholder="Enter current password" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input type="password" placeholder="Enter new password" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input type="password" placeholder="Confirm new password" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent" />
              </div>
              <div className="flex space-x-3 pt-2">
                <Dialog.Close asChild>
                  <button className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">Cancel</button>
                </Dialog.Close>
                <button onClick={() => setChangePasswordOpen(false)} className="flex-1 py-3 bg-gradient-to-r from-[#4285F4] to-[#4285F4]/80 text-white rounded-lg hover:opacity-90 transition-opacity font-medium">Update Password</button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </div>
  );
}