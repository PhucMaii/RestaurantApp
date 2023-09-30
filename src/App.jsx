import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./restaurantSide/Provider/ThemeProvider";
import ProtectedRoutes from "./restaurantSide/Routes/ProtectedRoute";
import SigninPage from "./restaurantSide/pages/Signin/SigninPage";
import HomePage from "./restaurantSide/pages/HomePage/HomePage";
import ForgotPasswordPage from "./restaurantSide/pages/ForgotPassword/ForgotPasswordPage"
import HorizontalLinearStepper from "./restaurantSide/pages/RestaurantCreation/RestaurantCreationStepper";
import HistoryPage from "./restaurantSide/pages/History/HistoryPage";
import MenuPage from "./restaurantSide/pages/Menu/MenuPage";
import UnprotectedRoutes from './restaurantSide/Routes/UnprotectedRoute';
import FeedbackPage from "./restaurantSide/pages/Feedback/FeedbackPage";
import { ThemeContext } from './restaurantSide/Provider/ThemeContext';
import AccountPage from './restaurantSide/pages/Account/AccountPage';

function App() {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <BrowserRouter>
          <Routes>
            <Route element={<UnprotectedRoutes />}>
              <Route path="/" element={<SigninPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<HomePage />} />
              <Route
                path="/create-restaurant"
                element={<HorizontalLinearStepper />}
              />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/account" element={<AccountPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
