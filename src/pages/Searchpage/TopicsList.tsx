import { Box, Text } from "@chakra-ui/react";

export default function TopicsList() {
    const topics = [
        "Philosophy",
        "Literature",
        "Web 3.0",
        "Machine learning",
        "Cyber security",
        "Dark nature",
        "Human psychology",
        "Newtonian Physics",
        "Astronomy",
        "Fullstack development",
    ];
    return (
        <Box display="flex" flexWrap="wrap" gap="2">
            {topics.map((t) => {
                return (
                    <Text
                        rounded="full"
                        bg="gray.100"
                        px="5"
                        py="2"
                        color="gray.600"
                        fontSize="sm"
                        fontWeight={"medium"}
                    >
                        {t}
                    </Text>
                );
            })}
        </Box>
    );
}
