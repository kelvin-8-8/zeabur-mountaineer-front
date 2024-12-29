import React, { useState, useEffect } from 'react'
import { isLogin, checkRole } from '../services/authService';
import { Navigate } from "react-router-dom";
import Loading from '../pages/Loading';
import Unauthorized from '../pages/Unauthorized';
import { AuthContext } from './AuthContext';

const ROLE_HIERARCHY = {
  "ROLE_GUEST": 1,
  "ROLE_MEMBER": 2,
  "ROLE_ADMIN": 3
}


const ProtectedRoute = ({ children, requiredRole, isLoggedIn, role}) => {

  // const [state, setState] = useState({isLoggedIn: null, role: null})

  // useEffect(() => {
  //   const fetchstats = async () => {
  //     try {
  //       const loginResponse = await isLogin();
  //       const roleResponse = await checkRole();
  //       console.log(loginResponse, roleResponse);
        
  //       setState({isLoggedIn: loginResponse.data, role: roleResponse.data.role})
  //       updateAuthState({isLoggedIn: loginResponse.data, role: roleResponse.data.role})
        
  //     } catch (error) {
  //       setState({isLoggedIn: null, role: null});
  //     }
  //   };

  //   fetchstats();

  // }, []);
  


  if (isLoggedIn === null) {  
    
    return <Unauthorized />
  }
  
  if (isLoggedIn === false) {
    return <Navigate to="/signup" replace />
  }

  if (requiredRole && ROLE_HIERARCHY[requiredRole] < ROLE_HIERARCHY[role]) {
      return <Navigate to="/unauthorized" replace />;
  }

  return children
};

export default ProtectedRoute;

