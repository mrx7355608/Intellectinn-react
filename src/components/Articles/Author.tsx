import { Box, Image, Text } from "@chakra-ui/react";

export default function Author() {
    return (
        <Box display="flex" alignItems="center">
            {/* Profile picture*/}
            <Image
                src="/vite.svg"
                alt="author profile picture"
                w="19px"
                rounded="full"
                objectFit="cover"
            />
            {/* Name */}
            <Text ml="2" fontSize="sm">
                Uncle bob
            </Text>

            {/* Publish date */}
            <Text ml="1" color="gray.500" fontSize="sm">
                - Feb 26, 2024
            </Text>
        </Box>
    );
}
