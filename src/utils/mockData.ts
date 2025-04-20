import { Attendance, LectureData } from "@/types";

// Sample lecture data
export const LECTURES: LectureData[] = [
  // Monday
  { id: 'mon1', subject: 'FSD Laboratory', time: '8:30 AM - 10:00 AM', division: 'I2-2', year: 'BE' },
  { id: 'mon2', subject: 'BDA', time: '10:00 AM - 11:00 AM', division: 'I2', year: 'BE' },
  { id: 'mon3', subject: 'FSD Laboratory', time: '12:00 PM - 1:30 PM', division: 'I2-1', year: 'BE' },
  { id: 'mon4', subject: 'ARVR Laboratory', time: '12:00 PM - 1:30 PM', division: 'I2-2', year: 'BE' },
  { id: 'mon5', subject: 'IS Laboratory', time: '12:00 PM - 1:30 PM', division: 'I2-2', year: 'BE' },
  { id: 'mon6', subject: 'ARVR Laboratory', time: '2:00 PM - 3:00 PM', division: 'I2', year: 'BE' },
  { id: 'mon7', subject: 'IS Laboratory', time: '2:00 PM - 3:00 PM', division: 'I2', year: 'BE' },

  // Tuesday
  { id: 'tue1', subject: 'IPCV', time: '9:00 AM - 10:00 AM', division: 'I2', year: 'BE' },
  { id: 'tue2', subject: 'SE', time: '10:00 AM - 11:00 AM', division: 'I2', year: 'BE' },
  { id: 'tue3', subject: 'SE Laboratory', time: '12:00 PM - 1:30 PM', division: 'I2-1', year: 'BE' },
  { id: 'tue4', subject: 'ML Laboratory', time: '12:00 PM - 1:30 PM', division: 'I2-2', year: 'BE' },
  { id: 'tue5', subject: 'ML Laboratory', time: '2:00 PM - 4:00 PM', division: 'I2-1', year: 'BE' },
  { id: 'tue6', subject: 'MINORS', time: '4:00 PM - 5:00 PM', division: 'I2', year: 'BE' },
  { id: 'tue7', subject: 'HONORS', time: '4:00 PM - 5:00 PM', division: 'I2', year: 'BE' },

  // Wednesday
  { id: 'wed1', subject: 'ISIG', time: '8:30 AM - 9:30 AM', division: 'I2-2', year: 'BE' },
  { id: 'wed2', subject: 'IPCV', time: '10:00 AM - 11:00 AM', division: 'I2', year: 'BE' },
  { id: 'wed3', subject: 'ML', time: '11:30 AM - 12:30 PM', division: 'I2', year: 'BE' },
  { id: 'wed4', subject: 'IPCV Laboratory', time: '12:30 PM - 2:00 PM', division: 'I2-1', year: 'BE' },
  { id: 'wed5', subject: 'SE Laboratory', time: '12:30 PM - 2:00 PM', division: 'I2-2', year: 'BE' },
  { id: 'wed6', subject: 'BDA', time: '2:00 PM - 3:30 PM', division: 'I2', year: 'BE' },
  { id: 'wed7', subject: 'MINORS', time: '3:30 PM - 5:00 PM', division: 'I2', year: 'BE' },
  { id: 'wed8', subject: 'HONORS', time: '3:30 PM - 5:00 PM', division: 'I2', year: 'BE' },

  // Thursday
  { id: 'thu1', subject: 'Innovative Product Development', time: '8:00 AM - 2:30 PM', division: 'I2', year: 'BE' },
  { id: 'thu2', subject: 'Research/Project Work', time: '8:00 AM - 2:30 PM', division: 'I2', year: 'BE' },

  // Friday
  { id: 'fri1', subject: 'SE', time: '8:30 AM - 9:30 AM', division: 'I2', year: 'BE' },
  { id: 'fri2', subject: 'IPCV', time: '9:30 AM - 10:30 AM', division: 'I2', year: 'BE' },
  { id: 'fri3', subject: 'SE', time: '10:30 AM - 11:30 AM', division: 'I2', year: 'BE' },
  { id: 'fri4', subject: 'ML', time: '12:00 PM - 1:00 PM', division: 'I2', year: 'BE' },
  { id: 'fri5', subject: 'ISIG Laboratory', time: '1:00 PM - 2:30 PM', division: 'I2-1', year: 'BE' },
  { id: 'fri6', subject: 'BDA Laboratory', time: '1:00 PM - 2:30 PM', division: 'I2-2', year: 'BE' },
  { id: 'fri7', subject: 'ARVR Laboratory', time: '2:30 PM - 4:00 PM', division: 'I2', year: 'BE' },
  { id: 'fri8', subject: 'IS Laboratory', time: '2:30 PM - 4:00 PM', division: 'I2', year: 'BE' },
  { id: 'fri9', subject: 'ISIG', time: '2:30 PM - 4:00 PM', division: 'I2', year: 'BE' },

  // Saturday
  { id: 'sat1', subject: 'SE', time: '8:30 AM - 9:30 AM', division: 'I2', year: 'BE' },
  { id: 'sat2', subject: 'BDA', time: '9:30 AM - 10:30 AM', division: 'I2', year: 'BE' },
  { id: 'sat3', subject: 'BDA Laboratory', time: '10:30 AM - 11:30 AM', division: 'I2-1', year: 'BE' },
  { id: 'sat4', subject: 'IPCV Laboratory', time: '10:30 AM - 11:30 AM', division: 'I2-2', year: 'BE' },
  { id: 'sat5', subject: 'ML', time: '12:00 PM - 1:00 PM', division: 'I2', year: 'BE' },
  { id: 'sat6', subject: 'ISIG', time: '1:00 PM - 2:30 PM', division: 'I2', year: 'BE' },
  { id: 'sat7', subject: 'DEVOPS', time: '2:30 PM - 3:30 PM', division: 'I2-1', year: 'BE' },
  { id: 'sat8', subject: 'MINORS', time: '3:30 PM - 5:30 PM', division: 'I2', year: 'BE' }
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

// Available divisions
export const DIVISIONS = ['I2-1', 'I2-2'];

// Available years
export const YEARS = ['BE'];

// Available committees
export const COMMITTEES = ['None', 'Student Council', 'IEEE', 'CSI', 'ACM', 'Coding Club', 'Sports Committee'];

// Filter lectures based on division and year
export const getFilteredLectures = (division: string, year: string): LectureData[] => {
  if (!division || !year) return [];
  return LECTURES.filter(lecture => 
    (lecture.division === division || lecture.division === 'I2') && 
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
