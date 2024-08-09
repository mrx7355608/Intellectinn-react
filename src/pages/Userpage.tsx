import { Tabs, TabList, Tab, Box, TabPanels } from "@chakra-ui/react";
import { Outlet, Link, useSearchParams } from "react-router-dom";
import NestedLayoutsSpinner from "../components/main/NestedLayoutsSpinner";
import { Suspense, useEffect, useState } from "react";
import InterestsModal from "../components/modals/InterestsModal";
import { useAuth } from "../context/auth";

export default function Userpage() {
    const { user } = useAuth();
    const [sp, _setSp] = useSearchParams();
    const [tabIndex, setTabIndex] = useState(0);

    const tag = sp.get("tag");

    useEffect(() => {
        if (!tag) {
            return setTabIndex(0);
        }
        // Get the index of the tab, user is currently on
        // from his interested topics array.
        // Here, findIndex() method may return undefined so,
        // it will set the default tabIndex to 0. Otherwise,
        // add 1 to the received index (because there's a hardcoded "For you"
        // section in tabs) and set it as the current tabindex
        const tabIdx =
            user?.topicsInterestedIn.findIndex((t) => t === tag) || 0;

        setTabIndex(tabIdx + 1);
    }, [tag, user?.topicsInterestedIn]);

    return (
        <Box w="70vw" p="12" mx="auto">
            <Tabs size={"sm"} mt="12" index={tabIndex}>
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
    );
}
