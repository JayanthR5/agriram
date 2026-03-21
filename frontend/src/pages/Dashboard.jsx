import React from 'react';
import { useAuth } from '../context/AuthContext';
import ExporterDashboard from './ExporterDashboard';
import QADashboard from './QADashboard';
import AdminDashboard from './AdminDashboard';
import ImporterDashboard from './ImporterDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'Admin':
      return <AdminDashboard />;
    case 'Exporter':
      return <ExporterDashboard />;
    case 'QA':
      return <QADashboard />;
    case 'Importer':
      return <ImporterDashboard />;
    default:
      return (
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600">Unauthorized Access</h2>
          <p className="text-gray-600">Your role doesn't have access to this dashboard.</p>
        </div>
      );
  }
};

export default Dashboard;
