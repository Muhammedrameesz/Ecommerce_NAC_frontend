import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore'; 
import { CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children, redirectPath = '/login' }) => {
  const { isAuth, loading, checkAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    <CircularProgress size={20}/>
    return <div>Loading...</div>; // Or a spinner/loading component
  }

  return isAuth ? children : <Navigate to={redirectPath} />;
};

export default ProtectedRoute; 