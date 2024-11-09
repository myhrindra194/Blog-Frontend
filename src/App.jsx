import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ErrorPage from "./pages/ErrorPage";
import PostPage from "./pages/PostPage";
import Root from "./components/Root";
import BlogPage from "./pages/BlogPage";

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
    
      }
    ]
  },
 
  
]);


const App = () => {
  return(
    <RouterProvider router={router} />
  )
}

export default App;