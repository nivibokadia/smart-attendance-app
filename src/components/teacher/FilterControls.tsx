import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

interface FilterControlsProps {
  onFilterChange: (filters: {
    date?: Date;
    subject?: string;
    division?: string;
    year?: string;
  }) => void;
}

const FilterControls = ({ onFilterChange }: FilterControlsProps) => {
  const [date, setDate] = useState('');
  const [subject, setSubject] = useState('');
  const [division, setDivision] = useState('');
  const [year, setYear] = useState('');

  const handleFilterChange = () => {
    const filters: any = {};
    if (date) filters.date = new Date(date);
    if (subject) filters.subject = subject;
    if (division) filters.division = division;
    if (year) filters.year = year;
    onFilterChange(filters);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Filter Attendance</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              handleFilterChange();
            }}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-attendify-primary/20"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              handleFilterChange();
            }}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-attendify-primary/20"
            placeholder="Enter subject"
          />
        </div>

        <div>
          <label htmlFor="division" className="block text-sm font-medium text-gray-700 mb-1">
            Division
          </label>
          <input
            type="text"
            id="division"
            value={division}
            onChange={(e) => {
              setDivision(e.target.value);
              handleFilterChange();
            }}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-attendify-primary/20"
            placeholder="Enter division"
          />
        </div>

        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
            Year
          </label>
          <input
            type="text"
            id="year"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              handleFilterChange();
            }}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-attendify-primary/20"
            placeholder="Enter year"
          />
        </div>
      </div>
    </Card>
  );
};

export default FilterControls;
