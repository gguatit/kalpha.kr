import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import PythonPage from './pages/PythonPage';
import JavaScriptPage from './pages/JavaScriptPage';
import TypeScriptPage from './pages/TypeScriptPage';
import KotlinPage from './pages/KotlinPage';
import RustPage from './pages/RustPage';
import './App.css';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="loading">로딩 중...</div>;
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/python" element={<ProtectedRoute><PythonPage /></ProtectedRoute>} />
        <Route path="/javascript" element={<ProtectedRoute><JavaScriptPage /></ProtectedRoute>} />
        <Route path="/typescript" element={<ProtectedRoute><TypeScriptPage /></ProtectedRoute>} />
        <Route path="/kotlin" element={<ProtectedRoute><KotlinPage /></ProtectedRoute>} />
        <Route path="/rust" element={<ProtectedRoute><RustPage /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;