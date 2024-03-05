import { Outlet } from "react-router-dom";
import { Container } from "@chakra-ui/react";

export default function AuthLayout() {
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
