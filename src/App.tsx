import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import { useAuth } from "./context/auth";
import { getUser } from "./api/user";
import { Box, Spinner, Heading } from "@chakra-ui/react";
import ProtectedRoute from "./components/route-protection/ProtectedRoute";
import FallbackUI from "./components/main/FallbackUI";
import ErrorBoundary from "./components/main/ErrorBoundary";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import GuestRoute from "./components/route-protection/GuestRoute";
import UserPageArticles from "./components/user-page/UserPageArticles";
import SubProfilePage from "./components/profile-page/SubProfilePage";

// Pages
const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Writepage = lazy(() => import("./pages/Writepage"));
const Settings = lazy(() => import("./pages/Settings"));
const UserDasboard = lazy(() => import("./pages/UserDasboard"));
const Searchpage = lazy(() => import("./pages/Searchpage"));
const Profile = lazy(() => import("./pages/Profile"));
const TagsPage = lazy(() => import("./pages/TagPage"));
const SingleArticle = lazy(() => import("./pages/SingleArticle"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
                element: (
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                ),
            },
            {
                path: "search",
                element: <Searchpage />,
            },
            {
                path: "profile",
                element: <Profile />,
                children: [
                    {
                        path: ":id/:type",
                        element: <SubProfilePage />,
                    },
                ],
            },
            {
                path: "user",
                element: (
                    <ProtectedRoute>
                        <UserDasboard />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <UserPageArticles />,
                    },
                ],
            },
            {
                path: "write",
                element: (
                    <ProtectedRoute>
                        <Writepage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "tags/:tag",
                element: <TagsPage />,
            },
            {
                path: "/:slug",
                element: <SingleArticle />,
            },
        ],
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "signup",
                element: (
                    <GuestRoute>
                        <Signup />
                    </GuestRoute>
                ),
            },
            {
                path: "login",
                element: (
                    <GuestRoute>
                        <Login />
                    </GuestRoute>
                ),
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

function App() {
    const [loading, setLoading] = useState(true);
    const [error, _setError] = useState("");
    const { loginUser } = useAuth();

    // Fetch user on every page refresh / reload
    useEffect(() => {
        // TODO: handle network errors
        getUser()
            .then((resp) => {
                if (resp.ok && resp.data) {
                    loginUser(resp.data);
                }
            })
            .finally(() => setLoading(false));
    }, [loginUser]);

    if (loading) {
        return <BigSpinner />;
    }

    if (error) {
        return <BigError error={error} />;
    }

    return (
        <ErrorBoundary fallback={<FallbackUI />}>
            <RouterProvider router={router} />
        </ErrorBoundary>
    );
}

function BigSpinner() {
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

function BigError({ error }: { error: string }) {
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

export default App;
