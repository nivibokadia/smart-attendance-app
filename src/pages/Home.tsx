
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Card } from '@/components/ui/card';

const Home = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-attendify-primary mb-4">
            Welcome to Attend-ify
          </h1>
          <p className="text-xl text-gray-600">
            The smart attendance management system for educational institutions
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="attendify-card flex flex-col items-center p-8 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-attendify-primary rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">For Students</h2>
            <p className="text-gray-600 text-center mb-6">
              Mark your attendance quickly and easily using our simple form interface.
            </p>
            <Link to="/student" className="attendify-button-primary mt-auto">
              Go to Student Portal
            </Link>
          </Card>
          
          <Card className="attendify-card flex flex-col items-center p-8 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-attendify-secondary rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">For Teachers</h2>
            <p className="text-gray-600 text-center mb-6">
              View, filter, and export attendance records to Excel with just a few clicks.
            </p>
            <Link to="/teacher" className="attendify-button-secondary mt-auto">
              Go to Teacher Dashboard
            </Link>
          </Card>
        </div>
        
        <Card className="attendify-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-attendify-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-attendify-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Easy Attendance</h3>
              <p className="text-sm text-gray-600">
                Simple form-based interface for quick attendance submission
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-attendify-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-attendify-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Tabular Data</h3>
              <p className="text-sm text-gray-600">
                View attendance records in an organized, filterable table
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-attendify-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-attendify-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Excel Export</h3>
              <p className="text-sm text-gray-600">
                Export attendance data to Excel with a single click
              </p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Home;
