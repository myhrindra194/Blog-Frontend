import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ErrorPage from "./pages/ErrorPage";
import PostPage from "./pages/PostPage";
import Root from "./components/Root";
import BlogPage from "./pages/BlogPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";

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
        element: <LoginPage />
      },
      {
        path: "/register",
        element: <RegistrationPage />
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


const App = () => {
  return(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App;