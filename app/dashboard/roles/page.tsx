"use client";

import { motion } from "motion/react";
import { Shield, Settings, Users } from "lucide-react";
import { useState } from "react";
import * as Switch from "@radix-ui/react-switch";

const roles = [
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

const permissions = [
  { id: "manage_users", name: "Manage Users" },
  { id: "create_events", name: "Create Events" },
  { id: "edit_events", name: "Edit Events" },
  { id: "delete_events", name: "Delete Events" },
  { id: "scan_qr", name: "Scan QR Codes" },
  { id: "issue_certificates", name: "Issue Certificates" },
  { id: "view_analytics", name: "View Analytics" },
  { id: "manage_roles", name: "Manage Roles" },
];

const users = [
  { name: "John Doe", email: "john@example.com", role: "Super Admin" },
  { name: "Jane Smith", email: "jane@example.com", role: "Event Manager" },
  { name: "Bob Johnson", email: "bob@example.com", role: "Event Manager" },
  { name: "Alice Williams", email: "alice@example.com", role: "Member" },
];

export default function RoleManagementPage() {
  const [permissionMatrix, setPermissionMatrix] = useState({
    "Super Admin": permissions.map((p) => p.id),
    "Event Manager": [
      "create_events",
      "edit_events",
      "scan_qr",
      "issue_certificates",
      "view_analytics",
    ],
    Member: [],
  });

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Role Management
        </h1>
        <p className="text-gray-600 mt-1">
          Manage user roles and permissions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role, index) => (
          <motion.div
            key={role.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative overflow-hidden"
          >
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${role.color}`}
            />

            <div className="flex items-start justify-between">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${role.color} shadow-lg`}
              >
                <Shield className="w-6 h-6 text-white" />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {role.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{role.description}</p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span className="text-sm">{role.userCount} users</span>
              </div>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r ${role.color} hover:opacity-90 transition-opacity`}
              >
                Manage Role
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Permission Matrix
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  Permission
                </th>
                {roles.map((role) => (
                  <th
                    key={role.name}
                    className="text-center py-3 px-4 text-sm font-medium text-gray-700"
                  >
                    {role.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((permission, index) => (
                <tr
                  key={permission.id}
                  className={`border-b border-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50/50" : ""
                  }`}
                >
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {permission.name}
                  </td>
                  {roles.map((role) => {
                    const hasPermission = permissionMatrix[
                      role.name as keyof typeof permissionMatrix
                    ].includes(permission.id);

                    return (
                      <td key={role.name} className="py-4 px-4 text-center">
                        <Switch.Root
                          checked={hasPermission}
                          onCheckedChange={() =>
                            togglePermission(role.name, permission.id)
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
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
                            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                              hasPermission ? "translate-x-6" : "translate-x-1"
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            User Assignment
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
            />
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="space-y-3">
          {users.map((user, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                    user.role === "Super Admin"
                      ? "from-[#EA4335] to-[#EA4335]/80"
                      : user.role === "Event Manager"
                      ? "from-[#4285F4] to-[#4285F4]/80"
                      : "from-[#34A853] to-[#34A853]/80"
                  } flex items-center justify-center`}
                >
                  <span className="text-white font-medium">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                </div>
              </div>
              <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent">
                <option value="Super Admin">Super Admin</option>
                <option value="Event Manager">Event Manager</option>
                <option value="Member">Member</option>
              </select>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

