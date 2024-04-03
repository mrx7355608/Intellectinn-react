import { IUser } from "../types/user";
import { Box, Image, Text } from "@chakra-ui/react";
import FollowAndUnfollowButtons from "../pages/SingleArticle/FollowAndUnfollowButtons";

export default function UserBox({ user }: { user: IUser }) {
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

            {/* follow and unfollow buttons */}
            <FollowAndUnfollowButtons authorID={user._id} />
        </Box>
    );
}
