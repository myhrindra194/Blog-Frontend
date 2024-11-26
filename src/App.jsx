import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Root from "./components/Root";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import AddPostPage from "./pages/AddPostPage";
import BlogPage from "./pages/BlogPage";
import DashBoard from "./pages/DashboardPage";
import EditPostPage from "./pages/EditPostPage";
import EditProfilePage from "./pages/EditProfilPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import PostPage from "./pages/PostPage";
import RegistrationPage from "./pages/RegistrationPage";
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
          path: "/blogs",
          element: <BlogPage />,
        },
        {
          path: "/login",
          element: token ? (
            <Navigate replace to={"/dashboard"} />
          ) : (
            <LoginPage />
          ),
        },
        {
          path: "/register",
          element: token ? (
            <Navigate replace to={"/dashboard"} />
          ) : (
            <RegistrationPage />
          ),
        },
        {
          path: "/blogs/:idPost",
          element: <PostPage />,
        },
        {
          path: "/users/:idUser",
          element: <UserPage />,
        },
        {
          path: "/dashboard",
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
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/addPost",
          element: (
            <ProtectedRoute>
              <AddPostPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/editPost/:idPost",
          element: (
            <ProtectedRoute>
              <EditPostPage />
            </ProtectedRoute>
          ),
        },
      ],
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
