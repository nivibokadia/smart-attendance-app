
export interface Student {
  name: string;
  sapId: string;
  rollNo: string;
  committee: string;
  division: string;
  year: string;
  reason: string;
}

export interface Attendance extends Student {
  subject: string;
  lectureTime: string;
  date: Date;
  id?: string;
}

export interface LectureData {
  id: string;
  subject: string;
  time: string;
  division: string;
  year: string;
}

export type DivisionType = 'A' | 'B' | 'C' | 'D';
export type YearType = 'FE' | 'SE' | 'TE' | 'BE';
export type CommitteeType = 'None' | 'Student Council' | 'Coding Club' | 'Sports Committee' | 'Cultural Committee' | 'IEEE' | 'Other';
