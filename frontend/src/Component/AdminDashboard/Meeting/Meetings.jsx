import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [meetingsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const getMeetings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/meetings");
      // Sort meetings by date (newest first)
      const sortedMeetings = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setMeetings(sortedMeetings);
    } catch (error) {
      console.error("Failed to fetch meetings:", error);
      setError("Error fetching meetings.");
    }
  };

  useEffect(() => {
    getMeetings();
  }, []);

  // Search meetings
  const filteredMeetings = meetings.filter((meeting) => {
    const title = meeting.title?.toLowerCase() || "";
    const description = meeting.description?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();
    return title.includes(query) || description.includes(query);
  });

  // Pagination logic
  const indexOfLastMeeting = currentPage * meetingsPerPage;
  const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
  const currentMeetings = filteredMeetings.slice(indexOfFirstMeeting, indexOfLastMeeting);
  const totalPages = Math.ceil(filteredMeetings.length / meetingsPerPage);

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
      <h2 className="text-lg font-semibold text-gray-800">Manage Meetings</h2>
      {error && <div className="text-red-500">{error}</div>}
      
      <div className="mt-6 flex justify-start">
        <Link
          to="/add/meeting"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <FaPlus className="inline mr-2" /> Add Meeting
        </Link>
      </div>

      {/* Search Input */}
      <div className="mt-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title or description..."
          className="px-4 py-2 w-full border rounded-md shadow-sm"
        />
      </div>

      {/* Meetings Table */}
      <div className="mt-6 space-y-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Time
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Location
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Participants
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentMeetings.length > 0 ? (
              currentMeetings.map((meeting) => (
                <tr key={meeting._id}>
                  <td className="py-2 px-4 border-b border-gray-200">{meeting.title}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{meeting.description}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{new Date(meeting.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{meeting.time}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{meeting.location}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {meeting.participants.map(participant => participant.name).join(", ")}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <div className="flex space-x-2">

                      <Link
                        to={`/meeting/delete/${meeting._id}`}
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
                  colSpan="7"
                  className="py-2 px-4 border-b border-gray-200 text-center text-gray-600"
                >
                  No meetings found.
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

export default Meetings;
