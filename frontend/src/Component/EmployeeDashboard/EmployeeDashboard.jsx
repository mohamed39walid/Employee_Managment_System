import React, { useState } from "react";
import { FaTasks, FaCalendarAlt, FaCogs, FaHome } from "react-icons/fa";
import Tasks from "../AdminDashboard/Tasks";
import Meetings from "../AdminDashboard/Meeting/Meetings";
import AccountSettings from "../AccountSettings";
import EmployeeTasks from "./EmployeeTasks/EmployeeTasks";
import EmployeeMeetings from "./EmployeeMeetings/EmployeeMeetings";

function EmployeeDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800">Welcome!</h2>
            <p className="mt-4 text-gray-600">
              This is your employee dashboard. Use the sidebar to navigate through your tasks, meetings, and account settings.
            </p>
          </div>
        );
      case "tasks":
        return (
          <div>
            <EmployeeTasks />
          </div>
        );
      case "meetings":
        return (
          <div>
            <EmployeeMeetings />
          </div>
        );
      case "settings":
        return (
          <div>
            <AccountSettings />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Employee Dashboard</h1>
        </div>
        <nav className="mt-6">
          <ul>
            <li
              className={`px-4 py-2 cursor-pointer ${
                activeSection === "dashboard" ? "bg-blue-700" : ""
              }`}
              onClick={() => setActiveSection("dashboard")}
            >
              <FaHome className="inline mr-2" />
              Dashboard
            </li>
            <li
              className={`px-4 py-2 cursor-pointer ${
                activeSection === "tasks" ? "bg-blue-700" : ""
              }`}
              onClick={() => setActiveSection("tasks")}
            >
              <FaTasks className="inline mr-2" />
              Tasks
            </li>
            <li
              className={`px-4 py-2 cursor-pointer ${
                activeSection === "meetings" ? "bg-blue-700" : ""
              }`}
              onClick={() => setActiveSection("meetings")}
            >
              <FaCalendarAlt className="inline mr-2" />
              Meetings
            </li>
            <li
              className={`px-4 py-2 cursor-pointer ${
                activeSection === "settings" ? "bg-blue-700" : ""
              }`}
              onClick={() => setActiveSection("settings")}
            >
              <FaCogs className="inline mr-2" />
              Account Settings
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
}

export default EmployeeDashboard;
