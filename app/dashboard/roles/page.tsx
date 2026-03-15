"use client";

// Animation library
import { motion } from "motion/react";

// Lucide icons
import { Shield, Settings, Users, X } from "lucide-react";

// React hooks
import { useState } from "react";

// Radix UI components for toggles and modals
import * as Switch from "@radix-ui/react-switch";
import * as Dialog from "@radix-ui/react-dialog";

// Role definitions with colors and permissions
const initialRoles = [
  {
    name: "Super Admin",
    description: "Full access to all features and settings",
    color: "from-[#EA4335] to-[#EA4335]/80",
    userCount: 3,
    permissions: ["all"],
  },
  {
    name: "Event Manager",
    description: "Manage events, attendance, and certificates",
    color: "from-[#4285F4] to-[#4285F4]/80",
    userCount: 12,
    permissions: ["events", "attendance", "certificates"],
  },
  {
    name: "Member",
    description: "View events and personal dashboard",
    color: "from-[#34A853] to-[#34A853]/80",
    userCount: 1269,
    permissions: ["view_events", "register"],
  },
];

// All available permissions with labels and descriptions
const permissionsList = [
  { id: "manage_users", name: "Manage Users", description: "Add, edit and remove users" },
  { id: "create_events", name: "Create Events", description: "Create new club events" },
  { id: "edit_events", name: "Edit Events", description: "Modify existing events" },
  { id: "delete_events", name: "Delete Events", description: "Remove events permanently" },
  { id: "scan_qr", name: "Scan QR Codes", description: "Scan attendance QR codes" },
  { id: "issue_certificates", name: "Issue Certificates", description: "Generate and send certificates" },
  { id: "view_analytics", name: "View Analytics", description: "Access analytics dashboard" },
  { id: "manage_roles", name: "Manage Roles", description: "Edit roles and permissions" },
];

// Default permissions per role — used to initialize the permission matrix
const defaultPermissions: Record<string, string[]> = {
  "Super Admin": permissionsList.map((p) => p.id),
  "Event Manager": ["create_events", "edit_events", "scan_qr", "issue_certificates", "view_analytics"],
  "Member": [],
};

// Sample users for the user assignment section
const users = [
  { name: "John Doe", email: "john@example.com", role: "Super Admin" },
  { name: "Jane Smith", email: "jane@example.com", role: "Event Manager" },
  { name: "Bob Johnson", email: "bob@example.com", role: "Event Manager" },
  { name: "Alice Williams", email: "alice@example.com", role: "Member" },
];

// TypeScript type for a role object
type Role = typeof initialRoles[0];

export default function RoleManagementPage() {
  // Permission matrix — tracks active permissions per role
  const [permissionMatrix, setPermissionMatrix] = useState(defaultPermissions);

  // Currently selected role for the settings modal
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // Controls whether the role settings modal is open
  const [roleModalOpen, setRoleModalOpen] = useState(false);

  // Temporary permissions edited inside modal — not saved until user clicks Save
  const [tempPermissions, setTempPermissions] = useState<string[]>([]);

  // Open the role settings modal and load current permissions into temp state
  const handleOpenRoleModal = (role: Role) => {
    setSelectedRole(role);
    setTempPermissions([...permissionMatrix[role.name]]);
    setRoleModalOpen(true);
  };

  // Toggle a permission in the modal temp state
  const toggleTempPermission = (permissionId: string) => {
    setTempPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((p) => p !== permissionId)
        : [...prev, permissionId]
    );
  };

  // Save modal permissions to the main permission matrix
  const handleSavePermissions = () => {
    if (!selectedRole) return;
    setPermissionMatrix((prev) => ({
      ...prev,
      [selectedRole.name]: tempPermissions,
    }));
    setRoleModalOpen(false);
  };

  // Toggle a permission directly in the permission matrix table
  const togglePermission = (role: string, permissionId: string) => {
    setPermissionMatrix((prev) => {
      const rolePerms = prev[role as keyof typeof prev];
      const hasPermission = rolePerms.includes(permissionId);
      return {
        ...prev,
        [role]: hasPermission
          ? rolePerms.filter((p) => p !== permissionId)
          : [...rolePerms, permissionId],
      };
    });
  };

  return (
    <div className="space-y-4 md:space-y-6">

      {/* Page header */}
      <div>
        <h1 className="text-xl md:text-3xl font-semibold text-gray-900">Role Management</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">Manage user roles and permissions</p>
      </div>

      {/* ── ROLE CARDS ── */}
      {/* Responsive: 1 col on mobile, 3 cols on md */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {initialRoles.map((role, index) => (
          <motion.div
            key={role.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-5 md:p-6 border border-gray-200 shadow-sm relative overflow-hidden"
          >
            {/* Color accent bar at the top */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${role.color}`} />

            <div className="flex items-start justify-between">
              {/* Role icon */}
              <div className={`p-2 md:p-3 rounded-xl bg-gradient-to-br ${role.color} shadow-lg`}>
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              {/* Settings icon — opens role modal */}
              <button
                onClick={() => handleOpenRoleModal(role)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
              </button>
            </div>

            <div className="mt-3 md:mt-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">{role.name}</h3>
              <p className="text-xs md:text-sm text-gray-600 mt-1">{role.description}</p>
            </div>

            <div className="mt-3 md:mt-4 flex items-center justify-between">
              {/* User count */}
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm">{role.userCount} users</span>
              </div>
              {/* Manage Role button — opens role modal */}
              <button
                onClick={() => handleOpenRoleModal(role)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium text-white bg-gradient-to-r ${role.color} hover:opacity-90 transition-opacity`}
              >
                Manage Role
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── PERMISSION MATRIX TABLE ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm"
      >
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Permission Matrix</h2>
        {/* Horizontally scrollable on mobile */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-gray-700">Permission</th>
                {initialRoles.map((role) => (
                  <th key={role.name} className="text-center py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-gray-700">
                    {role.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionsList.map((permission, index) => (
                <tr
                  key={permission.id}
                  className={`border-b border-gray-100 ${index % 2 === 0 ? "bg-gray-50/50" : ""}`}
                >
                  <td className="py-3 md:py-4 px-3 md:px-4 text-xs md:text-sm text-gray-900">{permission.name}</td>
                  {initialRoles.map((role) => {
                    const hasPermission = permissionMatrix[role.name]?.includes(permission.id);
                    return (
                      <td key={role.name} className="py-3 md:py-4 px-3 md:px-4 text-center">
                        <Switch.Root
                          checked={hasPermission}
                          onCheckedChange={() => togglePermission(role.name, permission.id)}
                          className={`relative inline-flex h-5 w-9 md:h-6 md:w-11 items-center rounded-full transition-colors ${
                            hasPermission
                              ? role.name === "Super Admin"
                                ? "bg-[#EA4335]"
                                : role.name === "Event Manager"
                                ? "bg-[#4285F4]"
                                : "bg-[#34A853]"
                              : "bg-gray-300"
                          }`}
                        >
                          <Switch.Thumb
                            className={`inline-block h-4 w-4 md:h-5 md:w-5 transform rounded-full bg-white transition-transform ${
                              hasPermission ? "translate-x-5 md:translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </Switch.Root>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ── USER ASSIGNMENT SECTION ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">User Assignment</h2>
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="pl-9 md:pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent w-full sm:w-auto"
            />
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="space-y-3">
          {users.map((user, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3 md:space-x-4">
                {/* User avatar */}
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${
                  user.role === "Super Admin"
                    ? "from-[#EA4335] to-[#EA4335]/80"
                    : user.role === "Event Manager"
                    ? "from-[#4285F4] to-[#4285F4]/80"
                    : "from-[#34A853] to-[#34A853]/80"
                } flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-medium text-sm">
                    {user.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm md:text-base">{user.name}</div>
                  <div className="text-xs md:text-sm text-gray-600">{user.email}</div>
                </div>
              </div>
              {/* Role selector */}
              <select className="px-2 md:px-4 py-1.5 md:py-2 bg-white border border-gray-200 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent">
                <option value="Super Admin">Super Admin</option>
                <option value="Event Manager">Event Manager</option>
                <option value="Member">Member</option>
              </select>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── ROLE SETTINGS MODAL ── */}
      <Dialog.Root open={roleModalOpen} onOpenChange={setRoleModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl w-[calc(100%-2rem)] max-w-lg max-h-[90vh] overflow-y-auto z-50">
            {selectedRole && (
              <div className="p-5 md:p-8">

                {/* Modal header with role info */}
                <div className="flex items-center justify-between mb-5 md:mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${selectedRole.color}`}>
                      <Shield className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div>
                      <Dialog.Title className="text-lg md:text-xl font-semibold text-gray-900">
                        {selectedRole.name}
                      </Dialog.Title>
                      <p className="text-xs md:text-sm text-gray-500">{selectedRole.description}</p>
                    </div>
                  </div>
                  <Dialog.Close className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <X className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                  </Dialog.Close>
                </div>

                {/* Permissions toggles */}
                <div className="mb-5 md:mb-6">
                  <h3 className="text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 md:mb-4">
                    Permissions
                  </h3>
                  <div className="space-y-2 md:space-y-3">
                    {permissionsList.map((permission) => {
                      const isEnabled = tempPermissions.includes(permission.id);
                      return (
                        <div
                          key={permission.id}
                          className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-xl"
                        >
                          <div>
                            <div className="font-medium text-gray-900 text-xs md:text-sm">
                              {permission.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {permission.description}
                            </div>
                          </div>
                          <Switch.Root
                            checked={isEnabled}
                            onCheckedChange={() => toggleTempPermission(permission.id)}
                            className={`relative inline-flex h-5 w-9 md:h-6 md:w-11 items-center rounded-full transition-colors flex-shrink-0 ml-3 ${
                              isEnabled
                                ? selectedRole.name === "Super Admin"
                                  ? "bg-[#EA4335]"
                                  : selectedRole.name === "Event Manager"
                                  ? "bg-[#4285F4]"
                                  : "bg-[#34A853]"
                                : "bg-gray-300"
                            }`}
                          >
                            <Switch.Thumb
                              className={`inline-block h-4 w-4 md:h-5 md:w-5 transform rounded-full bg-white transition-transform ${
                                isEnabled ? "translate-x-5 md:translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </Switch.Root>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-3">
                  <Dialog.Close asChild>
                    <button className="flex-1 py-2 md:py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm md:text-base">
                      Cancel
                    </button>
                  </Dialog.Close>
                  <button
                    onClick={handleSavePermissions}
                    className={`flex-1 py-2 md:py-3 text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm md:text-base bg-gradient-to-r ${selectedRole.color}`}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}