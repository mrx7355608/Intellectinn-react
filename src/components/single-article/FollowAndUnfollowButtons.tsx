import { Button } from "@chakra-ui/react";
import { useAuth } from "../../context/auth";
import { useState } from "react";
import { followUser, unfollowUser } from "../../api/user";
import useCustomToast from "../../hooks/useCustomToast";

export default function FollowAndUnfollowButtons({
    authorID,
}: {
    authorID: string;
}) {
    const { user: usr, loginUser } = useAuth();
    const { showSuccessToast, showErrorToast } = useCustomToast();

    const [loading, setLoading] = useState({
        isFollowing: false,
        isUnfollowing: false,
    });

    const isUserHimself = () => {
        return usr?._id !== authorID;
    };
    const isFollower = () => {
        return usr?.following.includes(authorID);
    };

    return (
        <>
            {isUserHimself() ? (
                isFollower() ? (
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
                        isLoading={loading.isUnfollowing}
                        disabled={loading.isUnfollowing}
                    >
                        Unfollow
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
                        isLoading={loading.isFollowing}
                        disabled={loading.isFollowing}
                    >
                        Follow
                    </Button>
                )
            ) : null}
        </>
    );

    async function follow() {
        setLoading((prev) => ({ ...prev, isFollowing: true }));
        try {
            const { data, error } = await followUser(authorID);
            if (error) {
                return showErrorToast(error);
            }
            loginUser({ ...usr!, following: data });
            showSuccessToast("You are now following this user");
        } catch (err) {
            showErrorToast("Internal server error");
        } finally {
            setLoading((prev) => ({ ...prev, isFollowing: false }));
        }
    }

    async function unfollow() {
        setLoading((prev) => ({ ...prev, isUnfollowing: true }));
        try {
            const { data, error } = await unfollowUser(authorID);
            if (error) {
                return showErrorToast(error);
            }
            loginUser({ ...usr!, following: data });
            showSuccessToast("User un-followed");
        } catch (err) {
            showErrorToast("Internal server error");
        } finally {
            setLoading((prev) => ({ ...prev, isUnfollowing: false }));
        }
    }
}
