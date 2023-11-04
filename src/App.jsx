import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./Provider/ThemeProvider";
import ProtectedRoutes from "./restaurantSide/Routes/ProtectedRoute";
import SigninPage from "./restaurantSide/pages/Signin/SigninPage";
import HomePage from "./restaurantSide/pages/HomePage/HomePage";
import ForgotPasswordPage from "./restaurantSide/pages/ForgotPassword/ForgotPasswordPage"
import HorizontalLinearStepper from "./restaurantSide/pages/RestaurantCreation/RestaurantCreationStepper";
import HistoryPage from "./restaurantSide/pages/History/HistoryPage";
import MenuPage from "./restaurantSide/pages/Menu/MenuPage";
import UnprotectedRoutes from './restaurantSide/Routes/UnprotectedRoute';
import FeedbackPage from "./restaurantSide/pages/Feedback/FeedbackPage";
import { ThemeContext } from './Provider/ThemeContext';
import AccountPage from './restaurantSide/pages/Account/AccountPage';
import CustomerRegister from './customerSide/pages/AuthPages/Signup/CustomerRegister';
import CustomerInfo from './customerSide/pages/AuthPages/Signup/CustomerInfo'
import CustomerProtectedRoutes from './customerSide/Routes/CustomerProtectedRoutes';
import CustomerUnprotectedRoutes from './customerSide/Routes/CustomerUnProtectedRoutes';
import CustomerSigninPage from './customerSide/pages/AuthPages/Signin/CustomerSigninPage';
import RestaurantPage from './customerSide/pages/RestaurantPage/RestaurantPage';
import CustomerHomePage from './customerSide/pages/Home/CustomerHomePage';
import LandingPage from './LandingPage/LandingPage';
import ItemPage from './customerSide/pages/ItemPage/ItemPage';
import './App.css';
import './i18n.js';

function App() {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme =  isDarkTheme ? darkTheme : lightTheme

  return (
    <>
      <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route element={<UnprotectedRoutes />}>
                <Route path="/restaurant/auth/signin" element={<SigninPage />} />
                <Route path="/restaurant/auth/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/" element={<LandingPage />} />
              </Route>
              <Route element={<ProtectedRoutes />}>
                <Route path="/restaurant/home" element={<HomePage />} />
                <Route
                  path="/restaurant/create-restaurant"
                  element={<HorizontalLinearStepper />}
                />
                <Route path="/restaurant/menu" element={<MenuPage />} />
                <Route path="/restaurant/history" element={<HistoryPage />} />
                <Route path="/restaurant/feedback" element={<FeedbackPage />} />
                <Route path="/restaurant/account" element={<AccountPage />} />
              </Route>
              <Route element={<CustomerProtectedRoutes />}>
                <Route path="/customer/auth/signup/address" element={<CustomerInfo />} />
                <Route path="/customer/restaurant/:id" element={<RestaurantPage/>} />
                <Route path="/customer/home" element={<CustomerHomePage />} />
                <Route path="/customer/restaurant/:id/:itemName" element={<ItemPage />} />
              </Route>
              <Route element={<CustomerUnprotectedRoutes />}>
                <Route path="/customer/auth/signup" element={<CustomerRegister />} />
                <Route path="/customer/auth/signin" element={<CustomerSigninPage />} />
              </Route>
            </Routes>
          </BrowserRouter>          
      </ThemeProvider>
    </>
  );
}

export default App;
