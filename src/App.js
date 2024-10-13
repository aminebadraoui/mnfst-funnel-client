import React, { useState, useCallback, useMemo } from 'react';

import 'reactflow/dist/style.css';
import FunnelStep from './components/FunnelStep';
import Sidebar from './components/Sidebar';
import FunnelList from './components/FunnelList';
import CRM from './components/CRM';
import DesignerHeader from './components/DesignerHeader';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Designer from './components/Designer';
import Login from './components/Login';
import useAuthStore from './stores/authStore';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import LandingPage from './components/LandingPage';

const mockLeads = [
  { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '123-456-7890', notes: 'Interested in Pro Plan', currentStep: 'Awareness' },
  { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phone: '987-654-3210', notes: 'Requested a demo', currentStep: 'Free Trial' },
  // Add more mock leads as needed
];

function ProtectedRoute({ children }) {
  const token = useAuthStore((state) => state.token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="designer" replace />} />
          <Route path="designer" element={<Designer />} />
          <Route path="funnels" element={<FunnelList />} />
          <Route path="crm" element={<CRM />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}


export default App;
