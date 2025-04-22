import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import MainLayout from '@/components/layouts/MainLayout';
import api from '@/config/api';

const Home = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Registration states
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [studentId, setStudentId] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [department, setDepartment] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post('/auth/login', {
        email,
        password,
        role: userType
      });

      if (response.data.role !== userType) {
        throw new Error(`Please login as a ${response.data.role}`);
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.role);
      
      if (userType === 'student') {
        navigate('/student');
      } else {
        navigate('/teacher');
      }
      
      toast.success(`Logged in as ${userType}`);
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !phoneNumber || !department || (userType === 'student' && (!studentId || !rollNo))) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
        role: userType,
        studentId: userType === 'student' ? studentId : undefined,
        rollNo: userType === 'student' ? rollNo : undefined,
        department,
        phoneNumber
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.role);
      toast.success('Registration successful!');
      
      if (userType === 'student') {
        navigate('/student');
      } else {
        navigate('/teacher');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center bg-attendify-background">
        <div className="absolute top-4 right-4 text-sm text-gray-500">
          DJSCE IT
        </div>
        <Card className="w-full max-w-md p-6">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <div className="w-12 h-12 bg-attendify-primary rounded-full flex items-center justify-center mb-4">
              <School className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {isLogin ? 'Welcome to Attend-ify' : 'Create Account'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Button
                  type="button"
                  variant={userType === 'student' ? 'default' : 'outline'}
                  onClick={() => setUserType('student')}
                  className="w-full"
                >
                  Student
                </Button>
                <Button
                  type="button"
                  variant={userType === 'teacher' ? 'default' : 'outline'}
                  onClick={() => setUserType('teacher')}
                  className="w-full"
                >
                  Teacher
                </Button>
              </div>

              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  {userType === 'student' && (
                    <>
                      <div className="space-y-2">
                        <Input
                          type="text"
                          placeholder="Student ID"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Input
                          type="text"
                          placeholder="Roll Number"
                          value={rollNo}
                          onChange={(e) => setRollNo(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              variant="link"
              onClick={() => {
                setIsLogin(!isLogin);
                // Clear form fields when switching between login and register
                if (!isLogin) {
                  setName('');
                  setPhoneNumber('');
                  setStudentId('');
                  setDepartment('');
                }
              }}
            >
              {isLogin ? 'Create an account' : 'Already have an account?'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Home;
