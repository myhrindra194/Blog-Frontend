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
import AddPostPage from "./pages/AddPostPage";
import EditPostPage from "./pages/EditPostPage";

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
          element: token ? <Navigate replace to={"/dashboard"} /> : <LoginPage />,
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
