import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DashboardProvider } from './contexts/DashboardContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import UnionsRegistry from './pages/UnionsRegistry';
import IndustrialAwards from './pages/IndustrialAwards';
import MembershipLists from './pages/MembershipLists';
import Settings from './pages/Settings';
import UserManagement from './pages/settings/admin/UserManagement';
import SecuritySettings from './pages/settings/general/SecuritySettings';
import NotificationSettings from './pages/settings/general/NotificationSettings';
import StorageSettings from './pages/settings/general/StorageSettings';
import ProtectedRoute from './components/auth/ProtectedRoute';  
import ProfileSettings from './pages/settings/general/ProfileSettings';
import SettingsLayout from './pages/settings/SettingsLayout';
import ApiKeys from './pages/settings/admin/ApiKeys';
import ClassificationScheme from './pages/settings/admin/ClassificationScheme';
import AuditLogs from "./pages/settings/admin/AuditLogs";
import { Toaster } from 'react-hot-toast';
import Workflows from './pages/Workflows';
import DocumentUploadPage from './pages/documents/Upload';
import UnionRegistrationPage from './pages/unions/Register';


function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="unions" element={<UnionsRegistry />} />
              <Route path="unions/register" element={<UnionRegistrationPage />} />
              <Route path="awards" element={<IndustrialAwards />} />
              <Route path="membership" element={<MembershipLists />} />
              <Route path="documents/upload" element={<DocumentUploadPage />} />
              <Route path="workflows" element={<Workflows />} />
              
              {/* Settings nested routes */}
              <Route path="settings" element={<Settings />}>
                <Route index element={<Navigate to="profile" replace />} />
                <Route path="profile" element={<ProfileSettings />} />
                <Route path="security" element={<SecuritySettings />} />
                <Route path="notifications" element={<NotificationSettings />} />
                <Route path="storage" element={<StorageSettings />} />
                {/* Admin routes */}
                <Route path="users" element={<UserManagement />} />
                <Route path="api-keys" element={<ApiKeys />} />
                <Route path="audit-logs" element={<AuditLogs />} />
                <Route path="classification" element={<ClassificationScheme />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;