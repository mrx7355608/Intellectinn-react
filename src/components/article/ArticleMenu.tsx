import { Spinner, Box, Text, Button, useToast } from "@chakra-ui/react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { IArticle } from "../../types/articles";
import { useAuth } from "../../context/auth";
import DeleteArticleConfirmationModal from "../modals/DeleteArticleConfirmationModal";
import { useState } from "react";
import { addBookmark, removeBookmark } from "../../api/articles";

export default function ArticleMenu({
    filterArticle,
    article,
}: {
    filterArticle: (id: string) => void;
    article: IArticle;
}) {
    const { user } = useAuth();
    const [bookmarks, setBookmarks] = useState(article.bookmarkedBy);
    const [loading, setLoading] = useState(false);
    const toast = useToast({
        isClosable: true,
        duration: 4000,
    });

    return (
        <Box mb="8" display={"flex"} alignItems={"center"} w={"80%"}>
            {/* Tag */}
            <Text
                rounded="full"
                px="3"
                py="1"
                bg="gray.100"
                color="gray.500"
                fontWeight="medium"
                w="max-content"
                fontSize="sm"
            >
                {article.tags[0]}
            </Text>

            {/* Total read time in minutes */}
            <Text ml="4" color="gray.500" w="max-content" fontSize="sm">
                {article.timeToReadInMinutes} min read
            </Text>

            {/* Bookmark btn */}
            <Button bg="transparent" _hover={{ bg: "transparent" }} ml="auto">
                {loading ? (
                    <Spinner />
                ) : user && bookmarks.includes(user._id) ? (
                    <FaBookmark onClick={deleteBookmark} />
                ) : (
                    <FaRegBookmark onClick={createBookmark} />
                )}
            </Button>
            {article.author._id === user?._id ? (
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
                                <MenuItem>Edit</MenuItem>
                                <MenuItem>
                                    <DeleteArticleConfirmationModal
                                        articleID={article._id}
                                        filterArticle={filterArticle}
                                    />
                                </MenuItem>
                            </MenuList>
                        </>
                    )}
                </Menu>
            ) : (
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
                                <MenuItem>Follow author</MenuItem>
                                <MenuItem>Unfollow author</MenuItem>
                            </MenuList>
                        </>
                    )}
                </Menu>
            )}
        </Box>
    );

    async function createBookmark() {
        try {
            setLoading(true);
            const { data, error } = await addBookmark(article._id);
            if (error) {
                return toast({ status: "error", description: error });
            }
            setBookmarks(data);
        } catch (err) {
            toast({ status: "error", description: "Internal server error" });
        } finally {
            setLoading(false);
        }
    }
    async function deleteBookmark() {
        try {
            setLoading(true);
            const { data, error } = await removeBookmark(article._id);
            if (error) {
                return toast({ status: "error", description: error });
            }
            setBookmarks(data);
        } catch (err) {
            toast({ status: "error", description: "Internal server error" });
        } finally {
            setLoading(false);
        }
    }
}
