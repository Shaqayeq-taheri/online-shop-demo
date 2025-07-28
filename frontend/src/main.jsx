import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store.js";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import CartDetails from "./pages/CartDetails.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/signup.jsx";
import Shipping from "./pages/Shipping.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import Payment from "./pages/Payment.jsx";
import PlaceOrder from "./pages/Placeorder.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartDetails />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="" element={<PrivateRoutes />}>
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/placeorder" element={<PlaceOrder />} />
                <Route path="/orders/:id" element={<OrderDetails />} />
            </Route>
        </Route>
    )
);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
