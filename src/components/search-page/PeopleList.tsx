import { useSearchParams } from "react-router-dom";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { IUser } from "../../types/user";
import UserBox from "../users/UserItem";
import useFetch from "../../hooks/useFetch";

export default function PeopleList() {
    const [sp, _setSp] = useSearchParams();
    const query = sp.get("query");
    const {
        loading,
        err,
        data: users,
    } = useFetch<IUser[]>(`/api/users/search?user=${query}`);

    // TODO: make a UserList component out of the below users.map()
    // to show a response when users are empty

    return (
        <Box display="flex" flexDirection={"column"}>
            {loading && <Spinner />}
            {err && <Text color="red.600">{err}</Text>}
            {users &&
                users.map((user) => {
                    return <UserBox user={user} />; // TODO: rename this to UserItem
                })}
        </Box>
    );
}
