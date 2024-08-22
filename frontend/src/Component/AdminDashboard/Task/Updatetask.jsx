import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Updatetask() {
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    description: "",
    deadline: "",
    status: "pending",
    employee_id: { name: "", email: "" },
  });
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch task data
  const getTask = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/tasks/${id}`);
      
      const formattedDeadline = new Date(res.data.deadline).toISOString().split('T')[0];
      
      setData({
        ...res.data,
        deadline: formattedDeadline,
      });
      
      setError("");
    } catch (error) {
      console.error("Failed to fetch task data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch employees data
  const getEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employee");
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getTask();
        await getEmployees();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    setFilteredEmployees(
      employees.filter((employee) =>
        employee.user_id.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, employees]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!data.employee_id || !data.title || !data.description || !data.deadline) {
      setError("All fields are required.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, data);
      console.log("updated successfully")
      navigate("/admindashboard"); // Redirect after successful update
    } catch (error) {
      console.error("There was an error updating the task!", error);
      setError("There was an error updating the task. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg border border-gray-200 p-6 space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline mb-4"
        >
          &larr; Back
        </button>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Update Task</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-6">
          <p className="text-lg font-semibold">Task Details:</p>
          <p><strong>Task Name:</strong> {data.title || "N/A"}</p>
          <p><strong>Description:</strong> {data.description || "N/A"}</p>
          <p><strong>Due Date:</strong> {data.deadline || "N/A"}</p>
          <p><strong>Status:</strong> {data.status || "N/A"}</p>
          <p><strong>Assigned Employee:</strong> {data.employee_id?.user_id.email || "N/A"}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Task Name</label>
            <input
              type="text"
              name="title"
              value={data.title || ""}
              onChange={handleChange}
              required
              className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
            <textarea
              name="description"
              value={data.description || ""}
              onChange={handleChange}
              required
              className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Due Date</label>
            <input
              type="date"
              name="deadline"
              value={data.deadline || ""}
              onChange={handleChange}
              required
              className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
            <select
              name="status"
              value={data.status || ""}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Select Employee</label>
            <input
              type="text"
              placeholder="Search employee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="employee_id"
              value={data.employee_id._id || ""}
              onChange={(e) => setData({ ...data, employee_id: { _id: e.target.value } })}
              className="block w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select an employee
              </option>
              {filteredEmployees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.user_id.email}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default Updatetask;
