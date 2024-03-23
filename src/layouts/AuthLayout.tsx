import { Outlet } from "react-router-dom";
import { Container, Spinner } from "@chakra-ui/react";
import { Suspense } from "react";

export default function AuthLayout() {
    return (
        <Suspense fallback={<Spinner />}>
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
