import { Admin } from "@/pages/admin";
import { Login } from "@/pages/login";
import { Signup } from "@/pages/signup";
import { Tickets } from "@/pages/tickets";
import { Ticket } from "@/pages/ticket";
import { createBrowserRouter } from "react-router-dom";



export const adminRoutes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/home",
    element: <div>Admin Welcome</div>

  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/admin",
    element: <Admin />
  },
  {
    path: "/tickets",
    element: <Tickets />,
  },
  {
    path: "/ticket/:id",
    element: <Ticket />,
  },
]); 