import React, { useState } from "react";
import userApi from "../../services/userServices";
import type { User } from "../../types/types";

interface UserManagementProps {
  users: User[];
  selectedUser: User | null;
  onUserSelect: (user: User | null) => void;
  onUsersChange: () => void;
}

interface Message {
  type: "success" | "error";
  text: string;
}

function UserManagement({
  users,
  selectedUser,
  onUserSelect,
  onUsersChange,
}: UserManagementProps) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<Message | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userApi.create({ name, email });
      setName("");
      setEmail("");
      setShowForm(false);
      setMessage({ type: "success", text: "User created successfully!" });
      onUsersChange();
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.response?.data || "Failed to create user",
      });
    }
  };

  const handleDelete = async (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userApi.delete(userId);
        if (selectedUser?.id === userId) {
          onUserSelect(null);
        }
        onUsersChange();
        setMessage({ type: "success", text: "User deleted successfully!" });
        setTimeout(() => setMessage(null), 3000);
      } catch (error) {
        setMessage({ type: "error", text: "Failed to delete user" });
      }
    }
  };

  return (
    <div className="card">
      <h2>👤 User Management</h2>

      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <div className="user-select">
        <select
          value={selectedUser?.id || ""}
          onChange={(e) => {
            const user = users.find((u) => u.id === parseInt(e.target.value));
            onUserSelect(user || null);
          }}
        >
          <option value="">Select a user...</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ New User"}
        </button>
        {selectedUser && (
          <button
            className="btn-danger btn-small"
            onClick={() => handleDelete(selectedUser.id)}
          >
            Delete User
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <div className="inline-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
            <button type="submit">Create User</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default UserManagement;
