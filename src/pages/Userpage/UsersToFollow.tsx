import { Box, Heading, Image, Text, Button } from "@chakra-ui/react";

export default function UsersToFollow() {
    return (
        <Box display="flex" mt="12" flexDirection={"column"}>
            <Heading fontSize="md" mb="5">
                Who to follow
            </Heading>
            {/* Writers */}
            <Box
                display="flex"
                alignItems="start"
                justifyContent="start"
                gap="4"
            >
                <Image
                    w="25px"
                    src="/vite.svg"
                    rounded="full"
                    objectFit={"cover"}
                />
                <Box ml="4">
                    <Text fontWeight={"bold"}>Kashif Khan</Text>
                    <Text fontSize={"sm"} color="gray.500">
                        Tech enthusiast, Game hacker, Experienced in multipl...
                    </Text>
                </Box>
                <Button
                    variant="outline"
                    rounded="full"
                    borderColor="black"
                    px="6"
                    py="2"
                    pt="2.5"
                    size="sm"
                    my="auto"
                >
                    Follow
                </Button>
            </Box>

            <Box
                mt="5"
                display="flex"
                alignItems="start"
                justifyContent="start"
                gap="4"
            >
                <Image
                    w="25px"
                    src="/vite.svg"
                    rounded="full"
                    objectFit={"cover"}
                />
                <Box ml="4">
                    <Text fontWeight={"bold"}>Kashif Khan</Text>
                    <Text fontSize={"sm"} color="gray.500">
                        Tech enthusiast, Game hacker, Experienced in multipl...
                    </Text>
                </Box>
                <Button
                    variant="outline"
                    rounded="full"
                    borderColor="black"
                    px="6"
                    py="2"
                    pt="2.5"
                    size="sm"
                    my="auto"
                >
                    Follow
                </Button>
            </Box>
        </Box>
    );
}
