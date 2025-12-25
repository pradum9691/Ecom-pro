import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import AuthLayout from '../layout/AuthLayout';
import HomeLayout from '../layout/HomeLayout';
import ProductsPage from '../componets/ProductsPage';
import Home from '../componets/HomePage';
import Users from '../componets/UsersPage';

const AppRouter = () => {
    const router = createBrowserRouter  ([{
      path: "/",
      element: <AuthLayout />,
    },
    {
        path: "/home",
        element: <HomeLayout />,
        children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ] }

  ])
  return  <RouterProvider router={router} />
}

export default AppRouter