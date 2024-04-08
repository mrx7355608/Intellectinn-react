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
import { FaPlus } from "react-icons/fa6";
import { Outlet, Link } from "react-router-dom";
import NestedLayoutsSpinner from "../../components/Spinners/NestedLayoutsSpinner";
import { Suspense, useState } from "react";
import InterestsModal from "./InterestsModal";
import { useAuthContext } from "../../context/auth";

export default function Userpage() {
    const { user } = useAuthContext();

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
                        {user!.topicsInterestedIn.map((t) => (
                            <Link to={`/user?tag=${t}`}>
                                <Tab py="2" whiteSpace={"nowrap"} m="0">
                                    {t}
                                </Tab>
                            </Link>
                        ))}
                        <Tab>
                            <InterestsModal />
                        </Tab>
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
