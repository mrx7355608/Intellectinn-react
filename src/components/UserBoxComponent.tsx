import { IUser } from "../types/user";
import { Box, Image, Text } from "@chakra-ui/react";
import FollowAndUnfollowButtons from "../pages/SingleArticle/FollowAndUnfollowButtons";
import { Link } from "react-router-dom";

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
                    <Link to={`/profile/${user._id}`}>
                        <Text
                            fontWeight={"bold"}
                            fontSize="lg"
                            _hover={{ textDecor: "underline" }}
                        >
                            {user.fullname}
                        </Text>
                    </Link>
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
