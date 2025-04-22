import { Attendance, LectureData } from "@/types";

// Sample lecture data
export const LECTURES: LectureData[] = [
  {
    id: '1',
    subject: 'IPCV',
    time: '09:00 AM',
    day: 'Monday',
    room: 'Room 101',
    professor: 'Dr. Smith',
    division: 'I1',
    year: 'TE'
  },
  {
    id: '2',
    subject: 'IPCV Lab',
    time: '10:30 AM',
    day: 'Monday',
    room: 'Lab 101',
    professor: 'Dr. Smith',
    division: 'I1',
    year: 'TE'
  },
  {
    id: '3',
    subject: 'FSD',
    time: '01:00 PM',
    day: 'Monday',
    room: 'Room 102',
    professor: 'Prof. Johnson',
    division: 'I1',
    year: 'TE'
  },
  {
    id: '4',
    subject: 'FSD Lab',
    time: '02:30 PM',
    day: 'Monday',
    room: 'Lab 102',
    professor: 'Prof. Johnson',
    division: 'I1',
    year: 'TE'
  },
  {
    id: '5',
    subject: 'ML',
    time: '09:00 AM',
    day: 'Tuesday',
    room: 'Room 103',
    professor: 'Dr. Williams',
    division: 'I1',
    year: 'TE'
  },
  {
    id: '6',
    subject: 'ML Lab',
    time: '10:30 AM',
    day: 'Tuesday',
    room: 'Lab 103',
    professor: 'Dr. Williams',
    division: 'I1',
    year: 'TE'
  },
  {
    id: '7',
    subject: 'BDA',
    time: '01:00 PM',
    day: 'Tuesday',
    room: 'Room 104',
    professor: 'Prof. Brown',
    division: 'I1',
    year: 'TE'
  },
  {
    id: '8',
    subject: 'BDA Lab',
    time: '02:30 PM',
    day: 'Tuesday',
    room: 'Lab 104',
    professor: 'Prof. Brown',
    division: 'I1',
    year: 'TE'
  },
  {
    id: '9',
    subject: 'SE',
    time: '09:00 AM',
    day: 'Wednesday',
    room: 'Room 105',
    professor: 'Dr. Davis',
    division: 'I1',
    year: 'TE'
  },
  {
    id: '10',
    subject: 'IS',
    time: '10:30 AM',
    day: 'Wednesday',
    room: 'Room 106',
    professor: 'Prof. Wilson',
    division: 'I1',
    year: 'TE'
  },
  {
    id: '11',
    subject: 'ISIG',
    time: '01:00 PM',
    day: 'Wednesday',
    room: 'Room 107',
    professor: 'Dr. Taylor',
    division: 'I1',
    year: 'TE'
  },
  {
    id: '12',
    subject: 'Minors',
    time: '02:30 PM',
    day: 'Wednesday',
    room: 'Room 108',
    professor: 'Prof. Anderson',
    division: 'I1',
    year: 'TE'
  },
  {
    id: '13',
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
    id: '1',
    name: 'John Doe',
    sapId: '12345678',
    rollNo: '101',
    committee: 'Technical',
    division: 'I1',
    year: '2024',
    subject: 'Data Structures',
    lectureTime: '09:00 AM',
    reason: 'Present',
    date: new Date('2024-03-20'),
    status: 'present'
  },
  {
    id: '2',
    name: 'Jane Smith',
    sapId: '87654321',
    rollNo: '102',
    committee: 'Cultural',
    division: 'I1',
    year: '2024',
    subject: 'Database Management',
    lectureTime: '10:30 AM',
    reason: 'Present',
    date: new Date('2024-03-20'),
    status: 'present'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    sapId: '23456789',
    rollNo: '103',
    committee: 'Sports',
    division: 'I1',
    year: '2024',
    subject: 'Cyber Security',
    lectureTime: '01:00 PM',
    reason: 'Absent - Medical Leave',
    date: new Date('2024-03-20'),
    status: 'absent'
  },
  {
    id: '4',
    name: 'Alice Brown',
    sapId: '98765432',
    rollNo: '104',
    committee: 'Technical',
    division: 'I1',
    year: '2024',
    subject: 'Data Structures',
    lectureTime: '09:00 AM',
    reason: 'Present',
    date: new Date('2024-03-21'),
    status: 'present'
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    sapId: '34567890',
    rollNo: '105',
    committee: 'Cultural',
    division: 'I1',
    year: '2024',
    subject: 'Database Management',
    lectureTime: '10:30 AM',
    reason: 'Absent - Personal',
    date: new Date('2024-03-21'),
    status: 'absent'
  }
];

// Available divisions
export const DIVISIONS = ['I1', 'I2', 'I3'];

// Available years
export const YEARS = ['FE', 'SE', 'TE', 'BE'];

// Available committees
export const COMMITTEES = ['None', 'Student Council', 'IEEE', 'CSI', 'ACM', 'Coding Club', 'Sports Committee'];

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

export const ATTENDANCE: Attendance[] = [
  {
    id: '1',
    sapId: '60004200001',
    name: 'John Doe',
    rollNo: '001',
    committee: 'Technical',
    division: 'I1',
    year: 'TE',
    subject: 'IPCV',
    lectureTime: '09:00 AM',
    reason: 'Present for lecture',
    date: new Date('2024-03-20'),
    status: 'present'
  },
  {
    id: '2',
    sapId: '60004200002',
    name: 'Jane Smith',
    rollNo: '002',
    committee: 'Cultural',
    division: 'I2',
    year: 'TE',
    subject: 'FSD',
    lectureTime: '10:30 AM',
    reason: 'Present for lecture',
    date: new Date('2024-03-20'),
    status: 'present'
  },
  {
    id: '3',
    sapId: '60004200003',
    name: 'Bob Johnson',
    rollNo: '003',
    committee: 'Sports',
    division: 'I3',
    year: 'TE',
    subject: 'ML',
    lectureTime: '12:00 PM',
    reason: 'Present for lecture',
    date: new Date('2024-03-20'),
    status: 'present'
  },
  {
    id: '4',
    sapId: '60004200004',
    name: 'Alice Brown',
    rollNo: '004',
    committee: 'Technical',
    division: 'I4',
    year: '2021',
    subject: 'Data Structures',
    lectureTime: '09:00 AM',
    reason: 'Present for lecture',
    date: new Date('2024-03-20'),
    status: 'present'
  },
  {
    id: '5',
    sapId: '60004200005',
    name: 'Charlie Wilson',
    rollNo: '005',
    committee: 'Cultural',
    division: 'I5',
    year: '2024',
    subject: 'Database Management',
    lectureTime: '10:30 AM',
    reason: 'Present for lecture',
    date: new Date('2024-03-20'),
    status: 'present'
  }
];
