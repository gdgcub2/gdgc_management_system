import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
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
  Settings,
  Menu,
  X,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
import { motion } from "motion/react";

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

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate("/login");
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: sidebarOpen ? 240 : 80,
        }}
        className="fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-30 overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            {sidebarOpen ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4285F4] via-[#EA4335] to-[#FBBC05] flex items-center justify-center">
                  <span className="text-white text-sm font-bold">G</span>
                </div>
                <span className="font-semibold text-gray-900">GDGC Mgmt</span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4285F4] via-[#EA4335] to-[#FBBC05] flex items-center justify-center">
                <span className="text-white text-sm font-bold">G</span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.name} to={item.href}>
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
                      <span className="text-sm font-medium truncate">
                        {item.name}
                      </span>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Toggle Button */}
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

      {/* Main Content */}
      <div
        className="transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? 240 : 80 }}
      >
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="h-full px-6 flex items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events, members..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Live Indicator */}
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-2 h-2 bg-[#34A853] rounded-full"
                />
                <span className="text-sm text-gray-600">Live</span>
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-gray-600" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#EA4335] rounded-full" />
              </button>

              {/* Settings */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>

              {/* Profile */}
              <button className="flex items-center space-x-3 pl-3 pr-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4285F4] to-[#34A853] flex items-center justify-center">
                  <span className="text-white text-sm font-medium">AD</span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">
                    Admin
                  </div>
                  <div className="text-xs text-gray-500">Super Admin</div>
                </div>
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}