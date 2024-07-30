import { useSearchParams } from "react-router-dom";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { IUser } from "../../types/user";
import UserBox from "../../components/UserBoxComponent";
import useFetch from "../../hooks/useFetch";

export default function PeopleList() {
    const [sp, setSp] = useSearchParams();
    const query = sp.get("query");
    const {
        loading,
        err,
        data: users,
    } = useFetch<IUser>(`/api/users/search?user=${query}`);

    return (
        <Box display="flex" flexDirection={"column"}>
            {loading ? (
                <Spinner />
            ) : err ? (
                <Text color="red.600">{err}</Text>
            ) : (
                users.map((user) => {
                    return <UserBox user={user} />;
                })
            )}
        </Box>
    );
}
