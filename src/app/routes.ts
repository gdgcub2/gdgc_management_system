import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import { EventManagerDashboard } from "./pages/EventManagerDashboard";
import { MemberDashboard } from "./pages/MemberDashboard";
import { RoleManagement } from "./pages/RoleManagement";
import { EventManagement } from "./pages/EventManagement";
import { Registration } from "./pages/Registration";
import { QRAttendance } from "./pages/QRAttendance";
import { Certificates } from "./pages/Certificates";
import { Analytics } from "./pages/Analytics";
import { AdvancedFeatures } from "./pages/AdvancedFeatures";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/dashboard",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "roles", Component: RoleManagement },
      { path: "events", Component: EventManagement },
      { path: "attendance", Component: QRAttendance },
      { path: "certificates", Component: Certificates },
      { path: "analytics", Component: Analytics },
      { path: "member", Component: MemberDashboard },
      { path: "event-manager", Component: EventManagerDashboard },
      { path: "advanced", Component: AdvancedFeatures },
    ],
  },
  {
    path: "/register/:eventId",
    Component: Registration,
  },
]);