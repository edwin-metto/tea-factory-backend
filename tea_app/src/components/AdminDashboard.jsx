import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', role: 'farmer' });
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/accounts/api/get-users/");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/accounts/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        fetchUsers();
        setNewUser({ name: '', role: 'farmer' });
      }
    } catch (error) {
      console.error("Error adding new user:", error);
    }
  };

  
  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/accounts/api/users/${editingUser.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingUser),
      });
      if (response.ok) {
        fetchUsers();
        setEditingUser(null);
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/accounts/api/users/${id}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  
  useEffect(() => {
    setLoading(true);
    fetchUsers();
    setLoading(false);
  }, []);

  
  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8 space-y-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Dashboard</h1>

        
        <div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Add New User</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              placeholder="User's Name"
              required
              className="border border-gray-300 p-3 rounded-xl w-full"
            />
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              required
              className="border border-gray-300 p-3 rounded-xl w-full"
            >
              <option value="farmer">Farmer</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
            >
              Add User
            </button>
          </form>
        </div>

        
        {editingUser && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Edit User</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={editingUser.name}
                onChange={handleEditChange}
                required
                className="border border-gray-300 p-3 rounded-xl w-full"
              />
              <select
                name="role"
                value={editingUser.role}
                onChange={handleEditChange}
                required
                className="border border-gray-300 p-3 rounded-xl w-full"
              >
                <option value="farmer">Farmer</option>
                <option value="admin">Admin</option>
              </select>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
              >
                Update User
              </button>
            </form>
          </div>
        )}

        
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Users</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="py-3 px-4 bg-gray-100 border-b text-left">Name</th>
                <th className="py-3 px-4 bg-gray-100 border-b text-left">email</th>
                
                <th className="py-3 px-4 bg-gray-100 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{user.username}</td>
                  <td className="py-3 px-4 border-b">{user.email}</td>
                  
                  <td className="py-3 px-4 border-b flex gap-2">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
