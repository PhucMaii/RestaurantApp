import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { isAuthenticated } from '../../utils/auth';

export default function UnprotectedRoutes() {
  const [isAuth, _setIsAuth] = useState(isAuthenticated());
  return !isAuth ? <Outlet /> : <Navigate to="/restaurant/home" />; 
}
