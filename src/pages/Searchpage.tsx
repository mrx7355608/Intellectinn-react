import { useState, useEffect, Suspense } from "react";
import { useLocation, useSearchParams, Outlet } from "react-router-dom";
import { Tabs, Box, TabPanels, Heading } from "@chakra-ui/react";
import NestedLayoutsSpinner from "../components/main/NestedLayoutsSpinner";
import MyTabsList from "../components/main/MyTabsList";
import ErrorBoundary from "../components/main/ErrorBoundary"
import FallbackUI from "../components/main/FallbackUI"

export default function Searchpage() {
    const [searchParams, _setSearchParams] = useSearchParams();
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

    const tabsList = [
        {
            title: "Articles",
            link: `/search?query=${searchParams.get("query")}`,
        },
        {
            title: "People",
            link: `/search/people?query=${searchParams.get("query")}`,
        },
        {
            title: "Topics",
            link: `/search/topics?query=${searchParams.get("query")}`,
        },
    ];

    return (
        <Box mt="12" p="12" w="70vw" mx="auto">
            <Heading display={"inline"} color={"#2d2d2d"}>
                Results for
            </Heading>
            <Heading display={"inline"}> {searchParams.get("query")}</Heading>

            <Tabs size={"sm"} mt="8" index={tabIndex}>
                <MyTabsList tabs={tabsList} />
                <ErrorBoundary fallback={<FallbackUI/>}>
                    <TabPanels py="10">
                        <Suspense fallback={<NestedLayoutsSpinner />}>
                            <Outlet />
                        </Suspense>
                    </TabPanels>
                </ErrorBoundary>
            </Tabs>
        </Box>
    );
}
