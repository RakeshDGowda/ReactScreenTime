import React, { useState, useEffect } from "react";
import screenTimeApi from "../../services/screenTimeService";
import type { DailySummary as DailySummaryType } from "../../types/types";

interface DailySummaryProps {
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
  if (hrs === 0) return `${mins}m`;
  if (mins === 0) return `${hrs}h`;
  return `${hrs}h ${mins}m`;
}

function DailySummary({ userId, refreshTrigger }: DailySummaryProps) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [summary, setSummary] = useState<DailySummaryType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchSummary();
    }
  }, [userId, date, refreshTrigger]);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const response = await screenTimeApi.getDailySummary(userId, date);
      setSummary(response.data);
    } catch (error) {
      console.error("Failed to fetch summary:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>📊 Daily Summary</h2>

      <div
        className="form-group"
        style={{ maxWidth: "200px", marginBottom: "20px" }}
      >
        <label>Select Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : summary ? (
        <>
          <div className="total-time">
            <h3>{formatTime(summary.totalMinutes)}</h3>
            <p>Total Screen Time on {date}</p>
          </div>

          {summary.deviceBreakdown.length > 0 ? (
            <div className="grid">
              {summary.deviceBreakdown.map((device) => (
                <div key={device.deviceType} className="device-card">
                  <div className="device-icon">
                    {DEVICE_ICONS[device.deviceType] || "📱"}
                  </div>
                  <h3>{device.deviceType}</h3>
                  <div className="time">{formatTime(device.minutes)}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No screen time recorded for this date</p>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}

export default DailySummary;
