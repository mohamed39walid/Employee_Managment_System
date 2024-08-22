import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Deletetask() {
  const [task, setTask] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getTask = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tasks/${id}`);
      setTask(response.data);
    } catch (error) {
      console.error("Failed to fetch task data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      console.log("Task deleted successfully");
      navigate("/admindashboard"); // Redirect after successful deletion
    } catch (error) {
      console.error("There was an error deleting the task!", error);
      setError("There was an error deleting the task. Please try again.");
    }
  };

  useEffect(() => {
    getTask();
  }, [id]);

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
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Delete Task</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-6">
          <p className="text-lg font-semibold">Task Details:</p>
          <p><strong>Task Name:</strong> {task.title || "N/A"}</p>
          <p><strong>Description:</strong> {task.description || "N/A"}</p>
          <p><strong>Due Date:</strong> {task.deadline || "N/A"}</p>
          <p><strong>Status:</strong> {task.status || "N/A"}</p>
          <p><strong>Assigned Employee:</strong> {task.employee_id?.user_id?.email || "N/A"}</p>
        </div>
        <div>
          <p className="text-red-500 mb-4">Are you sure you want to delete this task?</p>
          <button
            onClick={handleDelete}
            className="w-full py-3 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default Deletetask;
