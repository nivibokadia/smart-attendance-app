import React from 'react';
import { LectureData } from '@/types';

interface TimeTableViewProps {
  lectures: LectureData[];
  selectedLectures: LectureData[];
  onLectureSelect: (lecture: LectureData) => void;
}

const TimeTableView = ({ lectures, selectedLectures, onLectureSelect }: TimeTableViewProps) => {
  // Group lectures by date
  const lecturesByDate = lectures.reduce((acc, lecture) => {
    if (!acc[lecture.date]) {
      acc[lecture.date] = [];
    }
    acc[lecture.date].push(lecture);
    return acc;
  }, {} as Record<string, LectureData[]>);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Time Table</h2>
      <div className="space-y-6">
        {Object.entries(lecturesByDate).map(([date, dateLectures]) => (
          <div key={date} className="border rounded-lg p-4">
            <h3 className="text-lg font-medium mb-3">
              {new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h3>
            <div className="grid gap-4">
              {dateLectures.map((lecture) => (
                <div
                  key={lecture._id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedLectures.some(l => l._id === lecture._id)
                      ? 'bg-attendify-primary/10 border-attendify-primary'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => onLectureSelect(lecture)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{lecture.subject}</h4>
                      <p className="text-sm text-gray-600">{lecture.professor}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{lecture.time}</p>
                      <p className="text-xs text-gray-500">{lecture.room}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {lecture.division}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {lecture.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeTableView;
