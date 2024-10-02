import { Box, Text } from "@chakra-ui/react";
import { useAuth } from "../../context/auth";
import { IArticle } from "../../types/articles";
import BookmarkButton from "./BookmarkButton";
import MenuForAuthor from "./menu/MenuForAuthor";
import MenuForViewer from "./menu/MenuForViewer";

export default function ArticleItemDetails({ article }: { article: IArticle }) {
    const { user } = useAuth();

    const isOwner = () => {
        return user?._id === article.author._id;
    };

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
            <BookmarkButton article={article} />

            {/* Menu */}
            {isOwner() ? (
                <MenuForAuthor article={article} />
            ) : (
                <MenuForViewer authorID={article.author._id} />
            )}
        </Box>
    );
}
