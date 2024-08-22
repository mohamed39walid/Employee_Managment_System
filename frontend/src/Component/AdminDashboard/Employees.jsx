import React, { useState } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Employees({ employees, searchQuery, setSearchQuery }) {
  const employeesPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(employees.length / employeesPerPage);

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
      <h2 className="text-lg font-semibold text-gray-800">
        Manage Employees
      </h2>
      <p className="mt-4 text-gray-600">
        Add, remove, or update employee information.
      </p>

      <div className="mt-4">
      <Link
          to="/employee/add"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <FaPlus className="inline mr-2" /> Add Employee
        </Link>
      </div>

      {/* Search Input */}
      <div className="mt-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search employees..."
          className="px-4 py-2 w-full border rounded-md shadow-sm"
        />
      </div>

      {/* Employee Table */}
      <div className="mt-6 space-y-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Position
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Contact
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Address
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
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {employee._id}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {employee.user_id.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {employee.user_id.email}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {employee.position}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {employee.contactnumber}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {employee.address}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {employee.status}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <div className="flex space-x-2">
                    <Link
                        to={`/employee/update/${employee._id}`}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                      >
                        <FaEdit className="inline" /> Edit
                      </Link>
                      <Link
                        to={`/employee/delete/${employee._id}`}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        <FaTrash className="inline" /> Delete
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
                  No employees found.
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

export default Employees;
