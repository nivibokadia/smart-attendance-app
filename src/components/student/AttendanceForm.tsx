
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Student, LectureData, CommitteeType } from '@/types';
import { COMMITTEES, DIVISIONS, YEARS } from '@/utils/mockData';
import { Card } from '@/components/ui/card';

interface AttendanceFormProps {
  selectedLecture?: LectureData;
  onSubmit: (data: Student & { subject: string; lectureTime: string }) => void;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({ selectedLecture, onSubmit }) => {
  const [formData, setFormData] = useState<Student>({
    name: '',
    sapId: '',
    rollNo: '',
    committee: 'None',
    division: selectedLecture?.division || '',
    year: selectedLecture?.year || '',
    reason: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for field when changed
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
    
    if (!selectedLecture) {
      toast.error("Please select a lecture first");
      return;
    }
    
    onSubmit({
      ...formData,
      subject: selectedLecture.subject,
      lectureTime: selectedLecture.time,
    });
    
    // Reset form
    setFormData({
      name: '',
      sapId: '',
      rollNo: '',
      committee: 'None',
      division: selectedLecture.division,
      year: selectedLecture.year,
      reason: '',
    });
    
    toast.success("Attendance submitted successfully!");
  };

  return (
    <Card className="attendify-card">
      <h2 className="text-xl font-bold mb-6 text-center">Student Attendance Form</h2>
      
      {selectedLecture ? (
        <div className="bg-attendify-accent/20 p-4 rounded-md mb-6">
          <h3 className="font-medium text-gray-700">Selected Lecture:</h3>
          <p className="text-gray-600">
            <strong>Subject:</strong> {selectedLecture.subject}
          </p>
          <p className="text-gray-600">
            <strong>Time:</strong> {selectedLecture.time}
          </p>
          <p className="text-gray-600">
            <strong>Division:</strong> {selectedLecture.division}
          </p>
          <p className="text-gray-600">
            <strong>Year:</strong> {selectedLecture.year}
          </p>
        </div>
      ) : (
        <div className="bg-yellow-50 p-4 rounded-md mb-6 text-center">
          <p className="text-yellow-700">Please select a lecture from the timetable above.</p>
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
              disabled={!!selectedLecture}
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
              disabled={!!selectedLecture}
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
            disabled={!selectedLecture}
          >
            Submit Attendance
          </button>
        </div>
      </form>
    </Card>
  );
};

export default AttendanceForm;
