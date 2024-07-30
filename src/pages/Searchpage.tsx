import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { Tabs, TabList, Tab, Box, TabPanels, Heading } from "@chakra-ui/react";
import NestedLayoutsSpinner from "../components/Spinners/NestedLayoutsSpinner";

export default function Searchpage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [tabIndex, setTabIndex] = useState(0);
    const { pathname } = useLocation();

    useEffect(() => {
        const changeTabIndex = () => {
            // Change tab index according to route
            // so that correct tab will be selected when page reloads
            switch (pathname) {
                case "/search":
                    setTabIndex(0);
                    break;

                case "/search/people":
                    setTabIndex(1);
                    break;

                case "/search/topics":
                    setTabIndex(2);
                    break;
            }
        };

        changeTabIndex();
    }, [pathname, searchParams]);

    return (
        <Box mt="12" p="12" w="70vw" mx="auto">
            <Heading display={"inline"} color={"#2d2d2d"}>
                Results for
            </Heading>
            <Heading display={"inline"}> {searchParams.get("query")}</Heading>

            <Tabs size={"sm"} mt="8" index={tabIndex}>
                <TabList overflowY="hidden" height={"full"}>
                    <Link to={`/search?query=${searchParams.get("query")}`}>
                        <Tab py="2" whiteSpace={"nowrap"} m="0">
                            Articles
                        </Tab>
                    </Link>
                    <Link
                        to={`/search/people?query=${searchParams.get("query")}`}
                    >
                        <Tab py="2" whiteSpace={"nowrap"} m="0">
                            People
                        </Tab>
                    </Link>
                    <Link
                        to={`/search/topics?query=${searchParams.get("query")}`}
                    >
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
