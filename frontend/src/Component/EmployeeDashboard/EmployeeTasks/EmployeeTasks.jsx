
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function EmployeeTasks() {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // For filtering by status
  const navigate = useNavigate()
  // Function to fetch and update tasks
  const fetchAndUpdateTasks = async () => {
    try {
        const token = localStorage.getItem('token'); // or however you store your token
        if (!token) {
            navigate("/login");
            return;
          }
  
          // Add a check for token validity
          if (token === 'undefined' || token === null) {
            navigate("/login");
            return;
          }
        const res = await axios.get("http://localhost:5000/employeetasks", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      
      if (res.status !== 200) {
        console.error(`Error fetching tasks: ${res.statusText}`);
        return;
      }
  
      const now = new Date();
      const updatedTasks = res.data.map(async (task) => {
        if (new Date(task.deadline) < now && task.status !== "completed") {
          await axios.put(`http://localhost:5000/tasks/${task._id}`, {
            status: "missing",
          });
          task.status = "missing";
        }
        return task;
      });
  
      const tasksWithUpdatedStatus = await Promise.all(updatedTasks);
      setTasks(tasksWithUpdatedStatus);
    } catch (error) {
      console.error("Failed to fetch and update tasks:", error);
    }
  };
  
  

  useEffect(() => {
    fetchAndUpdateTasks();
  }, []);

  // Search and filter tasks
  const filteredTasks = tasks.filter((task) => {
    const title = task.title?.toLowerCase() || "";
    const name = task.employee_id?.user_id.name?.toLowerCase() || "";
    const email = task.employee_id?.user_id.email?.toLowerCase() || "";
    const status = task.status?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();

    return (
      (title.includes(query) ||
        name.includes(query) ||
        email.includes(query)) &&
      (statusFilter ? status === statusFilter.toLowerCase() : true)
    );
  });

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

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

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-800">Manage Tasks</h2>
      <p className="mt-4 text-gray-600">Add, update, or delete tasks.</p>

      <div className="mt-6 flex justify-between items-center">
        <Link
          to="/add/task"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <FaPlus className="inline mr-2" /> Add Task
        </Link>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-md shadow-sm"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="missing">Missing</option>
        </select>
      </div>

      {/* Search Input */}
      <div className="mt-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by task title, employee name, or email..."
          className="px-4 py-2 w-full border rounded-md shadow-sm"
        />
      </div>

      {/* Tasks Table */}
      <div className="mt-6 space-y-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Deadline
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.length > 0 ? (
              currentTasks.map((task) => (
                <tr key={task._id}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {task._id}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {task.title}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {task.description}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {task.deadline
                      ? new Date(task.deadline).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {task.status || "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <div className="flex space-x-2">
                      <Link
                        to={`/employeeupdatetaskstatus/${task._id}`}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                      >
                        <FaEdit className="inline" /> Change Status
                      </Link>

                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="py-2 px-4 border-b border-gray-200 text-center text-gray-600"
                >
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {renderPagination()}
      </div>
    </div>
  );    
}

export default EmployeeTasks;
