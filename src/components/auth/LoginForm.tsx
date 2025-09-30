import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface LoginFormProps {
  onLogin: (email: string) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email?: string, password?: string}>({});

  const validateForm = () => {
    const newErrors: {email?: string, password?: string} = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!email.endsWith('@lawrence.edu')) {
      newErrors.email = 'Please use your LU email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Simple login - just pass the email
    onLogin(email);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="mx-auto w-16 h-16 bg-lu-blue-600 rounded-2xl flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome to Find On LU</h1>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="your.name@lawrence.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
      
      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <button className="text-lu-blue-600 hover:text-lu-blue-700 font-medium">
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
}