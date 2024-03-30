import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { searchUsers } from "../../api/user";
import { IUser } from "../../types/user";
import UserBox from "./UserBoxComponent";

export default function PeopleList() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [err, setErr] = useState("");
    const [sp, setSp] = useSearchParams();
    const query = sp.get("query");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!query) return;
        searchUsers(query)
            .then((resp) => {
                if (resp.error) {
                    return setErr(resp.error);
                }
                setUsers(resp.data);
            })
            .finally(() => setLoading(false));
    }, [query]);

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
