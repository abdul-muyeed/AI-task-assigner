import { Login } from "@/pages/login";
import { Signup } from "@/pages/signup";
import { createBrowserRouter } from "react-router-dom";



const modRoutes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/home",
    element: <div> mod Welcome</div>
  }
]);