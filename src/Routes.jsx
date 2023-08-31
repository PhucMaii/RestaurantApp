import { useRoutes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SigninPage from "./pages/Signin/SigninPage";
import CreateRestaurant from "./pages/RestaurantCreation/CreateRestaurant/CreateRestaurantPage";
import { useState } from "react";
import { isAuthenticated } from "./utils/auth";
import MenuPage from "./pages/Menu/MenuPage";

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
      element: <CreateRestaurant />,
    },
    {
      path: "/menu",
      element: <MenuPage/>
    }
  ]);
  return routes;
}
