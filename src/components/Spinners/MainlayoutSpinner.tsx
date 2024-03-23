import { Box, Spinner } from "@chakra-ui/react";

export default function MainlayoutSpinner() {
    return (
        <Box
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
            h={"100vh"}
        >
            <Spinner />
        </Box>
    );
}
