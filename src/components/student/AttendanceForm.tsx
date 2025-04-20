import React, { useState } from 'react';
import { toast } from 'sonner';
import { Student, LectureData } from '@/types';
import { COMMITTEES, DIVISIONS, YEARS } from '@/utils/mockData';
import { Card } from '@/components/ui/card';

interface AttendanceFormProps {
  selectedLectures: LectureData[];
  onSubmit: (data: Student & { subject: string; lectureTime: string }) => void;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({ selectedLectures, onSubmit }) => {
  const [formData, setFormData] = useState<Student>({
    name: '',
    sapId: '',
    rollNo: '',
    committee: 'None',
    division: selectedLectures[0]?.division || '',
    year: selectedLectures[0]?.year || '',
    reason: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.sapId.trim()) newErrors.sapId = 'SAP ID is required';
    if (!formData.rollNo.trim()) newErrors.rollNo = 'Roll No is required';
    if (!formData.division) newErrors.division = 'Division is required';
    if (!formData.year) newErrors.year = 'Year is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }
    
    if (!selectedLectures.length) {
      toast.error("Please select one or more lectures first");
      return;
    }
    
    onSubmit({
      ...formData,
      subject: selectedLectures[0].subject,
      lectureTime: selectedLectures[0].time,
    });
    
    setFormData({
      name: '',
      sapId: '',
      rollNo: '',
      committee: 'None',
      division: selectedLectures[0].division,
      year: selectedLectures[0].year,
      reason: '',
    });
    
    toast.success("Attendance submitted successfully!");
  };

  return (
    <Card className="attendify-card mb-8">
      <h2 className="text-xl font-bold mb-6 text-center">Student Attendance Form</h2>
      
      {selectedLectures.length > 0 ? (
        <div className="bg-attendify-accent/20 p-4 rounded-md mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Selected Lectures:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {selectedLectures.map((lecture) => (
              <div key={lecture.id} className="text-sm text-gray-600 p-2 bg-white rounded border">
                <p><strong>Subject:</strong> {lecture.subject}</p>
                <p><strong>Time:</strong> {lecture.time}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 p-4 rounded-md mb-6 text-center">
          <p className="text-yellow-700">Please select one or more lectures from the timetable below.</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="name" className="attendify-label">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`attendify-input ${errors.name ? 'border-red-500' : ''}`}
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="sapId" className="attendify-label">
              SAP ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="sapId"
              name="sapId"
              className={`attendify-input ${errors.sapId ? 'border-red-500' : ''}`}
              value={formData.sapId}
              onChange={handleChange}
              placeholder="SAP12345"
            />
            {errors.sapId && <p className="text-red-500 text-xs mt-1">{errors.sapId}</p>}
          </div>
          
          <div>
            <label htmlFor="rollNo" className="attendify-label">
              Roll No <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="rollNo"
              name="rollNo"
              className={`attendify-input ${errors.rollNo ? 'border-red-500' : ''}`}
              value={formData.rollNo}
              onChange={handleChange}
              placeholder="101"
            />
            {errors.rollNo && <p className="text-red-500 text-xs mt-1">{errors.rollNo}</p>}
          </div>
          
          <div>
            <label htmlFor="committee" className="attendify-label">
              Committee
            </label>
            <select
              id="committee"
              name="committee"
              className="attendify-select"
              value={formData.committee}
              onChange={handleChange}
            >
              {COMMITTEES.map((committee) => (
                <option key={committee} value={committee}>
                  {committee}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="division" className="attendify-label">
              Division <span className="text-red-500">*</span>
            </label>
            <select
              id="division"
              name="division"
              className={`attendify-select ${errors.division ? 'border-red-500' : ''}`}
              value={formData.division}
              onChange={handleChange}
              disabled={!!selectedLectures.length}
            >
              <option value="">Select Division</option>
              {DIVISIONS.map((division) => (
                <option key={division} value={division}>
                  Division {division}
                </option>
              ))}
            </select>
            {errors.division && <p className="text-red-500 text-xs mt-1">{errors.division}</p>}
          </div>
          
          <div>
            <label htmlFor="year" className="attendify-label">
              Year <span className="text-red-500">*</span>
            </label>
            <select
              id="year"
              name="year"
              className={`attendify-select ${errors.year ? 'border-red-500' : ''}`}
              value={formData.year}
              onChange={handleChange}
              disabled={!!selectedLectures.length}
            >
              <option value="">Select Year</option>
              {YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="reason" className="attendify-label">
            Reason for attendance
          </label>
          <textarea
            id="reason"
            name="reason"
            rows={3}
            className="attendify-textarea"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Regular class attendance"
          ></textarea>
        </div>
        
        <div className="text-center">
          <button
            type="submit"
            className="attendify-button-primary px-8 py-2"
            disabled={!selectedLectures.length}
          >
            Submit Attendance
          </button>
        </div>
      </form>
    </Card>
  );
};

export default AttendanceForm;
