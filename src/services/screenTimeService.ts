import apiClient from "../utils/api-client";
import logToServer from "../utils/logToServer";

import type {
  ScreenTimeRecord,
  CreateScreenTimeDto,
  UpdateScreenTimeDto,
  DailySummary,
} from "../types/types";

const screenTimeApi = {
  getUserRecords: async (userId: string) => {
    try {
      return await apiClient.get<ScreenTimeRecord[]>(
        `/screentime/user/${userId}`,
      );
    } catch (error: any) {
      console.error("Get user records failed", error);

      logToServer({
        level: "error",
        message: "Get user records failed",
        stackTrace: error?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        userId,
      });

      throw error;
    }
  },

  getDailySummary: async (userId: string, date: string) => {
    try {
      return await apiClient.get<DailySummary>(
        `/screentime/user/${userId}/date/${date}`,
      );
    } catch (error: any) {
      console.error("Get daily summary failed", error);

      logToServer({
        level: "error",
        message: "Get daily summary failed",
        stackTrace: error?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        userId,
      });

      throw error;
    }
  },

  getRangeSummary: async (
    userId: string,
    startDate: string,
    endDate: string,
  ) => {
    try {
      return await apiClient.get<DailySummary[]>(
        `/screentime/user/${userId}/range?startDate=${startDate}&endDate=${endDate}`,
      );
    } catch (error: any) {
      console.error("Get range summary failed", error);

      logToServer({
        level: "error",
        message: "Get range summary failed",
        stackTrace: error?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        userId,
      });

      throw error;
    }
  },

  create: async (data: CreateScreenTimeDto) => {
    try {
      return await apiClient.post<ScreenTimeRecord>("/screentime", data);
    } catch (error: any) {
      console.error("Create screen time failed", error);

      logToServer({
        level: "error",
        message: "Create screen time failed",
        stackTrace: error?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      });

      throw error;
    }
  },

  update: async (id: number, data: UpdateScreenTimeDto) => {
    try {
      return await apiClient.put(`/screentime/${id}`, data);
    } catch (error: any) {
      console.error("Update screen time failed", error);

      logToServer({
        level: "error",
        message: "Update screen time failed",
        stackTrace: error?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      });

      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      return await apiClient.delete(`/screentime/${id}`);
    } catch (error: any) {
      console.error("Delete screen time failed", error);

      logToServer({
        level: "error",
        message: "Delete screen time failed",
        stackTrace: error?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      });

      throw error;
    }
  },
};

export default screenTimeApi;
