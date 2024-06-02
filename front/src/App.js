import { createBrowserRouter, RouterProvider ,Navigate} from "react-router-dom";
import Produits from "./pages/admin/components/produit";
import Users from "./pages/admin/components/user";
import Admin from "./pages/admin";
import Dashboard from "./pages/admin/components/dashboard";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ProtectedRoute from "./components/ProtectedRoute";
import Category from "./pages/admin/components/category";
import Invoice from "./pages/admin/components/invoice";
import UserDashboard from "./pages/user/components/dashboard";
import UserInvoice from "./pages/user/components/invoice";
import User from "./pages/user";
import UserInfo from "./pages/user/components/user-info";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { path: "/", element: <Navigate to="/login" replace /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> }, 
        {
          path: "admin",
          element: <ProtectedRoute roleRequired="ADMIN" />,
          children: [
            {
              path: "",
              element: <Admin />,
              children: [
                { path: "dashboard", element: <Dashboard /> },
                { path: "produit", element: <Produits /> },
                { path: "users", element: <Users /> },
                { path: "category", element: <Category /> },
                { path: "invoice", element: <Invoice /> },
              ]
            }
          ],
        },
        {
          path: "user",
          element: <ProtectedRoute roleRequired="USER" />,
          children: [
            {
              path: "",
              element: <User />,
              children: [
                { path: "dashboard", element: <UserDashboard /> },
                 { path: "info", element: <UserInfo /> },
                { path: "invoice", element: <UserInvoice /> },
              ]
            }
          ],
        }
      ],
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;