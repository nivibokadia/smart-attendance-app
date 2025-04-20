
import React, { useState, useEffect } from 'react';
import { LectureData } from '@/types';
import { getFilteredLectures, DIVISIONS, YEARS } from '@/utils/mockData';
import { Card } from '@/components/ui/card';

interface TimeTableViewProps {
  onSelectLecture: (lecture: LectureData) => void;
}

const TimeTableView: React.FC<TimeTableViewProps> = ({ onSelectLecture }) => {
  const [division, setDivision] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [lectures, setLectures] = useState<LectureData[]>([]);

  useEffect(() => {
    setLectures(getFilteredLectures(division, year));
  }, [division, year]);

  return (
    <Card className="attendify-card mb-8">
      <h2 className="text-xl font-bold mb-6 text-center">Timetable View</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="division" className="attendify-label">Division</label>
          <select 
            id="division" 
            className="attendify-select"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
          >
            <option value="">Select Division</option>
            {DIVISIONS.map((div) => (
              <option key={div} value={div}>Division {div}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="year" className="attendify-label">Year</label>
          <select 
            id="year" 
            className="attendify-select"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {YEARS.map((yr) => (
              <option key={yr} value={yr}>{yr}</option>
            ))}
          </select>
        </div>
      </div>
      
      {division && year ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Subject</th>
                <th className="border px-4 py-2 text-left">Time</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lectures.length > 0 ? (
                lectures.map((lecture) => (
                  <tr key={lecture.id} className="border-b hover:bg-gray-50">
                    <td className="border px-4 py-2">{lecture.subject}</td>
                    <td className="border px-4 py-2">{lecture.time}</td>
                    <td className="border px-4 py-2">
                      <button 
                        className="attendify-button-secondary text-sm"
                        onClick={() => onSelectLecture(lecture)}
                      >
                        Mark Attendance
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="border px-4 py-2 text-center text-gray-500">
                    No lectures available for the selected division and year.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">
          Please select both division and year to view the timetable.
        </div>
      )}
    </Card>
  );
};

export default TimeTableView;
