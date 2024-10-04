import { useSearchParams } from "react-router-dom";
import {
    Tabs,
    Box,
    TabPanels,
    Heading,
    TabList,
    Tab,
    TabPanel,
} from "@chakra-ui/react";
import ErrorBoundary from "../components/main/ErrorBoundary";
import FallbackUI from "../components/main/FallbackUI";
import SearchedArticles from "../components/search-page/SearchedArticles";
import PeopleList from "../components/search-page/PeopleList";

export default function Searchpage() {
    const [searchParams, _setSearchParams] = useSearchParams();

    return (
        <Box mt="12" p="12" w="70vw" mx="auto">
            <Heading display={"inline"} color={"#2d2d2d"}>
                Results for
            </Heading>
            <Heading display={"inline"}> {searchParams.get("query")}</Heading>

            <Tabs size={"sm"} mt="8">
                <TabList>
                    <Tab>Articles</Tab>
                    <Tab>People</Tab>
                </TabList>

                <TabPanels py="5">
                    <TabPanel>
                        <ErrorBoundary fallback={<FallbackUI />}>
                            <SearchedArticles />
                        </ErrorBoundary>
                    </TabPanel>
                    <TabPanel>
                        <ErrorBoundary fallback={<FallbackUI />}>
                            <PeopleList />
                        </ErrorBoundary>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
