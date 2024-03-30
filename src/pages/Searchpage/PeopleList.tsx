import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Spinner, Text, Button, Image } from "@chakra-ui/react";
import { searchUsers } from "../../api/user";
import { IUser } from "../../types/user";

export default function PeopleList() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [sp, setSp] = useSearchParams();
    const query = sp.get("query");

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

function UserBox({ user }: { user: IUser }) {
    return (
        <Box
            mt="5"
            display="flex"
            alignItems="start"
            justifyContent="space-between"
            gap="4"
            w="full"
        >
            <Box display="flex">
                <Image
                    w="60px"
                    src={user.profilePicture}
                    rounded="full"
                    objectFit={"cover"}
                />
                <Box ml="4">
                    <Text fontWeight={"bold"} fontSize="lg">
                        {user.fullname}
                    </Text>
                    <Text fontSize={"sm"} color="gray.500">
                        {user.about}
                    </Text>
                </Box>
            </Box>
            <Button
                variant="outline"
                rounded="full"
                borderColor="black"
                px="6"
                py="2"
                pt="2.5"
                size="sm"
                my="auto"
            >
                Follow
            </Button>
        </Box>
    );
}
