import { Box, Spinner, Text } from "@chakra-ui/react";
import useFetch from "../../hooks/useFetch";
import UserBox from "../../components/UserBoxComponent";
import { IUser } from "../../types/user";
import { useParams } from "react-router-dom";

export default function Following() {
    const { id } = useParams();
    const {
        loading,
        err,
        data: following,
    } = useFetch<IUser>(`/api/users/following/${id}`);

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
