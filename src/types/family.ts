import type { UserRole } from "./auth";

export interface Family {
  id: number;
  name: string;
  createdAt: string;
}

export interface FamilyDetail {
  id: string;
  username: string;
  age: number | null;
  profilpic: any;
  familyid: 2;
  familyname: string;
  screentimetotal: number;
}

export interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  role: UserRole;
  familyId?: number;
}
