// src/pages/Dashboard.js
import React from 'react';
import UploadImage from '../components/UploadImage';
import ImageList from '../components/ImageList';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/api';

const Dashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed');
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <UploadImage />
      <ImageList />
    </div>
  );
};

export default Dashboard;
