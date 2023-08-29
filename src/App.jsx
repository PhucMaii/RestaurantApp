import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import HorizontalLinearStepper from "./pages/RestaurantCreation/RestaurantCreationStepper"
import SigninPage from "./pages/Signin/SigninPage";
import { theme } from "./Provider/ThemeProvider";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPasswordPage";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/create-restaurant" element={<HorizontalLinearStepper />} />
            <Route path="/" element={<SigninPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Routes>
        </BrowserRouter>

      </ThemeProvider>
    </>
  );
}

export default App;
