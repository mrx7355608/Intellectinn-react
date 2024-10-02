import { useState } from "react";
import { Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import useCustomToast from "../../../hooks/useCustomToast";
import { followUser, unfollowUser } from "../../../api/user";
import { useAuth } from "../../../context/auth";

export default function MenuForViewer({ authorID }: { authorID: string }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isUnfollowing, setIsUnfollowing] = useState(false);

    const { user } = useAuth();
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
                            isLoading={isFollowing}
                            disabled={isFollowing}
                        >
                            Follow
                        </Button>
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
            loginUser({ ...user!, following: data });
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
            loginUser({ ...user!, following: data });
            showSuccessToast("User un-followed");
        } catch (err) {
            showErrorToast("Internal server error");
        } finally {
            setIsUnfollowing(false);
        }
    }
}
