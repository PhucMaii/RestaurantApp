import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./Provider/ThemeProvider";
import ProtectedRoutes from "./Routes/ProtectedRoute";
import SigninPage from "./pages/Signin/SigninPage";
import HomePage from "./pages/HomePage/HomePage";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPasswordPage"
import HorizontalLinearStepper from "./pages/RestaurantCreation/RestaurantCreationStepper";
import MenuPage from "./pages/Menu/MenuPage";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/create-restaurant" element={<HorizontalLinearStepper />} />
            <Route path="/menu" element={<MenuPage />} />
          </Route>
        </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
