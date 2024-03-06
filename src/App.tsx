import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import AuthLayout from "./layouts/AuthLayout";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import { useEffect, useState } from "react";
import fetchFromServer from "./utils/fetchFromServer";
import { useAuthContext } from "./context/auth";
import { IUser } from "./types/user";
import { Spinner, Text, Box } from "@chakra-ui/react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
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
    const { setUser } = useAuthContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    // Fetch user
    useEffect(() => {
        fetchFromServer<IUser>("/api/users/me", {
            method: "GET",
            credentials: "include",
        })
            .then((resp) => {
                if (resp.ok) {
                    setUser(resp.data);
                }
            })
            .catch(() => setError("Something went wrong"))
            .finally(() => setLoading(false));
    }, [setUser]);

    if (loading) {
        return (
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                minH={"100vh"}
                w={"full"}
            >
                <Spinner size={"lg"} />
            </Box>
        );
    }

    if (error) {
        return (
            <Text fontSize={"4xl"} fontWeight={"bold"}>
                {error}
            </Text>
        );
    }

    return <RouterProvider router={router} />;
}

export default App;
