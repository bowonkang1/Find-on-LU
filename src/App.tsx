import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/auth/LoginForm';
import { Layout } from './components/Dashboard';
import { DashboardPage } from './pages/DashboardPage';
import { LostFoundPage } from './pages/LostFoundPage';
import { ThriftPage } from './pages/ThriftPage';

interface User {
  email: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string) => {
    setUser({ email });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/lost-found" element={<LostFoundPage />} />
          <Route path="/thrift" element={<ThriftPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;