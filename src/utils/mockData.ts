import { Attendance, LectureData } from "@/types";

// Sample lecture data
export const LECTURES: LectureData[] = [
  {
    _id: 'L001',
    subject: 'Data Structures',
    time: '09:00 AM',
    day: 'Monday',
    room: '301',
    professor: 'Dr. Smith',
    division: 'I1',
    year: 'SE'
  },
  {
    _id: 'L002',
    subject: 'Database Management',
    time: '11:00 AM',
    day: 'Monday',
    room: '302',
    professor: 'Dr. Johnson',
    division: 'I1',
    year: 'SE'
  },
  {
    _id: 'L003',
    subject: 'Cyber Security',
    time: '02:00 PM',
    day: 'Monday',
    room: '303',
    professor: 'Dr. Williams',
    division: 'I1',
    year: 'SE'
  },
  {
    _id: 'L004',
    subject: 'FSD',
    time: '02:30 PM',
    day: 'Monday',
    room: 'Lab 102',
    professor: 'Prof. Johnson',
    division: 'I1',
    year: 'TE'
  },
  {
    _id: 'L005',
    subject: 'ML',
    time: '09:00 AM',
    day: 'Tuesday',
    room: 'Room 103',
    professor: 'Dr. Williams',
    division: 'I1',
    year: 'TE'
  },
  {
    _id: 'L006',
    subject: 'ML Lab',
    time: '10:30 AM',
    day: 'Tuesday',
    room: 'Lab 103',
    professor: 'Dr. Williams',
    division: 'I1',
    year: 'TE'
  },
  {
    _id: 'L007',
    subject: 'BDA',
    time: '01:00 PM',
    day: 'Tuesday',
    room: 'Room 104',
    professor: 'Prof. Brown',
    division: 'I1',
    year: 'TE'
  },
  {
    _id: 'L008',
    subject: 'BDA Lab',
    time: '02:30 PM',
    day: 'Tuesday',
    room: 'Lab 104',
    professor: 'Prof. Brown',
    division: 'I1',
    year: 'TE'
  },
  {
    _id: 'L009',
    subject: 'SE',
    time: '09:00 AM',
    day: 'Wednesday',
    room: 'Room 105',
    professor: 'Dr. Davis',
    division: 'I1',
    year: 'TE'
  },
  {
    _id: 'L010',
    subject: 'IS',
    time: '10:30 AM',
    day: 'Wednesday',
    room: 'Room 106',
    professor: 'Prof. Wilson',
    division: 'I1',
    year: 'TE'
  },
  {
    _id: 'L011',
    subject: 'ISIG',
    time: '01:00 PM',
    day: 'Wednesday',
    room: 'Room 107',
    professor: 'Dr. Taylor',
    division: 'I1',
    year: 'TE'
  },
  {
    _id: 'L012',
    subject: 'Minors',
    time: '02:30 PM',
    day: 'Wednesday',
    room: 'Room 108',
    professor: 'Prof. Anderson',
    division: 'I1',
    year: 'TE'
  },
  {
    _id: 'L013',
    subject: 'Honors',
    time: '09:00 AM',
    day: 'Thursday',
    room: 'Room 109',
    professor: 'Dr. Martinez',
    division: 'I1',
    year: 'TE'
  }
];

// Sample attendance data
export const MOCK_ATTENDANCE: Attendance[] = [
  {
    _id: 'A001',
    studentId: 'STU001',
    name: 'John Doe',
    sapId: 'SAP001',
    rollNo: '1',
    division: 'I1',
    year: 'SE',
    subject: 'Data Structures',
    lectureTime: '09:00 AM',
    date: new Date('2024-03-20'),
    weekday: 'Monday',
    status: 'present',
    severity: 'low',
    committee: 'None'
  },
  {
    _id: 'A002',
    studentId: 'STU002',
    name: 'Jane Smith',
    sapId: 'SAP002',
    rollNo: '2',
    division: 'I1',
    year: 'SE',
    subject: 'Database Management',
    lectureTime: '11:00 AM',
    date: new Date('2024-03-20'),
    weekday: 'Monday',
    status: 'absent',
    reason: 'Medical',
    severity: 'medium',
    committee: 'None'
  },
  {
    _id: 'A003',
    studentId: 'STU003',
    name: 'Alice Johnson',
    sapId: 'SAP003',
    rollNo: '3',
    division: 'I1',
    year: 'SE',
    subject: 'Cyber Security',
    lectureTime: '02:00 PM',
    date: new Date('2024-03-20'),
    weekday: 'Monday',
    status: 'present',
    severity: 'low',
    committee: 'Coding Club'
  },
  {
    _id: 'A004',
    studentId: 'STU004',
    name: 'Bob Wilson',
    sapId: 'SAP004',
    rollNo: '4',
    division: 'I1',
    year: 'TE',
    subject: 'FSD',
    lectureTime: '02:30 PM',
    date: new Date('2024-03-20'),
    weekday: 'Monday',
    status: 'present',
    severity: 'low',
    committee: 'Technical'
  },
  {
    _id: 'A005',
    studentId: 'STU005',
    name: 'Charlie Brown',
    sapId: 'SAP005',
    rollNo: '5',
    division: 'I1',
    year: 'TE',
    subject: 'ML',
    lectureTime: '09:00 AM',
    date: new Date('2024-03-20'),
    weekday: 'Tuesday',
    status: 'present',
    severity: 'low',
    committee: 'Cultural'
  }
];

// Available divisions
export const DIVISIONS = ['I1', 'I2', 'I3'];

// Available years
export const YEARS = ['FE', 'SE', 'TE', 'BE'];

// Available committees
export const COMMITTEES = ['None', 'Student Council', 'IEEE', 'CSI', 'ACM', 'Coding Club', 'Sports Committee', 'Technical', 'Cultural'];

// Filter lectures based on division and year
export const getFilteredLectures = (division: string, year: string): LectureData[] => {
  if (!division || !year) return [];
  return LECTURES.filter(lecture => 
    (lecture.division === division || lecture.division === division.split('-')[0]) && 
    lecture.year === year
  );
};

// Filter attendance based on filters
export const getFilteredAttendance = (filters: {
  date?: Date;
  subject?: string;
  division?: string;
  year?: string;
}): Attendance[] => {
  return MOCK_ATTENDANCE.filter(record => {
    if (filters.date && new Date(record.date).toDateString() !== filters.date.toDateString()) {
      return false;
    }
    if (filters.subject && record.subject !== filters.subject) {
      return false;
    }
    if (filters.division && record.division !== filters.division) {
      return false;
    }
    if (filters.year && record.year !== filters.year) {
      return false;
    }
    return true;
  });
};
