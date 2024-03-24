import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ArticlesList from "./components/Articles/ArticlesList";

// Pages
const Home = lazy(() => import("./pages/Home/Home"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
const Login = lazy(() => import("./pages/Login/Login"));
const Writepage = lazy(() => import("./pages/Write/Writepage"));
const ArticlesByTags = lazy(
    () => import("./pages/ArticlesByTags/ArticlesByTags"),
);
const Settings = lazy(() => import("./pages/Settings/Settings"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Searchpage = lazy(() => import("./pages/Searchpage/Searchpage"));
const Userpage = lazy(() => import("./pages/Userpage/Userpage"));
const PeopleList = lazy(() => import("./pages/Searchpage/PeopleList"));
const TopicsList = lazy(() => import("./pages/Searchpage/TopicsList"));

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
                children: [
                    {
                        path: "people",
                        element: <PeopleList />,
                    },
                    {
                        path: "topics",
                        element: <TopicsList />,
                    },
                ],
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "user",
                element: <Userpage />,
                children: [
                    {
                        index: true,
                        element: <ArticlesList />,
                    },
                ],
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
