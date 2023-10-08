import React, { useContext, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { isAuthenticated } from '../utils/auth';
import { ThemeContext } from '../../Provider/ThemeContext';

export default function CustomerUnprotectedRoutes() {
  const [isAuth, _setIsAuth] = useState(isAuthenticated());
  const {toggleDarkTheme} = useContext(ThemeContext);

  useEffect(() => {
    toggleDarkTheme(false);
  }, []);

  return !isAuth ? <Outlet /> : <Navigate to="/customer/home" />;
}
