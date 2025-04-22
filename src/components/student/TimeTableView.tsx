import React from 'react';
import { LectureData } from '@/types';
import TimetableCell from './TimetableCell';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TIME_SLOTS = [
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM',
  '1:00 PM - 2:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
];

interface TimeTableViewProps {
  lectures: LectureData[];
  selectedLectures: LectureData[];
  onLectureSelect: (lecture: LectureData) => void;
}

const TimeTableView: React.FC<TimeTableViewProps> = ({
  lectures,
  selectedLectures,
  onLectureSelect,
}) => {
  const getLecturesForTimeAndDay = (time: string, day: string) => {
    return lectures.filter(
      (lecture) => lecture.time === time && lecture.day === day
    );
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
      <div className="min-w-[900px] lg:min-w-full">
        <div className="grid grid-cols-[100px_repeat(5,1fr)]">
          {/* Header Row */}
          <div className="h-16 flex items-center justify-center font-medium text-gray-500 border-b bg-gray-50">
            Time
        </div>
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="h-16 flex items-center justify-center font-semibold text-gray-700 border-b bg-gray-50"
            >
                  {day}
                </div>
              ))}

          {/* Time Slots */}
          {TIME_SLOTS.map((timeSlot) => (
                <React.Fragment key={timeSlot}>
              <div className="h-28 flex items-center justify-center text-sm font-medium text-gray-600 border-b px-2 bg-gray-50">
                {timeSlot}
              </div>
              {DAYS_OF_WEEK.map((day) => {
                const lecturesInSlot = getLecturesForTimeAndDay(timeSlot, day);
                        return (
                  <div
                    key={`${day}-${timeSlot}`}
                    className="h-28 border-b border-l p-1.5 hover:bg-gray-50 transition-colors duration-150"
                  >
                    {lecturesInSlot.map((lecture) => (
                          <TimetableCell
                        key={lecture.id}
                            lecture={lecture}
                        isSelected={selectedLectures.some(
                          (selected) => selected.id === lecture.id
                        )}
                        onClick={() => onLectureSelect(lecture)}
                          />
                    ))}
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
