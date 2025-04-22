import React, { useState } from 'react';
import { DIVISIONS, YEARS, LECTURES } from '@/utils/mockData';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface FilterControlsProps {
  onFilter: (filters: {
    date?: Date;
    subject?: string;
    division?: string;
    year?: string;
    lectureTime?: string;
  }) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ onFilter }) => {
  const [date, setDate] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [division, setDivision] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [lectureTime, setLectureTime] = useState<string>('');

  // Extract unique subjects from the lectures data
  const subjects = Array.from(new Set(LECTURES.map(lecture => lecture.subject)));

  // Get lecture times for selected subject
  const lectureTimes = subject
    ? Array.from(new Set(LECTURES
        .filter(lecture => lecture.subject === subject)
        .map(lecture => lecture.time)))
    : [];

  const handleApplyFilters = () => {
    try {
      const filters: any = {};
      
      if (date) {
        const selectedDate = new Date(date);
        if (isNaN(selectedDate.getTime())) {
          toast.error('Invalid date selected');
          return;
        }
        filters.date = selectedDate;
      }
      
      if (subject) filters.subject = subject;
      if (division) filters.division = division;
      if (year) filters.year = year;
      if (lectureTime) filters.lectureTime = lectureTime;

      onFilter(filters);
    } catch (error) {
      console.error('Error applying filters:', error);
      toast.error('Error applying filters');
    }
  };

  const handleClearFilters = () => {
    setDate('');
    setSubject('');
    setDivision('');
    setYear('');
    setLectureTime('');
    onFilter({});
  };

  return (
    <Card className="attendify-card mb-8">
      <h2 className="text-xl font-bold mb-4">Filter Attendance</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label htmlFor="date-filter" className="attendify-label">Date</label>
          <input
            type="date"
            id="date-filter"
            className="attendify-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="subject-filter" className="attendify-label">Subject</label>
          <select
            id="subject-filter"
            className="attendify-select"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              setLectureTime(''); // Reset lecture time when subject changes
            }}
          >
            <option value="">All Subjects</option>
            {subjects.map((subj) => (
              <option key={subj} value={subj}>{subj}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="lecture-time-filter" className="attendify-label">Lecture Time</label>
          <select
            id="lecture-time-filter"
            className="attendify-select"
            value={lectureTime}
            onChange={(e) => setLectureTime(e.target.value)}
            disabled={!subject}
          >
            <option value="">All Times</option>
            {lectureTimes.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="division-filter" className="attendify-label">Division</label>
          <select
            id="division-filter"
            className="attendify-select"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
          >
            <option value="">All Divisions</option>
            {DIVISIONS.map((div) => (
              <option key={div} value={div}>Division {div}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="year-filter" className="attendify-label">Year</label>
          <select
            id="year-filter"
            className="attendify-select"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">All Years</option>
            {YEARS.map((yr) => (
              <option key={yr} value={yr}>{yr}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
        >
          Clear Filters
        </button>
        <button
          onClick={handleApplyFilters}
          className="attendify-button-primary"
        >
          Apply Filters
        </button>
      </div>
    </Card>
  );
};

export default FilterControls;
