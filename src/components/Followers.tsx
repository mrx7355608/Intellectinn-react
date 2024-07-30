import useFetch from "../../hooks/useFetch";
import { IUser } from "../../types/user";
import { Spinner, Text, Box, Image } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export default function Followers() {
    const { id } = useParams();
    const {
        loading,
        err,
        data: following,
    } = useFetch<IUser>(`/api/users/followers/${id}`);

    return (
        <Box display="flex" flexDirection={"column"}>
            {loading ? (
                <Spinner />
            ) : err ? (
                <Text color="red.600">{err}</Text>
            ) : following.length > 0 ? (
                following.map((user) => {
                    return <User user={user} />;
                })
            ) : (
                <Text>Nothing to show</Text>
            )}
        </Box>
    );
}

function User({ user }: { user: IUser }) {
    return (
        <Box
            mb="10"
            display="flex"
            alignItems="start"
            justifyContent="space-between"
            gap="4"
            w="full"
        >
            <Box display="flex">
                {/* user profile picture */}
                <Image
                    w="60px"
                    h="60px"
                    src={user.profilePicture}
                    rounded="full"
                    objectFit={"cover"}
                />

                {/* user fullname and about */}
                <Box ml="4">
                    <Text fontWeight={"bold"} fontSize="lg">
                        {user.fullname}
                    </Text>
                    {user.about ? (
                        <Text color="gray.500" mr="6">
                            {user.about.substring(0, 60)}...
                        </Text>
                    ) : (
                        <Text fontStyle={"italic"} color="gray.500">
                            No about content provided
                        </Text>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
