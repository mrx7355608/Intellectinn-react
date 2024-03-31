import React from "react";
import useFetch from "../../hooks/useFetch";
import { IUser } from "../../types/user";
import { useAuthContext } from "../../context/auth";
import { Spinner, Text, Box } from "@chakra-ui/react";
import UserBox from "../../components/UserBoxComponent";

export default function Followers() {
    const { user } = useAuthContext();
    const {
        loading,
        err,
        data: following,
    } = useFetch<IUser>(`/api/users/followers/${user?._id}`);

    return (
        <Box display="flex" flexDirection={"column"}>
            {loading ? (
                <Spinner />
            ) : err ? (
                <Text color="red.600">{err}</Text>
            ) : following.length > 0 ? (
                following.map((user) => {
                    return <UserBox user={user} />;
                })
            ) : (
                <Text>Nothing to show</Text>
            )}
        </Box>
    );
}
