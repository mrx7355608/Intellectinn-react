import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import { useAuthContext } from "./context/auth";
import { getUser } from "./api/user";
import { Box, Spinner, Heading } from "@chakra-ui/react";

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
const Userpage = lazy(() => import("./pages/Userpage/Userpage"));

const Searchpage = lazy(() => import("./pages/Searchpage/Searchpage"));
const PeopleList = lazy(() => import("./pages/Searchpage/PeopleList"));
const TopicsList = lazy(() => import("./pages/Searchpage/TopicsList"));
const Articles = lazy(() => import("./pages/Searchpage/Articles"));

const Profile = lazy(() => import("./pages/Profile/Profile"));
const About = lazy(() => import("./pages/Profile/About"));
const Publications = lazy(() => import("./pages/Profile/Publications"));

const TagsPage = lazy(() => import("./pages/TagPage/TagPage"));

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
                        index: true,
                        element: <Articles />,
                    },
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
                children: [
                    {
                        index: true,
                        element: <Publications />,
                    },
                    {
                        path: "about",
                        element: <About />,
                    },
                ],
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
                element: <TagsPage />,
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { setUser } = useAuthContext();

    // Fetch user on every page refresh / reload
    useEffect(() => {
        // TODO: handle network errors
        getUser()
            .then((resp) => {
                if (resp.ok && resp.data) {
                    setUser(resp.data);
                }
            })
            .finally(() => setLoading(false));
    }, [setUser]);

    if (loading) {
        return (
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="full"
                h="100vh"
            >
                <Spinner />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="full"
                h="100vh"
            >
                <Heading fontSize="2xl" color="red.700">
                    {error}
                </Heading>
            </Box>
        );
    }

    return <RouterProvider router={router} />;
}

export default App;
