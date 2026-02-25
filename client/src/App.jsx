import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Notices from './pages/Notices';
import Complaints from './pages/Complaints';
import Bills from './pages/Bills';
import Visitors from './pages/Visitors';
import Facilities from './pages/Facilities';
import UsersDirectory from './pages/UsersDirectory';

import LandingPage from './pages/LandingPage';
import Features from './pages/Features';
import About from './pages/About';
import Contact from './pages/Contact';
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/notices" element={<PrivateRoute><Notices /></PrivateRoute>} />
        <Route path="/complaints" element={<PrivateRoute><Complaints /></PrivateRoute>} />
        <Route path="/bills" element={<PrivateRoute><Bills /></PrivateRoute>} />
        <Route path="/visitors" element={<PrivateRoute><Visitors /></PrivateRoute>} />
        <Route path="/facilities" element={<PrivateRoute><Facilities /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><UsersDirectory /></PrivateRoute>} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
