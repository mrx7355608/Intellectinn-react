import { Box, Button, Text } from "@chakra-ui/react";
import { FaRegComment } from "react-icons/fa";
import { IArticle } from "../../types/articles";
import BookmarkButton from "./BookmarkButton";
import LikeButton from "./buttons/LikeButton";

export default function ArticlePageCTA({ article }: { article: IArticle }) {
    return (
        <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems={"center"}
            w="full"
        >
            <Box>
                {/* Likes button */}
                <LikeButton article={article} />

                {/* Comments button */}
                <Button
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                    ml="auto"
                    color="gray.500"
                >
                    <FaRegComment size={20} color="inherit" />
                    <Text ml="1" color="gray.500">
                        2
                    </Text>
                </Button>
            </Box>
            {/* Bookmark button */}
            <BookmarkButton article={article} />
            <Text as="span" ml="2">
                {article.bookmarkedBy.length}
            </Text>
        </Box>
    );
}
