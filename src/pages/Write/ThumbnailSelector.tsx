import { Box, Text } from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";

export default function ThumbnailSelector() {
    return (
        <Box w="full" p="8" rounded="lg" bg="gray.50" mt="12">
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                rounded="full"
                w="60px"
                h="60px"
                borderColor="gray.600"
                border="1px"
                mx="auto"
            >
                <FaCamera size="20" />
            </Box>
            <Text textAlign="center" mt="4">
                Select a thumbnail
            </Text>
        </Box>
    );
}
