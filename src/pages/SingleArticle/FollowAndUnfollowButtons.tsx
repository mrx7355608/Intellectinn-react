import { Spinner, Button, useToast } from "@chakra-ui/react";
import { useAuthContext } from "../../context/auth";
import { useState } from "react";
import { followUser, unfollowUser } from "../../api/user";

export default function FollowAndUnfollowButtons({
    authorID,
}: {
    authorID: string;
}) {
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
        <>
            {usr?.following.includes(authorID) ? (
                <Button
                    bg="gray.900"
                    rounded="full"
                    px="6"
                    py="2"
                    pt="2.5"
                    size="sm"
                    my="auto"
                    ml="auto"
                    color="white"
                    _hover={{ bg: "gray.900", color: "white" }}
                    onClick={unfollow}
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
                    ml="auto"
                    onClick={follow}
                >
                    {loading.isFollowing ? <Spinner size="sm" /> : "Follow"}
                </Button>
            )}
        </>
    );

    async function follow() {
        setLoading((prev) => ({ ...prev, isFollowing: true }));
        try {
            const { data, error } = await followUser(authorID);
            if (error) {
                // Show error toast
                return toast({
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

    async function unfollow() {
        setLoading((prev) => ({ ...prev, isUnfollowing: true }));
        try {
            const { data, error } = await unfollowUser(authorID);
            if (error) {
                // Show error toast
                return toast({
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
