import React, { useState, useEffect } from "react";
import userApi from "../../services/userServices";
import UserManagement from "./UserManagement";
import ScreenTimeForm from "./ScreenTimeForm";
import DailySummary from "./DailySummary";
import RecordsList from "./RecordsList";
import type { User } from "../../types/types";
import "./Home.css";

type TabType = "summary" | "records";

function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>("summary");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userApi.getAll();
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleRecordAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="container">
      <h1>📱 Screen Time Tracker APP</h1>

      <UserManagement
        users={users}
        selectedUser={selectedUser}
        onUserSelect={setSelectedUser}
        onUsersChange={fetchUsers}
      />

      {selectedUser && (
        <>
          <ScreenTimeForm
            userId={selectedUser.id}
            onRecordAdded={handleRecordAdded}
          />

          <div className="tabs">
            <button
              className={`tab ${activeTab === "summary" ? "active" : ""}`}
              onClick={() => setActiveTab("summary")}
            >
              Daily Summary
            </button>
            <button
              className={`tab ${activeTab === "records" ? "active" : ""}`}
              onClick={() => setActiveTab("records")}
            >
              All Records
            </button>
          </div>

          {activeTab === "summary" ? (
            <DailySummary
              userId={selectedUser.id}
              refreshTrigger={refreshTrigger}
            />
          ) : (
            <RecordsList
              userId={selectedUser.id}
              refreshTrigger={refreshTrigger}
            />
          )}
        </>
      )}

      {!selectedUser && (
        <div className="card">
          <div className="empty-state">
            <h2>Welcome to Screen Time Tracker!</h2>
            <p>
              Select an existing user or create a new one to start tracking
              screen time.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
