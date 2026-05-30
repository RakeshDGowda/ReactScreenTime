export type DeviceType = "Mobile" | "Tablet" | "Laptop" | "TV";

export type CategoryType =
  | "Educational"
  | "Entertainment"
  | "Productive"
  | "Social Media"
  | "Other";

export interface ScreenTimeRecord {
  id: number;
  userId: string;
  categoryId: number;
  deviceType: DeviceType;
  minutes: number;
  date: string;
  notes?: string;
}
