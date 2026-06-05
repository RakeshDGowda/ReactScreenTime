import React, { useState, useEffect, useContext } from "react";
import userApi from "../../services/userServices";
import UserManagement from "./UserManagement";
import ScreenTimeForm from "./ScreenTimeForm";
import DailySummary from "./DailySummary";
import RecordsList from "./RecordsList";
import type { JwtDEtails, User, NewUser } from "../../types/types";
import "./Home.css";
import { authService } from "../../services/authService";
import { useOutletContext, useParams } from "react-router-dom";
import type { FamilyDetail } from "../../types/family";
import UserContext from "../../contexts/UserContext";
type TabType = "summary" | "records";

type params = {
  id: string;
};
type contexttype = {
  screenTimeUsers: FamilyDetail[];
  parentflag: number;
};

function HomeTest() {
  const { reload, setReload } = useContext(UserContext);
  const { id } = useParams<params>();
  const outlet = useOutletContext<contexttype | null>();
  const user = outlet?.screenTimeUsers || [];
  const flag = outlet?.parentflag || 0;

  const [users, setUsers] = useState<NewUser | null>(null);
  const [selectedUser, setSelectedUser] = useState<JwtDEtails | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>("summary");

  useEffect(() => {
    let userLoged = authService.getJwt();
    setSelectedUser(userLoged);
    let userid = id ? id : (userLoged?.id ?? "");
    console.log("userid", userid);
    fetchUsers(userid);
  }, [id]);

  useEffect(() => {
    retrigger();
    console.log("retrigered");
  }, [user, id]);

  const fetchUsers = async (id: string) => {
    try {
      const response = await userApi.getById(id);
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleRecordAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
    setReload((prev: any) => prev + 1);
  };

  const retrigger = () => {
    // ✅ SAFE: validation AFTER hooks
  };

  if (flag && flag == 1) {
    const filtereduser = user?.find((u) => u.id === id);

    console.log("usercontext", user);
    if (user && user.length >= 0 && !filtereduser) {
      return <h2>User not found</h2>;
    }
  }
  console.log("user", user);
  return (
    <div className="container">
      {/* <h1>📱 Screen Time Tracker</h1> */}
      <div className="card">
        <div className="empty-state">
          <h2>{`Hi ${users?.name}, welcome `}</h2>
          <p>{`you can now begin tracking the screen time.  ${users?.name}`}</p>
        </div>
      </div>

      {/* <UserManagement
        users={users}
        selectedUser={selectedUser}
        onUserSelect={setSelectedUser}
        onUsersChange={fetchUsers}
      /> */}

      <>
        <ScreenTimeForm
          userId={users?.id ?? ""}
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
            userId={users?.id ?? ""}
            refreshTrigger={refreshTrigger}
          />
        ) : (
          <RecordsList
            userId={users?.id ?? ""}
            refreshTrigger={refreshTrigger}
          />
        )}
      </>
    </div>
  );
}

export default HomeTest;
