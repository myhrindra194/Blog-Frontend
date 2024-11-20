import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ErrorPage from "./pages/ErrorPage";
import PostPage from "./pages/PostPage";
import Root from "./components/Root";
import BlogPage from "./pages/BlogPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import DashBoard from "./pages/DashboardPage";
import EditProfilePage from "./pages/EditProfilPage";
import UserPage from "./pages/UserPage";

const AppWrapper = () => {
  const { user } = useAuth();
  const { token } = user;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <BlogPage />,
        },
        {
          path: "/login",
          element: token ? <Navigate replace to={"/profile"} /> : <LoginPage />,
        },
        {
          path: "/register",
          element: token ? (
            <Navigate replace to={"/profile"} />
          ) : (
            <RegistrationPage />
          ),
        },
        {
          path: "/:idPost",
          element: <PostPage />,
        },
        {
          path: "/users/:idUser",
          element: <UserPage />,
        },
      ],
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <DashBoard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/editProfile",
      element: (
        <ProtectedRoute>
          <EditProfilePage />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

const App = () => {
  return (
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  );
};

export default App;
