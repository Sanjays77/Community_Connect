<<<<<<< HEAD
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
=======

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Features from './pages/Features';
import About from './pages/About';
import Contact from './pages/Contact';
>>>>>>> 8044050 (chore: add client and server folders)

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
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
=======
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Add more routes here */}
        <Route path="*" element={<div className="flex items-center justify-center h-screen text-2xl font-bold text-gray-400">404 - Page Not Found</div>} />
>>>>>>> 8044050 (chore: add client and server folders)
      </Routes>
    </Router>
  );
}

export default App;
