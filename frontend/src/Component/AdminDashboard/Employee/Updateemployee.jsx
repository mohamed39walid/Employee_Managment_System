import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateEmployee() {
  const { id } = useParams();
  const [data, setData] = useState({
    salary: "",
    position: "",
    contactnumber: "",
    address: "",
    status: "active",
    user_id: { name: "", email: "" },
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch employee data
  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/employee/get/${id}`);
      setData(res.data);
      setError("");
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Update employee data
  const updateData = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/employee/update/${id}`, data);
      navigate("/admindashboard"); // Redirect after successful update
    } catch (error) {
      console.error("Failed to update data:", error);
      setError("Failed to update data. Please try again later.");
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">Loading...</div>;
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
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Update Employee</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-6">
          <p className="text-lg font-semibold">Employee Details:</p>
          <p><strong>Name:</strong> {data.user_id?.name || "N/A"}</p>
          <p><strong>Email:</strong> {data.user_id?.email || "N/A"}</p>
          <p><strong>Salary:</strong> {data.salary || "N/A"}</p>
          <p><strong>Position:</strong> {data.position || "N/A"}</p>
          <p><strong>Contact Number:</strong> {data.contactnumber || "N/A"}</p>
          <p><strong>Address:</strong> {data.address || "N/A"}</p>
          <p><strong>Status:</strong> {data.status || "N/A"}</p>
        </div>
        <form onSubmit={updateData} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Salary</label>
            <input
              type="number"
              name="salary"
              value={data.salary || ""}
              onChange={handleChange}
              required
              className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Position</label>
            <input
              type="text"
              name="position"
              value={data.position || ""}
              onChange={handleChange}
              required
              className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Contact Number</label>
            <input
              type="text"
              name="contactnumber"
              value={data.contactnumber || ""}
              onChange={handleChange}
              required
              className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={data.address || ""}
              onChange={handleChange}
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="terminated">Terminated</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateEmployee;
