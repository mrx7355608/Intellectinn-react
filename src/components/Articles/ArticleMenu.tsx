import { Box, Text, Button, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { IArticle } from "../../types/articles";
import { useAuthContext } from "../../context/auth";

export default function ArticleMenu({ article }: { article: IArticle }) {
    const { user } = useAuthContext();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(false);

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
            <Button
                bg="transparent"
                _hover={{ bg: "transparent" }}
                onClick={toggleBookmark}
                ml="auto"
            >
                {loading ? (
                    <Spinner />
                ) : isBookmarked ? (
                    <FaBookmark />
                ) : (
                    <FaRegBookmark />
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
                                <MenuItem>Delete</MenuItem>
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
                                <MenuItem>Follow</MenuItem>
                                <MenuItem>Unfollow</MenuItem>
                            </MenuList>
                        </>
                    )}
                </Menu>
            )}
        </Box>
    );

    function toggleBookmark() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setIsBookmarked(!isBookmarked);
        }, 3000);
    }
}
