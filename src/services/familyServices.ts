import type { FamilyDetail } from "../types/family";
import apiClient from "../utils/api-client";
import logToServer from "../utils/logToServer"; // 👈 add this

const familyApi = {
  getFamilyMembers: async (): Promise<FamilyDetail[]> => {
    try {
      const res = await apiClient.get<FamilyDetail[]>(
        "/Family/GetFamiliesDetails",
      );
      return res.data;
    } catch (error: any) {
      console.error("Get family members failed", error);

      logToServer({
        level: "error",
        message: "Get family members failed",
        stackTrace: error?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      });

      throw error; // ✅ important: don’t swallow the error
    }
  },
};

export default familyApi;
