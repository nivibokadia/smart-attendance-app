
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-attendify-background">
      <header className="bg-attendify-primary text-white shadow">
        <div className="attendify-container py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">Attend-ify</span>
              <span className="text-sm">Student Scribe</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link 
                to="/" 
                className={`transition-colors hover:text-accent ${location.pathname === '/' ? 'text-white font-semibold' : 'text-white/80'}`}
              >
                Home
              </Link>
              <Link 
                to="/student" 
                className={`transition-colors hover:text-accent ${location.pathname === '/student' ? 'text-white font-semibold' : 'text-white/80'}`}
              >
                Student
              </Link>
              <Link 
                to="/teacher" 
                className={`transition-colors hover:text-accent ${location.pathname === '/teacher' ? 'text-white font-semibold' : 'text-white/80'}`}
              >
                Teacher
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="attendify-container py-8">
        {children}
      </main>
      <footer className="bg-gray-100 border-t">
        <div className="attendify-container py-6">
          <div className="text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Attend-ify: Student Scribe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
