export interface Student {
  name: string;
  sapId: string;
  rollNo: string;
  committee: string;
  division: string;
  year: string;
  reason: string;
}

export interface Attendance {
  _id: string;
  studentId: string;
  name: string;
  sapId: string;
  rollNo: string;
  division: string;
  year: string;
  subject: string;
  lectureTime: string;
  date: Date;
  weekday: string;
  status: 'present' | 'absent';
  committee?: string;
  reason?: string;
  severity?: 'low' | 'medium' | 'high';
  createdAt?: string;
  updatedAt?: string;
}

export interface LectureData {
  _id: string;
  subject: string;
  professor: string;
  time: string;
  date: string;
  room: string;
  division: string;
  year: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GroupedAttendance {
  subject: string;
  lectureTime: string;
  students: Attendance[];
}

export type DivisionType = 'A' | 'B' | 'C' | 'D';
export type YearType = 'FE' | 'SE' | 'TE' | 'BE';
export type CommitteeType = 'None' | 'Student Council' | 'Coding Club' | 'Sports Committee' | 'Cultural Committee' | 'IEEE' | 'Other';
