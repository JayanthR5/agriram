import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import VerificationPage from './pages/VerificationPage';
import TestConnection from './components/TestConnection';


import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route path="/verify/:id" element={<VerificationPage />} />
              <Route path="/test-connection" element={<TestConnection />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />


            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
