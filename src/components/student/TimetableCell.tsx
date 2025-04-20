
import React from 'react';
import { LectureData } from '@/types';

interface TimetableCellProps {
  lecture?: LectureData;
  isSelected?: boolean;
  onClick?: (lecture: LectureData) => void;
}

const TimetableCell: React.FC<TimetableCellProps> = ({ lecture, isSelected, onClick }) => {
  if (!lecture) return <div className="h-full border border-gray-200" />;

  return (
    <div
      className={`h-full p-2 ${
        isSelected ? 'bg-green-500' : 'bg-blue-500'
      } text-white cursor-pointer hover:opacity-90 transition-colors`}
      onClick={() => onClick?.(lecture)}
    >
      <div className="text-sm font-medium">{lecture.time}</div>
      <div className="text-sm">{lecture.subject}</div>
    </div>
  );
};

export default TimetableCell;
