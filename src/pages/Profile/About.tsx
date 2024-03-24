import { Button, Box, Text } from "@chakra-ui/react";

export default function About() {
    return (
        <Box
            display="flex"
            justifyItems={"center"}
            alignItems={"center"}
            flexDirection="column"
            rounded="lg"
            bg="gray.100"
            p="16"
        >
            <Text fontWeight={"bold"}>Tell the world about yourself</Text>
            <Text color="gray.600" px="16" textAlign="center" mt="2">
                Here's where you can share more about yourself your history,
                work, experience, accomplishments, interests, dreams, and more.
            </Text>
            <Button
                mt="7"
                rounded="full"
                borderColor="gray.800"
                variant="outline"
                size="sm"
            >
                Get started
            </Button>
        </Box>
    );
}
