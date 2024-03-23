import { Container, Spinner } from "@chakra-ui/react";

export default function AuthlayoutSpinner() {
    return (
        <Container
            minH="100vh"
            maxW="md"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Spinner />
        </Container>
    );
}
