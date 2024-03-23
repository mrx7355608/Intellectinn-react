import { Outlet } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import { Suspense } from "react";
import AuthlayoutSpinner from "../components/Spinners/AuthlayoutSpinner";

export default function AuthLayout() {
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
