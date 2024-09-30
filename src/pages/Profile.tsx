import { useState, Suspense, useEffect } from "react";
import {
    Tabs,
    Box,
    TabPanels,
    Heading,
    Image,
    Text,
    Spinner,
} from "@chakra-ui/react";
import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import MyTabsList from "../components/main/MyTabsList";
import NestedLayoutsSpinner from "../components/main/NestedLayoutsSpinner";
import FollowAndUnfollowButtons from "../components/single-article/FollowAndUnfollowButtons";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../context/auth";
import { IUser } from "../types/user";

export default function Profile() {
    const { id } = useParams();
    const { user } = useAuth();
    const { pathname } = useLocation();
    const [tabIndex, setTabIndex] = useState(0);
    const { loading, err, data: profile } = useFetch<IUser>(`/api/users/${id}`);

    const tabsList = [
        {
            title: "Publications",
            link: `/profile/${id}/publications`,
        },
        {
            title: "Bookmarks",
            link: `/profile/${id}/bookmarks`,
        },
        {
            title: "Followers",
            link: `/profile/${id}/followers`,
        },
        {
            title: "Following",
            link: `/profile/${id}/following`,
        },
        {
            title: "About",
            link: `/profile/${id}/about`,
        },
    ];

    // Set correct tab index on page load
    useEffect(() => {
        const changeTabIndex = () => {
            // Change tab index according to route
            // so that correct tab will be selected when page reloads
            switch (pathname) {
                case `/profile/${id}`:
                    setTabIndex(0);
                    break;
                case `/profile/${id}/bookmarks`:
                    setTabIndex(1);
                    break;
                case `/profile/${id}/followers`:
                    setTabIndex(2);
                    break;
                case `/profile/${id}/following`:
                    setTabIndex(3);
                    break;
                case `/profile/${id}/about`:
                    setTabIndex(4);
                    break;
            }
        };

        changeTabIndex();
    }, [id, pathname]);

    // TODO: fix profile page rendering logic

    return (
        <Box minH="100vh" display="flex" alignItems="start" p="0">
            {/* First half of user's profile where PUBLICATIONS, BOOKMARKS, etc are shown */}
            <Box w="68vw" p="12" mt="16">
                {loading && <Spinner />}
                {err && <Text color="red.600">{err}</Text>}
                {profile && (
                    <>
                        <Heading>{profile.fullname}</Heading>
                        <Tabs size={"sm"} mt="8" defaultIndex={tabIndex}>
                            <MyTabsList tabs={tabsList} />
                            <TabPanels py="10">
                                <Suspense fallback={<NestedLayoutsSpinner />}>
                                    <Outlet />
                                </Suspense>
                            </TabPanels>
                        </Tabs>
                    </>
                )}
            </Box>

            {/* Second half of user's profile */}
            <Box mt="16" px="12" pt="16">
                {loading && <Spinner />}
                {err && <Text color="red.600">{err}</Text>}
                {
                    profile && (
                        <>
                            <Image
                                src={profile?.profilePicture}
                                w="90px"
                                h="90px"
                                objectFit="cover"
                                rounded="full"
                            />
                            <Text fontWeight="bold" mt="5" mb="8">
                                {profile?.fullname}
                            </Text>
                            {profile && user?._id !== profile?._id ? (
                                <FollowAndUnfollowButtons authorID={profile._id} />
                            ) : (
                                <Link to="/settings">
                                    <Text
                                        color="teal.500"
                                        fontSize="sm"
                                        textDecoration="underline"
                                    >
                                        Edit profile
                                    </Text>
                                </Link>
                            )}
                        </>
                    )
                }
            </Box>
        </Box>
    );
}
