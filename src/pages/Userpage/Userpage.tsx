import {
    Tabs,
    TabList,
    Tab,
    Box,
    TabPanels,
    TabPanel,
    Text,
    Heading,
    Image,
    Button,
} from "@chakra-ui/react";
import ArticlesList from "../../components/Articles/ArticlesList";
import Author from "../../components/Articles/Author";
import { Link } from "react-router-dom";

export default function Userpage() {
    const tags = [
        "Programming",
        "Web development",
        "Block chain",
        "Game development",
        "Software engineering",
        "Cybersecurity",
        "Web 3.0",
        "Self Improvement",
        "Philosophy",
        "Economics",
    ];
    return (
        <Box minH="100vh" display="flex" alignItems="start" p="0">
            <Box w="68vw" p="12">
                <Tabs size={"sm"} mt="12">
                    <TabList overflowY="hidden" height={"full"}>
                        {tags.map((t) => (
                            <Tab py="2" whiteSpace={"nowrap"}>
                                {t}
                            </Tab>
                        ))}
                    </TabList>

                    <TabPanels>
                        {tags.map((t) => (
                            <TabPanel py="10">
                                <ArticlesList tag={t} />
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                p="10"
                borderLeft="1px"
                borderColor="gray.200"
                minH="100vh"
            >
                {/* editor's pick */}
                <Box mt="16" mb="10">
                    <Heading fontSize="md" mb="7">
                        Staff picks
                    </Heading>
                    <Box mt="6">
                        <Author />
                        <Heading fontSize="md" mt="2" color="gray.700">
                            How typescript can be haunting for some people
                        </Heading>
                    </Box>

                    <Box mt="6">
                        <Author />
                        <Heading fontSize="md" mt="2" color="gray.700">
                            Why people feel inferiority complex and compare
                        </Heading>
                    </Box>

                    <Box mt="6">
                        <Author />
                        <Heading fontSize="md" mt="2" color="gray.700">
                            The future of poetry
                        </Heading>
                    </Box>
                </Box>

                {/* write articles */}
                <Box w="full" mt="10">
                    <Heading fontSize="md" mb="5">
                        Recommended topics
                    </Heading>
                    <Box display="flex" flexWrap="wrap" gap="2">
                        <Text
                            rounded="full"
                            bg="gray.100"
                            px="5"
                            py="2"
                            color="gray.600"
                            fontSize="sm"
                            fontWeight={"medium"}
                        >
                            Philosophy
                        </Text>

                        <Text
                            rounded="full"
                            bg="gray.100"
                            px="5"
                            py="2"
                            color="gray.600"
                            fontSize="sm"
                            fontWeight={"medium"}
                        >
                            Cryptocurrency
                        </Text>
                        <Text
                            rounded="full"
                            bg="gray.100"
                            px="5"
                            py="2"
                            color="gray.600"
                            fontSize="sm"
                            fontWeight={"medium"}
                        >
                            Web 3.0
                        </Text>
                        <Text
                            rounded="full"
                            bg="gray.100"
                            px="5"
                            py="2"
                            color="gray.600"
                            fontSize="sm"
                            fontWeight={"medium"}
                        >
                            Human psychology
                        </Text>
                        <Text
                            rounded="full"
                            bg="gray.100"
                            px="5"
                            py="2"
                            color="gray.600"
                            fontSize="sm"
                            fontWeight={"medium"}
                        >
                            Self improvement
                        </Text>
                        <Text
                            rounded="full"
                            bg="gray.100"
                            px="5"
                            py="2"
                            color="gray.600"
                            fontSize="sm"
                            fontWeight={"medium"}
                        >
                            Machine learning
                        </Text>
                        <Text
                            rounded="full"
                            bg="gray.100"
                            px="5"
                            py="2"
                            color="gray.600"
                            fontSize="sm"
                            fontWeight={"medium"}
                        >
                            Exercise
                        </Text>
                        <Text
                            rounded="full"
                            bg="gray.100"
                            px="5"
                            py="2"
                            color="gray.600"
                            fontSize="sm"
                            fontWeight={"medium"}
                        >
                            Anatomy
                        </Text>
                    </Box>
                </Box>

                {/* users to follow */}
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
                                Tech enthusiast, Game hacker, Experienced in
                                multipl...
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
                                Tech enthusiast, Game hacker, Experienced in
                                multipl...
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
            </Box>
        </Box>
    );
}
