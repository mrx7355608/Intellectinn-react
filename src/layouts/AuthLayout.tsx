import { Outlet, useNavigate } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthContext } from "../context/auth";

export default function AuthLayout() {
    const { user } = useAuthContext();
    const navTo = useNavigate();

    useEffect(() => {
        if (user) {
            navTo("/");
        }
    }, [user, navTo]);

    return (
        <Container
            minH="100vh"
            maxW="md"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Outlet />
        </Container>
    );
}
