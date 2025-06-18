import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout.jsx";
import ErrorPage from "./pages/error/ErrorPage.jsx";
import Home from "./pages/home/Home.jsx";
import Shop from "./pages/shop/Shop.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/index.js";
import Product from "./pages/product/Product.jsx";
import Checkout from "./pages/checkout/Checkout.jsx";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/product/:id',
                element: <Product />
            },
            {
                path: '/shop',
                element: <Shop />
            },
            {
                path: '/cart',
                element:
                    <Cart />
            },
            {
                path: '/checkout',
                element: <Checkout />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ],
    },

]);

export default routes;