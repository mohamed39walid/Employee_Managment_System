import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";


function AddMeeting() {
  const [employees, setEmployees] = useState([]);
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    participants: [], // Ensure this matches your backend expectation
  });
  const [error, setError] = useState("");


  const navigate = useNavigate();

  // Fetch employees for the dropdown
  const getEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employee");
      const employeeOptions = response.data.map(employee => ({
        value: employee._id,
        label: `${employee.user_id.name} (${employee.user_id.email})`
      }));
      setEmployees(employeeOptions);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError("Error fetching employees.");
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMeeting((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setNewMeeting((prev) => ({
      ...prev,
      participants: selectedValues, // Update field name to match backend
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/meetings", newMeeting);
      setNewMeeting({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        participants: [],
      });
      navigate("/admindashboard");

      // Optionally, redirect or display a success message
    } catch (error) {
      console.error("Error creating meeting:", error);
      setError("Error creating meeting.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-800">Add New Meeting</h2>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-gray-700">Meeting Title</label>
          <input
            type="text"
            name="title"
            value={newMeeting.title}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 bg-gray-100 rounded-md"
            placeholder="Enter meeting title"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={newMeeting.description}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 bg-gray-100 rounded-md"
            placeholder="Enter meeting description"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={newMeeting.date}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 bg-gray-100 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Time</label>
          <input
            type="time"
            name="time"
            value={newMeeting.time}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 bg-gray-100 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={newMeeting.location}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 bg-gray-100 rounded-md"
            placeholder="Enter meeting location"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Select Employees</label>
          <Select
            isMulti
            name="participants"
            options={employees}
            value={employees.filter(employee => newMeeting.participants && newMeeting.participants.includes(employee.value))}
            onChange={handleSelectChange}
            className="w-full mt-1"
            placeholder="Select employees"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Meeting
        </button>
      </form>
    </div>
  );
}

export default AddMeeting;
