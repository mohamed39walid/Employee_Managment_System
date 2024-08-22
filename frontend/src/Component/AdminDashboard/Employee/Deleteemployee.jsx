import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function DeleteEmployee() {
  const { id } = useParams(); // Get employee ID from URL parameters
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation

  // Fetch employee details
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/employee/get/${id}`);
        setEmployee(response.data);
      } catch (err) {
        setError('Failed to fetch employee data');
      }
    };

    fetchEmployee();
  }, [id]);

  // Handle delete
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/employee/delete/${id}`);
      navigate('/admindashboard'); // Redirect after successful delete
    } catch (err) {
      setError('Failed to delete employee');
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!employee) {
    return <div>Loading...</div>;
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
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Delete Employee</h1>
        <div className="mb-4">
          <p><strong>Name:</strong> {employee.user_id?.name || 'N/A'}</p>
          <p><strong>Email:</strong> {employee.user_id?.email || 'N/A'}</p>
          <p><strong>Salary:</strong> {employee.salary || 'N/A'}</p>
          <p><strong>Position:</strong> {employee.position || 'N/A'}</p>
          <p><strong>Contact Number:</strong> {employee.contactnumber || 'N/A'}</p>
          <p><strong>Address:</strong> {employee.address || 'N/A'}</p>
          <p><strong>Status:</strong> {employee.status || 'N/A'}</p>
        </div>
        <button
          onClick={handleDelete}
          className="w-full py-3 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete Employee
        </button>
      </div>
    </div>
  );
}

export default DeleteEmployee;
