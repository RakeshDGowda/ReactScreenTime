import api from "../utils/api-client";
import type { User } from "../types/auth";

import { jwtDecode } from "jwt-decode";
import type { JwtDEtails } from "../types/types";

import logToServer from "../utils/logToServer"; // ✅ correct import

const tokenName = "token";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  isloggedin: false,

  login: (data: LoginRequest) => {
    api
      .post<AuthResponse>("/auth/login", data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem(tokenName, res.data.token);

        console.log(authService.getJwt());

        const url = res.data.user.role == "Child" ? "/" : "/dashboard";
        authService.isloggedin = true;
        window.location.href = url;
      })
      .catch((error) => {
        console.error("Login failed", error);

        logToServer({
          level: "error",
          message: "Login failed",
          stackTrace: error?.stack,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          userId: data.email, // safe identifier
        });
      });
  },

  register: (data: FormData) => {
    api
      .post("/auth/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem(tokenName, res.data.token);

        const url = res.data.user.role == "Child" ? "/" : "/dashboard";
        authService.isloggedin = true;
        window.location.href = url;
      })
      .catch((error) => {
        console.error("Register failed", error);

        logToServer({
          level: "error",
          message: "Register failed",
          stackTrace: error?.stack,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        });
      });
  },

  getToken: () => {
    return localStorage.getItem(tokenName);
  },

  getJwt: (): JwtDEtails | null => {
    try {
      const token = authService.getToken();
      if (!token) return null;

      return jwtDecode(token);
    } catch (error) {
      console.error("JWT decode failed", error);

      logToServer({
        level: "error",
        message: "JWT decode failed",
        stackTrace: (error as any)?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      });

      return null;
    }
  },

  logOut: (useNaviaget: any) => {
    try {
      localStorage.removeItem(tokenName);
      authService.isloggedin = false;
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);

      logToServer({
        level: "error",
        message: "Logout failed",
        stackTrace: (error as any)?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      });
    }
  },
};
