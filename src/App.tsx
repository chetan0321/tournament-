import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import AuthForm from './components/AuthForm';
import HomePage from './pages/HomePage';
import CreateTournament from './pages/tournaments/CreateTournament';
import RegisterTeam from './pages/teams/RegisterTeam';
import ManageSponsorship from './pages/sponsorship/ManageSponsorship';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return user ? <>{children}</> : <Navigate to="/auth" />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={
            <PublicRoute>
              <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <AuthForm />
              </div>
            </PublicRoute>
          } />
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/tournaments/create" element={
            <ProtectedRoute>
              <CreateTournament />
            </ProtectedRoute>
          } />
          <Route path="/teams/register" element={
            <ProtectedRoute>
              <RegisterTeam />
            </ProtectedRoute>
          } />
          <Route path="/sponsorships/manage" element={
            <ProtectedRoute>
              <ManageSponsorship />
            </ProtectedRoute>
          } />
        </Routes>
        <Toaster position="top-right" />
      </AuthProvider>
    </Router>
  );
}