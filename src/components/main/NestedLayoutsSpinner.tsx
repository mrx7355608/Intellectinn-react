import { Box, Spinner } from "@chakra-ui/react";

export default function NestedLayoutsSpinner() {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent={"center"}
            w="50vw"
            h="20vh"
            mx="auto"
        >
            <Spinner />
        </Box>
    );
}
