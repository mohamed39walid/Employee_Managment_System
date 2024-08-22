import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AccountSettings() {
  const [account, setAccount] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // Add a check for token validity
        if (token === 'undefined' || token === null) {
          navigate("/login");
          return;
        }

        const response = await axios.get('http://localhost:5000/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const { name, email } = response.data;
        setAccount({ name, email, password: '' });
      } catch (error) {
        console.error('Error fetching user details:', error.response || error.message);
        // Display a more detailed error message if available
        setError(error.response?.data?.message || 'Error fetching user details.');
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.put('http://localhost:5000/users/update', account, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Account updated successfully.');
      setError('');
    } catch (error) {
      console.error('Error updating account:', error.response || error.message);
      setError(error.response?.data?.message || 'Error updating account.');
      setSuccess('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg border border-gray-200 p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Account Settings</h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <form onSubmit={handleUpdateAccount} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={account.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-100 rounded-md"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={account.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-100 rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={account.password}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-100 rounded-md"
              placeholder="Enter new password (leave blank if not changing)"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
          >
            Update Account
          </button>
        </form>

        <button
          onClick={handleLogout}
          className="w-full py-3 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AccountSettings;
