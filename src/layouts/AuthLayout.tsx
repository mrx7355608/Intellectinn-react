import { Outlet, useNavigate } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import { Suspense, useEffect } from "react";
import AuthlayoutSpinner from "../components/main/AuthlayoutSpinner";
import { useAuthContext } from "../context/auth";

export default function AuthLayout() {
    const { user } = useAuthContext();
    const navTo = useNavigate();

    useEffect(() => {
        if (user) {
            navTo("/user");
        }
    }, [navTo, user]);

    return (
        <Suspense fallback={<AuthlayoutSpinner />}>
            <Container
                minH="100vh"
                maxW="md"
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Outlet />
            </Container>
        </Suspense>
    );
}
