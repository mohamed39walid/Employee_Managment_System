import React, { useEffect, useState } from "react";
import { FaUser, FaTasks, FaHome, FaCalendarAlt, FaCogs } from "react-icons/fa";
import Meetings from "./Meeting/Meetings"; // Import the new Meetings component
import Employees from "./Employees";
import Tasks from "./Tasks";
import axios from "axios";
import AccountSettings from "../AccountSettings";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;
  const tasksPerPage = 5;

  const getEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/employee");
      setEmployees(res.data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  const getTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    getEmployees();
    getTasks();
  }, []);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.user_id.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.user_id.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTasks = tasks.filter(
    (task) =>
      task.employee_id.user_id.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center mt-4 space-x-2">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-4 py-2 border rounded-md ${
              currentPage === number
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600"
            } hover:bg-blue-600 hover:text-white transition duration-300`}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800">Welcome, Admin!</h2>
            <p className="mt-4 text-gray-600">
              This is your admin dashboard. Use the sidebar to navigate through the different management sections.
            </p>
          </div>
        );
      case "employees":
        return (
          <div>
            <Employees
              employees={filteredEmployees}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        );
      case "tasks":
        return (
          <div>
            <Tasks tasks={currentTasks} />

          </div>
        );
      case "meetings":
        return (
          <div>
            <Meetings />
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
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
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
                activeSection === "employees" ? "bg-blue-700" : ""
              }`}
              onClick={() => setActiveSection("employees")}
            >
              <FaUser className="inline mr-2" />
              Employees
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

export default AdminDashboard;
