import React, { useState, useEffect } from 'react';
import { LectureData } from '@/types';
import { Card } from '@/components/ui/card';
import TimetableCell from './TimetableCell';
import { getFilteredLectures, DIVISIONS, YEARS } from '@/utils/mockData';

interface TimeTableViewProps {
  selectedLectures: LectureData[];
  onSelectLecture: (lecture: LectureData) => void;
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const TIME_SLOTS = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM'
];

const TimeTableView: React.FC<TimeTableViewProps> = ({ selectedLectures, onSelectLecture }) => {
  const [division, setDivision] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [lectures, setLectures] = useState<LectureData[]>([]);

  useEffect(() => {
    setLectures(getFilteredLectures(division, year));
  }, [division, year]);

  const getLectureForSlot = (day: string, timeSlot: string): LectureData | undefined => {
    return lectures.find(lecture => {
      const [startTime] = lecture.time.split(' - ');
      return startTime === timeSlot;
    });
  };

  const isLectureSelected = (lecture: LectureData) => {
    return selectedLectures.some(l => l.id === lecture.id);
  };

  return (
    <Card className="attendify-card mt-8">
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
          <div className="min-w-[800px]">
            <div className="grid grid-cols-[100px_repeat(7,1fr)]">
              <div className="font-medium p-2 bg-gray-100 border border-gray-200">Time</div>
              {DAYS_OF_WEEK.map(day => (
                <div key={day} className="font-medium p-2 bg-gray-100 border border-gray-200">
                  {day}
                </div>
              ))}

              {TIME_SLOTS.map(timeSlot => (
                <React.Fragment key={timeSlot}>
                  <div className="p-2 border border-gray-200 font-medium">{timeSlot}</div>
                  {DAYS_OF_WEEK.map(day => (
                    <div key={`${day}-${timeSlot}`} className="h-16 border border-gray-200">
                      {(() => {
                        const lecture = getLectureForSlot(day, timeSlot);
                        return (
                          <TimetableCell
                            lecture={lecture}
                            isSelected={lecture ? isLectureSelected(lecture) : false}
                            onClick={onSelectLecture}
                          />
                        );
                      })()}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
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
