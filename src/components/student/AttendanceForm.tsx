import React from 'react';
import { useForm } from 'react-hook-form';
import { Student, LectureData } from '@/types';
import { DIVISIONS, YEARS } from '@/utils/mockData';

interface AttendanceFormProps {
  selectedLectures: LectureData[];
  onSubmit: (data: Student & { subject: string; lectureTime: string }) => void;
  isSubmitting?: boolean;
}

const AttendanceForm = ({ selectedLectures, onSubmit, isSubmitting }: AttendanceFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Student>();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-attendify-primary/20"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SAP ID
            </label>
            <input
              type="text"
              {...register('sapId', { required: 'SAP ID is required' })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-attendify-primary/20"
              placeholder="Enter SAP ID"
            />
            {errors.sapId && (
              <p className="text-red-500 text-xs mt-1">{errors.sapId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Division
            </label>
            <select
              {...register('division', { required: 'Division is required' })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-attendify-primary/20"
            >
              <option value="">Select Division</option>
              {DIVISIONS.map((div) => (
                <option key={div} value={div}>{div}</option>
              ))}
            </select>
            {errors.division && (
              <p className="text-red-500 text-xs mt-1">{errors.division.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <select
              {...register('year', { required: 'Year is required' })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-attendify-primary/20"
            >
              <option value="">Select Year</option>
              {YEARS.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {errors.year && (
              <p className="text-red-500 text-xs mt-1">{errors.year.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Roll No
            </label>
            <input
              type="text"
              {...register('rollNo', { required: 'Roll number is required' })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-attendify-primary/20"
              placeholder="Enter roll number"
            />
            {errors.rollNo && (
              <p className="text-red-500 text-xs mt-1">{errors.rollNo.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason
            </label>
            <input
              type="text"
              {...register('reason')}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-attendify-primary/20"
              placeholder="Reason (optional)"
            />
          </div>
        </div>

        {selectedLectures.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Lectures:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedLectures.map((lecture) => (
                <div 
                  key={lecture.id}
                  className="text-sm bg-blue-100 text-blue-800 rounded px-2 py-1 flex items-center"
                >
                  <span className="font-medium">{lecture.subject}</span>
                  <span className="mx-1">•</span>
                  <span className="text-blue-600">{lecture.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={selectedLectures.length === 0 || isSubmitting}
            className="bg-attendify-primary text-white py-2 px-4 rounded-md hover:bg-attendify-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Attendance'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttendanceForm;
