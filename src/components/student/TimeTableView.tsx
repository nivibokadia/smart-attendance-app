import React from 'react';
import { LectureData } from '@/types';

interface TimeTableViewProps {
  lectures: LectureData[];
  selectedLectures: LectureData[];
  onLectureSelect: (lecture: LectureData) => void;
}

const TimeTableView: React.FC<TimeTableViewProps> = ({ lectures, selectedLectures, onLectureSelect }) => {
  const selectedIds = new Set(selectedLectures.map(l => l._id));

  // Group lectures by day
  const lecturesByDay = lectures.reduce((acc, lecture) => {
    const day = lecture.day.toLowerCase();
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(lecture);
    return acc;
  }, {} as Record<string, LectureData[]>);

  // Sort lectures by time within each day
  Object.keys(lecturesByDay).forEach(day => {
    lecturesByDay[day].sort((a, b) => {
      const timeA = a.time.split(' - ')[0];
      const timeB = b.time.split(' - ')[0];
      return timeA.localeCompare(timeB);
    });
  });

  // Define all days of the week
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {days.map(day => (
                  <th
                    key={day}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                {days.map(day => (
                  <td key={day} className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-2">
                      {lecturesByDay[day]?.map(lecture => (
                        <div
                          key={lecture._id}
                          className={`p-2 rounded cursor-pointer ${
                            selectedIds.has(lecture._id)
                              ? 'bg-attendify-primary/10 border border-attendify-primary'
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => onLectureSelect(lecture)}
                        >
                          <div className="font-medium">{lecture.subject}</div>
                          <div className="text-sm text-gray-600">{lecture.professor}</div>
                          <div className="text-xs text-gray-500">{lecture.room}</div>
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimeTableView;
