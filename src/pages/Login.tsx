
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, using simple logic
    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    // Demo login logic
    if (userType === 'student') {
      // Redirect to student page
      navigate('/student');
    } else {
      // Redirect to teacher page
      navigate('/teacher');
    }
    
    toast.success(`Logged in as ${userType}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-attendify-background">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-12 h-12 bg-attendify-primary rounded-full flex items-center justify-center mb-4">
            <School className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Welcome to Attend-ify</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Button
                type="button"
                variant={userType === 'student' ? 'default' : 'outline'}
                onClick={() => setUserType('student')}
              >
                Student
              </Button>
              <Button
                type="button"
                variant={userType === 'teacher' ? 'default' : 'outline'}
                onClick={() => setUserType('teacher')}
              >
                Teacher
              </Button>
            </div>

            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
