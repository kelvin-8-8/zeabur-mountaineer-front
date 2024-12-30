import React, { useState, useEffect } from 'react'
import { isLogin, checkRole } from '../services/authService';
import { Navigate } from "react-router-dom";
import Loading from '../pages/Loading';
import Unauthorized from '../pages/Unauthorized';
import { AuthContext } from './AuthContext';

const ROLE_HIERARCHY = {
  ROLE_GUEST: 1,
  ROLE_MEMBER: 2,
  ROLE_ADMIN: 3
}


const ProtectedRoute = ({ children, requireRole, isLoggedIn, role}) => {

  if (isLoggedIn === null) {  
    
    return <Unauthorized />
  }
  
  if (isLoggedIn === false) {
    return <Navigate to="/signup" replace />
  }
  
  if (requireRole && ROLE_HIERARCHY[requireRole] > ROLE_HIERARCHY[role]) {
      return <Navigate to="/unauthorized" replace />;
  }

  return children
};

export default ProtectedRoute;

