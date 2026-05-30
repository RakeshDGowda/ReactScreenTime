import React, { useState } from "react";
import screenTimeApi from "../../services/screenTimeService";
import type { DeviceType } from "../../types/types";

interface ScreenTimeFormProps {
  userId: string;
  onRecordAdded: () => void;
}

interface Message {
  type: "success" | "error";
  text: string;
}

const DEVICE_TYPES: DeviceType[] = ["Mobile", "Laptop", "Tablet", "Television"];

function ScreenTimeForm({ userId, onRecordAdded }: ScreenTimeFormProps) {
  const [deviceType, setDeviceType] = useState<DeviceType>("Mobile");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const totalMinutes =
      parseInt(String(hours)) * 60 + parseInt(String(minutes));

    if (totalMinutes <= 0) {
      setMessage({ type: "error", text: "Please enter a valid time" });
      return;
    }

    setLoading(true);
    alert(userId);
    try {
      await screenTimeApi.create({
        userId,
        deviceType,
        minutes: totalMinutes,
        date,
      });
      setMessage({ type: "success", text: "Screen time recorded!" });
      setHours(0);
      setMinutes(0);
      onRecordAdded();
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to record screen time" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>⏱️ Record Screen Time</h2>

      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="inline-form">
          <div className="form-group">
            <label>Device</label>
            <select
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value as DeviceType)}
            >
              {DEVICE_TYPES.map((device) => (
                <option key={device} value={device}>
                  {device}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Hours</label>
            <input
              type="number"
              min="0"
              max="24"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label>Minutes</label>
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add Record"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ScreenTimeForm;
