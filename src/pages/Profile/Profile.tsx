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
import { useAuthContext } from "../../context/auth";

export default function Profile() {
    const { user } = useAuthContext();

    return (
        <Box minH="100vh" display="flex" alignItems="start" p="0">
            <Box w="68vw" p="12" mt="16">
                <Heading>{user?.name}</Heading>
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
                <Image
                    src={user?.profilePicture}
                    w="90px"
                    h="90px"
                    objectFit="cover"
                    rounded="full"
                />
                <Text fontWeight="bold" mt="5">
                    {user?.name}
                </Text>
                <Link to="/settings">
                    <Text
                        color="teal.500"
                        fontSize="sm"
                        mt="7"
                        textDecoration="underline"
                    >
                        Edit profile
                    </Text>
                </Link>
            </Box>
        </Box>
    );
}
