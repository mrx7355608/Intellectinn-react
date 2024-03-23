import { Tabs, TabList, Tab, Box, TabPanels, TabPanel } from "@chakra-ui/react";
import ArticlesList from "../../components/Articles/ArticlesList";

export default function Userpage() {
    return (
        <Box display={"flex"}>
            {/* main content */}
            <Box w="70vw" h="100vh">
                <Tabs mt="12" p="12" px="16">
                    <TabList w="full" overflowX="scroll">
                        <Tab fontSize="sm">Programming</Tab>
                        <Tab fontSize="sm">Web development</Tab>
                        <Tab fontSize="sm">Software Engineering</Tab>
                        <Tab fontSize="sm">Self Improvement</Tab>
                        <Tab fontSize="sm">Artificial Intelligence</Tab>
                        <Tab fontSize="sm">Blockchain</Tab>
                        <Tab fontSize="sm">Web 3 Programming</Tab>
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
