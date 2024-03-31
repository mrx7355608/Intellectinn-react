import { Box, Spinner, Text } from "@chakra-ui/react";
import useFetch from "../../hooks/useFetch";
import UserBox from "../../components/UserBoxComponent";
import { useAuthContext } from "../../context/auth";
import { IUser } from "../../types/user";

export default function Following() {
    const { user } = useAuthContext();
    const {
        loading,
        err,
        data: following,
    } = useFetch<IUser>(`/api/users/following/${user!._id}`);

    return (
        <Box display="flex" flexDirection={"column"}>
            {loading ? (
                <Spinner />
            ) : err ? (
                <Text color="red.600">{err}</Text>
            ) : (
                following.map((user) => {
                    return <UserBox user={user} />;
                })
            )}
        </Box>
    );
}
