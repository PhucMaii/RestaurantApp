import { useRoutes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SigninPage from "./pages/Signin/SigninPage";
import HorizontalLinearStepper from "./pages/RestaurantCreation/RestaurantCreationStepper";
import { useState } from "react";
import { isAuthenticated } from "./utils/auth";

export default function Routes() {

  const [isAuth, _setIsAuth] = useState(isAuthenticated());

  const routes = useRoutes([
    {
      path: "/home",
      element: isAuth ? <HomePage /> : <SigninPage />,
    },
    {
      path: "/",
      element: !isAuth ? <SigninPage /> : <HomePage />,
    },
    {
      path: "/create-restaurant",
      element: <HorizontalLinearStepper />,
    },
  ]);
  return routes;
}
