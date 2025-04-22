import React from 'react';
import { LectureData } from '@/types';

interface TimetableCellProps {
  lecture: LectureData | null;
  isSelected: boolean;
  onClick?: (lecture: LectureData) => void;
}

const TimetableCell: React.FC<TimetableCellProps> = ({ lecture, isSelected, onClick }) => {
  if (!lecture) return null;

  return (
    <div
      className={`h-full p-3 ${
        isSelected 
          ? 'bg-green-500/90 hover:bg-green-500 ring-2 ring-green-600/50' 
          : 'bg-blue-500/90 hover:bg-blue-500 ring-1 ring-blue-600/30'
      } text-white cursor-pointer transition-all duration-200 rounded-lg shadow-sm hover:shadow-md 
      hover:scale-[1.02] transform-gpu m-1 backdrop-blur-sm`}
      onClick={() => onClick?.(lecture)}
    >
      <div className="flex flex-col h-full justify-center items-center">
        <div className="font-semibold text-sm text-center">{lecture.subject}</div>
      </div>
    </div>
  );
};

export default TimetableCell;
