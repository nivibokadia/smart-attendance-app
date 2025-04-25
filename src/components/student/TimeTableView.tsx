import React, { useState, useEffect } from 'react';
import { LectureData } from '@/types';

interface TimeTableViewProps {
  lectures: LectureData[];
  selectedLectures: LectureData[];
  onLectureSelect: (lecture: LectureData) => void;
}

const TimeTableView = ({ lectures, selectedLectures, onLectureSelect }: TimeTableViewProps) => {
  // Define time slots
  const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
  ];

  // Define days of the week
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Define subjects and professors
  const subjects = [
    { subject: 'FSD', professor: 'Prof. James Wilson' },
    { subject: 'BDA', professor: 'Dr. Michael Chen' },
    { subject: 'IPCV', professor: 'Dr. Sarah Parker' },
    { subject: 'ML', professor: 'Dr. Emily Brooks' },
    { subject: 'ISIG', professor: 'Dr. Robert Taylor' },
    { subject: 'ISIG LAB', professor: 'Dr. Robert Taylor' },
    { subject: 'BDA LAB', professor: 'Dr. Michael Chen' },
    { subject: 'ML LAB', professor: 'Dr. Emily Brooks' },
    { subject: 'FSD LAB', professor: 'Prof. James Wilson' }
  ];

  // Create a grid data structure with random subjects
  const [gridData, setGridData] = useState<(LectureData | null)[][]>([]);

  useEffect(() => {
    // Create a new grid with random subjects
    const newGridData = days.map(day => {
      return timeSlots.map(timeSlot => {
        // 70% chance of having a lecture in each slot
        if (Math.random() < 0.7) {
          const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
          return {
            _id: `${day}-${timeSlot}-${randomSubject.subject}`,
            subject: randomSubject.subject,
            professor: randomSubject.professor,
            time: timeSlot,
            date: day,
            room: `30${Math.floor(Math.random() * 8)}`,
            division: 'I1',
            year: 'BE'
          };
        }
        return null;
      });
    });
    setGridData(newGridData);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Weekly Time Table</h2>
      <div className="min-w-[800px]">
        <div className="grid grid-cols-6 gap-2">
          {/* Header row */}
          <div className="font-semibold p-2 bg-blue-500 text-white rounded-lg">Time</div>
          {days.map(day => (
            <div key={day} className="font-semibold p-2 bg-blue-500 text-white rounded-lg">
              {day}
            </div>
          ))}
          
          {/* Time slots and lectures */}
          {timeSlots.map((timeSlot, timeIndex) => (
            <React.Fragment key={timeSlot}>
              <div className="p-2 bg-blue-500 text-white rounded-lg">
                {timeSlot}
              </div>
              {days.map((day, dayIndex) => {
                const lecture = gridData[dayIndex]?.[timeIndex];
                return (
                  <div
                    key={`${day}-${timeSlot}`}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 flex items-center justify-center min-h-[80px] ${
                      lecture && selectedLectures.some(l => l._id === lecture._id)
                        ? 'bg-green-500 text-white border-green-500 shadow-md'
                        : 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200'
                    }`}
                    onClick={() => lecture && onLectureSelect(lecture)}
                  >
                    {lecture ? (
                      <div className="text-center font-medium">
                        {lecture.subject}
                      </div>
                    ) : (
                      <div className="text-blue-300">-</div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeTableView;
