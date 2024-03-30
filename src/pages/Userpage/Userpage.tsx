import {
    Tabs,
    TabList,
    Tab,
    Box,
    TabPanels,
    Text,
    Heading,
    Image,
    Button,
} from "@chakra-ui/react";
import Author from "../../components/Articles/Author";
import { Outlet, Link } from "react-router-dom";
import NestedLayoutsSpinner from "../../components/Spinners/NestedLayoutsSpinner";
import { Suspense } from "react";

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
                        <Link to={`/user`}>
                            <Tab py="2" whiteSpace={"nowrap"} m="0">
                                For you
                            </Tab>
                        </Link>
                        {tags.map((t) => (
                            <Link to={`/user?tag=${t}`}>
                                <Tab py="2" whiteSpace={"nowrap"} m="0">
                                    {t}
                                </Tab>
                            </Link>
                        ))}
                    </TabList>

                    <TabPanels py="10">
                        <Suspense fallback={<NestedLayoutsSpinner />}>
                            <Outlet />
                        </Suspense>
                    </TabPanels>
                </Tabs>
            </Box>

            {/* side content */}
            <Box
                display="flex"
                flexDirection="column"
                p="10"
                borderLeft="1px"
                borderColor="gray.200"
                minH="100vh"
            >
                {/* editor's pick */}

                {/* recommended topics */}

                {/* users to follow */}
            </Box>
        </Box>
    );
}
