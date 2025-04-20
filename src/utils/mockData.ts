import { Attendance, LectureData } from "@/types";

// Sample lecture data
export const LECTURES: LectureData[] = [
  { id: '1', subject: 'ISIG Laboratory', time: '8:00 AM - 10:00 AM', division: 'A', year: 'TE' },
  { id: '2', subject: 'FSD Laboratory', time: '8:30 AM - 10:30 AM', division: 'A', year: 'TE' },
  { id: '3', subject: 'IPCV', time: '9:30 AM - 10:30 AM', division: 'B', year: 'TE' },
  { id: '4', subject: 'SE', time: '10:30 AM - 11:30 AM', division: 'A', year: 'BE' },
  { id: '5', subject: 'ML', time: '11:00 AM - 12:00 PM', division: 'B', year: 'BE' },
  { id: '6', subject: 'SE Laboratory', time: '12:00 PM - 2:00 PM', division: 'A', year: 'TE' },
  { id: '7', subject: 'IPCV Laboratory', time: '12:30 PM - 2:30 PM', division: 'B', year: 'TE' },
  { id: '8', subject: 'ISIG', time: '1:30 PM - 2:30 PM', division: 'A', year: 'BE' }
];

// Sample attendance data
export const MOCK_ATTENDANCE: Attendance[] = [
  {
    id: '1',
    name: 'John Doe',
    sapId: 'SAP001',
    rollNo: '101',
    committee: 'Student Council',
    division: 'A',
    year: 'TE',
    subject: 'Web Development',
    lectureTime: '9:00 AM - 10:00 AM',
    reason: 'Regular attendance',
    date: new Date('2023-04-10T09:00:00')
  },
  {
    id: '2',
    name: 'Jane Smith',
    sapId: 'SAP002',
    rollNo: '102',
    committee: 'Coding Club',
    division: 'A',
    year: 'TE',
    subject: 'Data Structures',
    lectureTime: '10:00 AM - 11:00 AM',
    reason: 'Regular attendance',
    date: new Date('2023-04-10T10:00:00')
  },
  {
    id: '3',
    name: 'Robert Johnson',
    sapId: 'SAP003',
    rollNo: '103',
    committee: 'None',
    division: 'B',
    year: 'SE',
    subject: 'Chemistry',
    lectureTime: '11:00 AM - 12:00 PM',
    reason: 'Regular attendance',
    date: new Date('2023-04-10T11:00:00')
  },
  {
    id: '4',
    name: 'Emily Davis',
    sapId: 'SAP004',
    rollNo: '104',
    committee: 'IEEE',
    division: 'B',
    year: 'BE',
    subject: 'Machine Learning',
    lectureTime: '10:00 AM - 11:00 AM',
    reason: 'Regular attendance',
    date: new Date('2023-04-10T10:00:00')
  },
  {
    id: '5',
    name: 'Michael Wilson',
    sapId: 'SAP005',
    rollNo: '105',
    committee: 'Sports Committee',
    division: 'A',
    year: 'FE',
    subject: 'Economics',
    lectureTime: '9:00 AM - 10:00 AM',
    reason: 'Regular attendance',
    date: new Date('2023-04-10T09:00:00')
  }
];

export const YEARS = ['FE', 'SE', 'TE', 'BE'];
export const DIVISIONS = ['A', 'B', 'C', 'D'];
export const COMMITTEES = ['None', 'Student Council', 'Coding Club', 'Sports Committee', 'Cultural Committee', 'IEEE', 'Other'];

export function getFilteredLectures(division: string, year: string): LectureData[] {
  return LECTURES.filter(lecture => 
    (!division || lecture.division === division) && 
    (!year || lecture.year === year)
  );
}

export function getFilteredAttendance(filters: {
  date?: Date;
  subject?: string;
  division?: string;
  year?: string;
}): Attendance[] {
  return MOCK_ATTENDANCE.filter(attendance => {
    const dateMatch = !filters.date || 
      new Date(attendance.date).toDateString() === new Date(filters.date).toDateString();
    const subjectMatch = !filters.subject || attendance.subject === filters.subject;
    const divisionMatch = !filters.division || attendance.division === filters.division;
    const yearMatch = !filters.year || attendance.year === filters.year;
    
    return dateMatch && subjectMatch && divisionMatch && yearMatch;
  });
}
