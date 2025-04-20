
import React from 'react';
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
