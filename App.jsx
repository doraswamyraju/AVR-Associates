import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ClientDirectory from './components/ClientDirectory';
import ClientOnboardingWizard from './components/ClientOnboardingWizard';
import TaskBoard from './components/TaskBoard';
import Reports from './components/Reports';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clients" element={<ClientDirectory />} />
          <Route path="onboarding" element={<ClientOnboardingWizard />} />
          <Route path="tasks" element={<TaskBoard />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
