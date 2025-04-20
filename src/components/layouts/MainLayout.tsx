
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-attendify-background">
      <header className="bg-attendify-primary text-white shadow">
        <div className="attendify-container py-4">
          <div className="flex items-center justify-between">
            <Link to="/home" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">Attend-ify</span>
              <span className="text-sm">Student Scribe</span>
            </Link>
            <Button 
              variant="outline" 
              className="text-white hover:text-attendify-primary"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
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
