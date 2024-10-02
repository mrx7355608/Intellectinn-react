import { useState } from "react";
import { Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import useCustomToast from "../../../hooks/useCustomToast";
import { followUser, unfollowUser } from "../../../api/user";
import { useAuth } from "../../../context/auth";

export default function MenuForViewer({ authorID }: { authorID: string }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isUnfollowing, setIsUnfollowing] = useState(false);

    const { updateFollowings } = useAuth();
    const { showSuccessToast, showErrorToast } = useCustomToast();

    return (
        <Menu>
            {({ isOpen }) => (
                <>
                    <MenuButton
                        isActive={isOpen}
                        as={Button}
                        bg="transparent"
                        _hover={{ bg: "transprent" }}
                    >
                        <BsThreeDots size={22} />
                    </MenuButton>
                    <MenuList>
                        <Button
                            width={"full"}
                            variant={"ghost"}
                            rounded={"none"}
                            onClick={follow}
                            fontWeight={"regular"}
                            isLoading={isFollowing}
                            disabled={isFollowing}
                        >
                            Follow
                        </Button>
                        <Button
                            width={"full"}
                            rounded={"none"}
                            variant={"ghost"}
                            fontWeight={"regular"}
                            onClick={unfollow}
                            isLoading={isUnfollowing}
                            disabled={isUnfollowing}
                        >
                            Unfollow
                        </Button>
                    </MenuList>
                </>
            )}
        </Menu>
    );

    async function follow() {
        setIsFollowing(true);
        try {
            const { data, error } = await followUser(authorID);
            if (error) {
                return showErrorToast(error);
            }
            updateFollowings(data);
            showSuccessToast("You are now following this user");
        } catch (err) {
            showErrorToast("Internal server error");
        } finally {
            setIsFollowing(false);
        }
    }

    async function unfollow() {
        setIsUnfollowing(true);
        try {
            const { data, error } = await unfollowUser(authorID);
            if (error) {
                return showErrorToast(error);
            }
            updateFollowings(data);
            showSuccessToast("User un-followed");
        } catch (err) {
            showErrorToast("Internal server error");
        } finally {
            setIsUnfollowing(false);
        }
    }
}
