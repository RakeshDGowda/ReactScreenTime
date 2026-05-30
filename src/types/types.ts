export interface User {
  id: number;
  name: string;
  email: string;
}

export interface NewUser {
  id: string;
  name: string;
  email: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
}

export interface ScreenTimeRecord {
  id: number;
  userId: string;
  deviceType: string;
  minutes: number;
  date: string;
}

export interface CreateScreenTimeDto {
  userId: string;
  deviceType: string;
  minutes: number;
  date: string;
}

export interface UpdateScreenTimeDto {
  minutes: number;
}

export interface DailySummary {
  date: string;
  totalMinutes: number;
  deviceBreakdown: DeviceTime[];
}

export interface DeviceTime {
  deviceType: string;
  minutes: number;
}

export interface JwtDEtails {
  exp: number;
  id: string;
  role: string;
}

export type LoggedContextType = {
  loggedDetails: JwtDEtails | null;
  setLoggedDetails: React.Dispatch<React.SetStateAction<JwtDEtails | null>>;
};
export type DeviceType = "Mobile" | "Laptop" | "Tablet" | "Television";
