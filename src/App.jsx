import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import SigninPage from "./pages/Signin/SigninPage";
import { theme } from "./Provider/ThemeProvider";
import CreateRestaurantPage from "./pages/CreateRestaurant/CreateRestaurantPage";

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
      </ThemeProvider>
    </>
  );
}

export default App;
