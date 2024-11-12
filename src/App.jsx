import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ErrorPage from "./pages/ErrorPage";
import PostPage from "./pages/PostPage";
import Root from "./components/Root";
import BlogPage from "./pages/BlogPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./hooks/useAuth";

const AppWrapper = () => {
  const {token} = useAuth();
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      errorElement: <ErrorPage />,
      children: [
        {
          path:"",
          element: <BlogPage />
        },
        {
          path: "/login",
          element: token ?<Navigate replace to={"/profile"}/>: <LoginPage />
        },
        {
          path: "/register",
          element: token ? <Navigate replace to={"/profile"}/>: <RegistrationPage />
        },
        {
          path:"/:idPost",
          element:<PostPage />
        },
        {
          path:"/profile",
          element:
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
        }
      ]
    },
  ]);

  return <RouterProvider router={router} />
}


const App = () => {
  return(
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  )
}

export default App;