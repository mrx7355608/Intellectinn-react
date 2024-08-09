import { Box, Heading, Text, Divider, Image, Button } from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
// import Author from "../components/article/Author";
import { FaHeart, FaCommentAlt, FaRegBookmark } from "react-icons/fa";

export default function TagPage() {
    const { tag } = useParams();

    const tags = [
        "Programming",
        "Web development",
        "Block chain",
        "Game development",
        "Software engineering",
        "Economics",
    ];

    return (
        <Box w="full" p="12">
            {/* other tags list */}
            <Box display="flex" gap="2" mt="12" justifyContent={"center"}>
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
                                whiteSpace={"nowrap"}
                            >
                                {t}
                            </Text>
                        </Link>
                    );
                })}
            </Box>

            {/* tag name */}
            <Box my="16">
                <Heading textAlign="center">{tag}</Heading>
                <Text textAlign="center" color="gray.500" mt="4" fontSize="lg">
                    145 articles
                </Text>
            </Box>
            <Divider mb="12" />

            {/* articles */}
            <Box
                display="flex"
                justifyContent={"start"}
                gap="12"
                flexWrap="wrap"
            >
                <Article />
                <Article />
                <Article />
                <Article />
            </Box>
        </Box>
    );
}

function Article() {
    return (
        <Box
            display="flex"
            flexDirection={"column"}
            flex="1"
            minW="45%"
            mb="12"
        >
            <Image src="/hero.jpg" objectFit="cover" w="full" mb="8" />
            {/* <Author article={null} /> */}
            <Heading mt="5" fontSize="2xl">
                The future of poetry
            </Heading>
            <Text color="gray.600" mt="2">
                And today is a great day to reach out to them
            </Text>
            <Box fontSize="sm" mt="7">
                <Text as="span" color="gray.600">
                    3 min read
                </Text>
                <Text as="span" color="gray.600" mx="1">
                    &middot;
                </Text>
                <Text as="span" color="gray.600">
                    Programming
                </Text>
            </Box>
            <Box display="flex" justifyContent={"space-between"}>
                <Box>
                    <Button display="inline">
                        <FaHeart />
                    </Button>
                    <Button display="inline">
                        <FaCommentAlt />
                    </Button>
                </Box>

                <Box>
                    <Button display="inline">
                        <FaRegBookmark />
                    </Button>
                    <Button display="inline">Menu</Button>
                </Box>
            </Box>
        </Box>
    );
}
