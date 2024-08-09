import { useEffect, useState } from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import AboutModal from "../modals/AboutModal";
import { useAuth } from "../../context/auth";
import { IUser } from "../../types/user";
import { IApiResponse } from "../../types/api";
import axiosAgent from "../../api/utils";
import { useParams } from "react-router-dom";

export default function About() {
    const { user } = useAuth();
    const { id } = useParams();
    const [profile, setProfile] = useState<IUser | null>(null);
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosAgent
            .get<IApiResponse<IUser>>(`/api/users/${id}`, {
                withCredentials: false,
            })
            .then((axiosResp) => axiosResp.data)
            .then((apiResponse) => {
                if (apiResponse.error) {
                    return setApiError(apiResponse.error);
                }
                setProfile(apiResponse.data);
            })
            .catch(() => setApiError("Internal server error"))
            .finally(() => setLoading(false));
    }, [id]);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : apiError ? (
                <Text whiteSpace={"break-spaces"} fontSize="lg" color="red.600">
                    {apiError}
                </Text>
            ) : profile ? (
                profile.about ? (
                    profile._id === user?._id ? (
                        <>
                            <Text whiteSpace={"break-spaces"} fontSize="lg">
                                {profile.about}
                            </Text>
                            <AboutModal />
                        </>
                    ) : (
                        <Text whiteSpace={"break-spaces"} fontSize="lg">
                            {profile.about}
                        </Text>
                    )
                ) : profile._id !== user?._id ? (
                    <Text fontStyle={"italic"} color="gray.500">
                        No about content provided
                    </Text>
                ) : (
                    <Box
                        display="flex"
                        justifyItems={"center"}
                        alignItems={"center"}
                        flexDirection="column"
                        rounded="lg"
                        bg="gray.100"
                        p="16"
                    >
                        <Text fontWeight={"bold"}>
                            Tell the world about yourself
                        </Text>
                        <Text
                            color="gray.600"
                            px="16"
                            textAlign="center"
                            mt="2"
                        >
                            Here's where you can share more about yourself your
                            history, work, experience, accomplishments,
                            interests, dreams, and more.
                        </Text>
                        <AboutModal />
                    </Box>
                )
            ) : null}
        </>
    );
}
