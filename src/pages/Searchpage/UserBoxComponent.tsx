import { IUser } from "../../types/user";
import { Box, Image, Button, Text, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useAuthContext } from "../../context/auth";
import { followUser, unfollowUser } from "../../api/user";

export default function UserBox({ user }: { user: IUser }) {
    const { user: usr, setUser } = useAuthContext();
    const toast = useToast({
        duration: 4000,
        isClosable: true,
    });
    const [loading, setLoading] = useState({
        isFollowing: false,
        isUnfollowing: false,
    });

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
                {/* user profile picture */}
                <Image
                    w="60px"
                    src={user.profilePicture}
                    rounded="full"
                    objectFit={"cover"}
                />

                {/* user fullname and about */}
                <Box ml="4">
                    <Text fontWeight={"bold"} fontSize="lg">
                        {user.fullname}
                    </Text>
                    <Text fontSize={"sm"} color="gray.500">
                        {user.about}
                    </Text>
                </Box>
            </Box>

            {/* follow and unfollow buttons */}
            {usr?.following.includes(user._id) ? (
                <Button
                    bg="gray.900"
                    rounded="full"
                    px="6"
                    py="2"
                    pt="2.5"
                    size="sm"
                    my="auto"
                    color="white"
                    _hover={{ bg: "gray.900", color: "white" }}
                    onClick={() => unfollow(user._id)}
                >
                    {loading.isUnfollowing ? <Spinner size="sm" /> : "Unfollow"}
                </Button>
            ) : (
                <Button
                    variant="outline"
                    rounded="full"
                    borderColor="black"
                    px="6"
                    py="2"
                    pt="2.5"
                    size="sm"
                    my="auto"
                    onClick={() => follow(user._id)}
                >
                    {loading.isFollowing ? <Spinner size="sm" /> : "Follow"}
                </Button>
            )}
        </Box>
    );

    async function follow(userID: string) {
        setLoading((prev) => ({ ...prev, isFollowing: true }));
        try {
            const { data, error } = await followUser(userID);
            if (error) {
                // Show error toast
                toast({
                    description: error,
                    status: "error",
                });
            }
            setUser((prev) => ({ ...prev, following: data }));
            toast({
                description: "You are now following this user",
                status: "success",
            });
        } catch (err) {
            toast({
                description: "Internal server error",
                status: "error",
            });
        } finally {
            setLoading((prev) => ({ ...prev, isFollowing: false }));
        }
    }

    async function unfollow(userID: string) {
        setLoading((prev) => ({ ...prev, isUnfollowing: true }));
        try {
            const { data, error } = await unfollowUser(userID);
            if (error) {
                // Show error toast
                toast({
                    description: error,
                    status: "error",
                });
            }
            setUser((prev) => ({ ...prev, following: data }));
            toast({
                description: "User un-followed",
                status: "success",
            });
        } catch (err) {
            toast({
                description: "Internal server error",
                status: "error",
            });
        } finally {
            setLoading((prev) => ({ ...prev, isUnfollowing: false }));
        }
    }
}
