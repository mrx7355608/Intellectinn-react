import { Tabs, TabList, Tab, Box, TabPanels, TabPanel } from "@chakra-ui/react";
import ArticlesList from "../../components/Articles/ArticlesList";

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
        <Box w="70vw" h="100vh" mx="auto">
            <Tabs size={"sm"} mt="12" p="12" px="16" whiteSpace={"nowrap"}>
                <TabList overflowY="hidden" height={"full"}>
                    {tags.map((t) => (
                        <Tab py="2">{t}</Tab>
                    ))}
                </TabList>

                <TabPanels>
                    {tags.map((t) => (
                        <TabPanel py="12">
                            <ArticlesList tag={t} />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </Box>
    );
}
