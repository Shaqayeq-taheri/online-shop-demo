import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter(createRoutesFromElements(<Route path="/" element={<App/>}>
<Route index={true} path="/" element={<Home/>}/>
</Route>));
  

createRoot(document.getElementById("root")).render(
    <StrictMode>
  <RouterProvider router={router}/>

    </StrictMode>
);
