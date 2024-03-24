import {
    Tabs,
    TabList,
    Tab,
    Box,
    TabPanels,
    TabPanel,
    Text,
    Heading,
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
            <Box w="70vw" p="12">
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
                borderColor="gray.400"
                minH="100vh"
            >
                {/* editor's pick */}
                <Box mt="16" mb="10">
                    <Heading fontSize="xl">Editor's pick</Heading>
                    <Box mt="6">
                        <Author />
                        <Heading fontSize="lg" mt="2" color="gray.700">
                            How typescript can be haunting for some people
                        </Heading>
                    </Box>

                    <Box mt="6">
                        <Author />
                        <Heading fontSize="lg" mt="2" color="gray.700">
                            Why people feel inferiority complex and compare
                        </Heading>
                    </Box>
                </Box>

                {/* write articles */}
                <Box w="full" p="6" rounded="lg" bg="teal.50">
                    <Text fontWeight="bold" fontSize="lg">
                        Write on Intellect-inn
                    </Text>
                    <Text>
                        Start your writing career with us. Share your valuable
                        knowledge, skills and experiences with people around the
                        globe
                    </Text>
                    <Link to="/write">
                        <Text
                            mt="4"
                            textDecoration="underline"
                            color="teal.800"
                        >
                            Start writing
                        </Text>
                    </Link>
                </Box>

                {/* users to follow */}

            </Box>
        </Box>
    );
}
