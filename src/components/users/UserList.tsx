import { IUser } from "../../types/user";
import { VStack, Text } from "@chakra-ui/react";
import UserItem from "./UserItem";

export default function UserList({ users }: { users: IUser[] }) {
    return (
        <VStack alignItems={"start"}>
            {users.length > 0 ? (
                users.map((user) => {
                    return <UserItem key={user._id} user={user} />;
                })
            ) : (
                <Text>Nothing to show</Text>
            )}
        </VStack>
    );
}
