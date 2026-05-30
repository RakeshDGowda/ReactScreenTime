import apiClient from "../utils/api-client";
import logToServer from "../utils/logToServer";

import type { User, CreateUserDto, NewUser } from "../types/types";

const userApi = {
  getAll: async () => {
    try {
      return await apiClient.get<User[]>("/users");
    } catch (error: any) {
      console.error("Get all users failed", error);

      logToServer({
        level: "error",
        message: "Get all users failed",
        stackTrace: error?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      });

      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      return await apiClient.get<NewUser>(`/users/${id}`);
    } catch (error: any) {
      console.error("Get user by id failed", error);

      logToServer({
        level: "error",
        message: "Get user by id failed",
        stackTrace: error?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        userId: id,
      });

      throw error;
    }
  },

  create: async (data: CreateUserDto) => {
    try {
      return await apiClient.post<User>("/users", data);
    } catch (error: any) {
      console.error("Create user failed", error);

      logToServer({
        level: "error",
        message: "Create user failed",
        stackTrace: error?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      });

      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      return await apiClient.delete(`/users/${id}`);
    } catch (error: any) {
      console.error("Delete user failed", error);

      logToServer({
        level: "error",
        message: "Delete user failed",
        stackTrace: error?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        userId: id,
      });

      throw error;
    }
  },
};

export default userApi;
