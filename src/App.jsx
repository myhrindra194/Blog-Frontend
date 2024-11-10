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
    <RouterProvider router={router} future={{ 
      v7_startTransition: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,

    }} />
  )
}

export default App;