import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ErrorPage from "./pages/ErrorPage";
import BlogPage from "./pages/BlogPage";
import PostPage from "./pages/PostPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BlogPage/>,
    errorElement: <ErrorPage />,
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

  }
  
]);


const App = () => {
  return(
    <RouterProvider router={router} />
  )
}

export default App;