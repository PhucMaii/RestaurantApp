import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import HorizontalLinearStepper from "./pages/RestaurantCreation/RestaurantCreationStepper"
import SigninPage from "./pages/Signin/SigninPage";
import CreateRestaurantPage from "./pages/RestaurantCreation/CreateRestaurant/CreateRestaurantPage";
import { theme } from "./Provider/ThemeProvider";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/create-restaurant" element={<CreateRestaurantPage />} />
            <Route path="/" element={<SigninPage />} />
          </Routes>
        </BrowserRouter>
      <HorizontalLinearStepper />
      </ThemeProvider>
    </>
  );
}

export default App;
