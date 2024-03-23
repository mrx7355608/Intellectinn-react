import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Pages
const Home = lazy(() => import("./pages/Home/Home"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
const Login = lazy(() => import("./pages/Login/Login"));
const Writepage = lazy(() => import("./pages/Write/Writepage"));
const ArticlesByTags = lazy(
    () => import("./pages/ArticlesByTags/ArticlesByTags")
);
const Settings = lazy(() => import("./pages/Settings/Settings"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Searchpage = lazy(() => import("./pages/Searchpage/Searchpage"));
const Userpage = lazy(() => import("./pages/Userpage/Userpage"));

// Routes
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },

            {
                path: "settings",
                element: <Settings />,
            },
            {
                path: "search",
                element: <Searchpage />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "user",
                element: <Userpage />,
            },
            {
                path: "write",
                element: <Writepage />,
            },
            {
                path: "tags/:tag",
                element: <ArticlesByTags />,
            },
        ],
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "signup",
                element: <Signup />,
            },
            {
                path: "login",
                element: <Login />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
