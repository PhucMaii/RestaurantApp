import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { isAuthenticated } from '../utils/auth';

export default function CustomerProtectedRoutes() {
  const [isAuth, _setIsAuth] = useState(isAuthenticated());
  return isAuth ? <Outlet /> : <Navigate to="/customer/auth/signup" />;
}
