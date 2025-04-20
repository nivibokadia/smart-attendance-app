
import { Attendance, LectureData } from "@/types";

// Sample lecture data
export const LECTURES: LectureData[] = [
  { id: '1', subject: 'Web Development', time: '9:00 AM - 10:00 AM', division: 'A', year: 'TE' },
  { id: '2', subject: 'Data Structures', time: '10:00 AM - 11:00 AM', division: 'A', year: 'TE' },
  { id: '3', subject: 'Computer Networks', time: '11:00 AM - 12:00 PM', division: 'A', year: 'TE' },
  { id: '4', subject: 'Operating Systems', time: '1:00 PM - 2:00 PM', division: 'B', year: 'TE' },
  { id: '5', subject: 'Database Systems', time: '2:00 PM - 3:00 PM', division: 'B', year: 'TE' },
  { id: '6', subject: 'Software Engineering', time: '3:00 PM - 4:00 PM', division: 'B', year: 'TE' },
  { id: '7', subject: 'Mathematics', time: '9:00 AM - 10:00 AM', division: 'A', year: 'SE' },
  { id: '8', subject: 'Physics', time: '10:00 AM - 11:00 AM', division: 'A', year: 'SE' },
  { id: '9', subject: 'Chemistry', time: '11:00 AM - 12:00 PM', division: 'B', year: 'SE' },
  { id: '10', subject: 'English', time: '1:00 PM - 2:00 PM', division: 'B', year: 'SE' },
  { id: '11', subject: 'Economics', time: '9:00 AM - 10:00 AM', division: 'A', year: 'FE' },
  { id: '12', subject: 'Introduction to Programming', time: '10:00 AM - 11:00 AM', division: 'A', year: 'FE' },
  { id: '13', subject: 'Digital Electronics', time: '9:00 AM - 10:00 AM', division: 'B', year: 'FE' },
  { id: '14', subject: 'Communication Skills', time: '10:00 AM - 11:00 AM', division: 'B', year: 'FE' },
  { id: '15', subject: 'Project Management', time: '9:00 AM - 10:00 AM', division: 'A', year: 'BE' },
  { id: '16', subject: 'Artificial Intelligence', time: '10:00 AM - 11:00 AM', division: 'A', year: 'BE' },
  { id: '17', subject: 'Cloud Computing', time: '9:00 AM - 10:00 AM', division: 'B', year: 'BE' },
  { id: '18', subject: 'Machine Learning', time: '10:00 AM - 11:00 AM', division: 'B', year: 'BE' },
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
