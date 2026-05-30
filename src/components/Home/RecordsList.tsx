import React, { useState, useEffect, useContext } from "react";
import screenTimeApi from "../../services/screenTimeService";
import type { ScreenTimeRecord } from "../../types/types";
import UserContext from "../../contexts/UserContext";

interface RecordsListProps {
  userId: string;
  refreshTrigger: number;
}

const DEVICE_ICONS: Record<string, string> = {
  Mobile: "📱",
  Laptop: "💻",
  Tablet: "📲",
  Television: "📺",
};

function formatTime(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs === 0) return `${mins} min`;
  if (mins === 0) return `${hrs} hr`;
  return `${hrs} hr ${mins} min`;
}

function RecordsList({ userId, refreshTrigger }: RecordsListProps) {
  const { reload, setReload } = useContext(UserContext);
  const [records, setRecords] = useState<ScreenTimeRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchRecords();
    }
  }, [userId, refreshTrigger]);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await screenTimeApi.getUserRecords(userId);

      setRecords(response.data);
    } catch (error) {
      console.error("Failed to fetch records:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("User record", records);
  const handleDelete = async (id: number) => {
    if (window.confirm("Delete this record?")) {
      try {
        await screenTimeApi.delete(id);
        fetchRecords();
        setReload((prev: any) => prev - 1);
      } catch (error) {
        console.error("Failed to delete record:", error);
      }
    }
  };

  return (
    <div className="card">
      <h2>📋 All Records</h2>

      {loading ? (
        <p>Loading...</p>
      ) : records.length > 0 ? (
        <div className="records-list">
          {records.map((record) => (
            <div key={record.id} className="record-item">
              <div className="record-info">
                <span className="record-device">
                  {DEVICE_ICONS[record.deviceType]} {record.deviceType}
                </span>
                <span className="record-date">{record.date}</span>
                <span className="record-time">
                  {formatTime(record.minutes)}
                </span>
              </div>
              <button
                className="btn-danger btn-small"
                onClick={() => handleDelete(record.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No records yet. Start tracking your screen time!</p>
        </div>
      )}
    </div>
  );
}

export default RecordsList;
