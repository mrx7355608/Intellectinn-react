import {
    Tabs,
    TabList,
    Tab,
    Box,
    TabPanels,
    Heading,
    Image,
    Text,
} from "@chakra-ui/react";
import { Outlet, Link } from "react-router-dom";
import NestedLayoutsSpinner from "../../components/Spinners/NestedLayoutsSpinner";
import { Suspense } from "react";

export default function Profile() {
    return (
        <Box minH="100vh" display="flex" alignItems="start" p="0">
            <Box w="68vw" p="12" mt="16">
                <Heading>Fawad Imran</Heading>
                <Tabs size={"sm"} mt="8">
                    <TabList overflowY="hidden" height={"full"}>
                        <Link to="/profile">
                            <Tab py="2" whiteSpace={"nowrap"} m="0">
                                Your publications
                            </Tab>
                        </Link>
                        <Link to="/profile/about">
                            <Tab py="2" whiteSpace={"nowrap"} m="0">
                                About
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
            <Box mt="16" px="12" pt="16">
                <Image src="/vite.svg" w="50px" objectFit="cover" />
                <Text fontWeight="bold" mt="7">
                    Fawad Imran
                </Text>
                <Link to="/settings">
                    <Text color="teal.600" fontSize="sm" mt="7">
                        Edit profile
                    </Text>
                </Link>
            </Box>
        </Box>
    );
}
