import { useState, Suspense, useEffect } from "react";
import {
    Tabs,
    TabList,
    Tab,
    Box,
    TabPanels,
    Heading,
    Image,
    Text,
    Spinner,
} from "@chakra-ui/react";
import { Outlet, Link, useParams } from "react-router-dom";
import NestedLayoutsSpinner from "../../components/Spinners/NestedLayoutsSpinner";

import { useAuthContext } from "../../context/auth";
import axiosAgent from "../../api/utils";
import { IApiResponse } from "../../types/api";
import { IUser } from "../../types/user";
import FollowAndUnfollowButtons from "../SingleArticle/FollowAndUnfollowButtons";

export default function Profile() {
    const { id } = useParams();
    const [profile, setProfile] = useState<IUser | null>(null);
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext();

    // Get user profile
    useEffect(() => {
        axiosAgent
            .get<IApiResponse<IUser>>(`/api/users/profile/${id}`, {
                withCredentials: false,
            })
            .then((axiosResp) => axiosResp.data)
            .then((apiResponse) => {
                if (apiResponse.error) {
                    return setApiError(apiResponse.error);
                }
                console.log(apiResponse.data);
                setProfile(apiResponse.data);
            })
            .catch(() => setApiError("Internal server error"))
            .finally(() => setLoading(false));
    }, [id]);

    return (
        <Box minH="100vh" display="flex" alignItems="start" p="0">
            <Box w="68vw" p="12" mt="16">
                {loading ? (
                    <Spinner />
                ) : apiError ? (
                    <Text
                        color="red.600"
                        textAlign="center"
                        fontSize="lg"
                        fontWeight={"medium"}
                    >
                        {apiError}
                    </Text>
                ) : (
                    <>
                        <Heading>{profile?.fullname}</Heading>
                        <Tabs size={"sm"} mt="8">
                            <TabList overflowY="hidden" height={"full"}>
                                <Link to={`/profile/${id}`}>
                                    <Tab py="2" whiteSpace={"nowrap"} m="0">
                                        Publications
                                    </Tab>
                                </Link>
                                <Link to={`/profile/${id}/followers`}>
                                    <Tab py="2" whiteSpace={"nowrap"} m="0">
                                        Followers
                                    </Tab>
                                </Link>
                                <Link to={`/profile/${id}/following`}>
                                    <Tab py="2" whiteSpace={"nowrap"} m="0">
                                        Following
                                    </Tab>
                                </Link>
                                <Link to={`/profile/${id}/about`}>
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
                    </>
                )}
            </Box>
            <Box mt="16" px="12" pt="16">
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
            </Box>
        </Box>
    );
}
