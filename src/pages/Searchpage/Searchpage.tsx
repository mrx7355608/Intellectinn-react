import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import {
    Tabs,
    TabList,
    Tab,
    Box,
    TabPanels,
    Heading,
    Spinner,
} from "@chakra-ui/react";
import NestedLayoutsSpinner from "../../components/Spinners/NestedLayoutsSpinner";

export default function Searchpage() {
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <Box mt="12" p="12" w="70vw" mx="auto">
            <Heading display={"inline"} color={"#2d2d2d"}>
                Results for
            </Heading>
            <Heading display={"inline"}> {searchParams.get("query")}</Heading>

            <Tabs size={"sm"} mt="8">
                <TabList overflowY="hidden" height={"full"}>
                    <Link to={`/search/people`}>
                        <Tab py="2" whiteSpace={"nowrap"} m="0">
                            People
                        </Tab>
                    </Link>
                    <Link to={`/search/topics`}>
                        <Tab py="2" whiteSpace={"nowrap"} m="0">
                            Topics
                        </Tab>
                    </Link>
                </TabList>

                <TabPanels py="10">
                    <Suspense fallback={<NestedLayoutsSpinner />}>
                        <Outlet />
                    </Suspense>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
