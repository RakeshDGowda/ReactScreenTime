type LogLevel = "info" | "warn" | "error" | "debug";

interface LogPayload {
  level: LogLevel;
  message: string;
  stackTrace?: string;
  url: string;
  userAgent: string;
  userId?: string;
  timestamp: string;
}

import apiClient from "./api-client";

const logToServer = async (payload: LogPayload) => {
  try {
    await apiClient.post("/logs/frontend", payload);
  } catch (err) {
    console.error("Failed to send log", err);
  }
};

export default logToServer;
