import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { adminRoutes } from "./routes/admin.routes";


const role = "admin";
let router;
switch (role) {
  case "admin":
    router = adminRoutes;
    break;
  // case "user":
  //   router = userRoutes;
  //   break;
  // default:
  //   router = publicRoutes;
    break;
} 
    

export const App = () => {
  return <RouterProvider router={router} />
}

