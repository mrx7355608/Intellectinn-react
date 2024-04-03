import { Box, Text, Button } from "@chakra-ui/react";
import { FaRegBookmark } from "react-icons/fa";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { IArticle } from "../../types/articles";
import { useAuthContext } from "../../context/auth";
import DeleteArticleConfirmationModal from "./DeleteArticleConfirmationModal";

export default function ArticleMenu({
    filterArticle,
    article,
}: {
    filterArticle: (id: string) => void;
    article: IArticle;
}) {
    const { user } = useAuthContext();

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
                <FaRegBookmark />
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
}
