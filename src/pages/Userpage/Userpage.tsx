import { Tabs, TabList, Tab, Box, TabPanels, TabPanel } from "@chakra-ui/react";
import ArticlesList from "../../components/Articles/ArticlesList";

export default function Userpage() {
    return (
        <Box display={"flex"}>
            {/* main content */}
            <Box w="70vw" h="100vh">
                <Tabs size={"sm"} mt="12" p="12" px="16" whiteSpace={"nowrap"}>
                    <TabList overflowY="hidden" height={"full"}>
                        <Tab py="2">Programming</Tab>
                        <Tab py="2">Web development</Tab>
                        <Tab py="2">Software Engineering</Tab>
                        <Tab py="2">Self Improvement</Tab>
                        <Tab py="2">Artificial Intelligence</Tab>
                        <Tab py="2">Blockchain</Tab>
                        <Tab py="2">Web 3 Programming</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel py="12">
                            {/* Articles list */}
                            <ArticlesList tag="programming" />
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>three!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
            {/* side content */}
            <Box borderLeft="1px" borderColor="gray.200" p="10">
                jasdfasd
            </Box>
        </Box>
    );
}
