import { Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function RecommendedTopics() {
    const tags = ["Web dev", "Programming"];
    return (
        <Box w="full" mt="10">
            <Heading fontSize="md" mb="5">
                Recommended topics
            </Heading>
            <Box display="flex" flexWrap="wrap" gap="2">
                {tags.map((t) => {
                    return (
                        <Link to={`/tags/${t}`}>
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
                        </Link>
                    );
                })}
            </Box>
        </Box>
    );
}
