import { Box, Image, Text } from "@chakra-ui/react";
import { IArticle } from "../../types/articles";
import { Link } from "react-router-dom";

export default function Author({ article }: { article: IArticle }) {
    return (
        <Box display="flex" alignItems="center">
            {/* Profile picture*/}
            <Image
                src={article.author.profilePicture}
                w="20px"
                h="20px"
                rounded="full"
                objectFit="cover"
            />
            {/* Name */}
            <Link to={`/profile/${article.author._id}`}>
                <Text ml="2" fontSize="sm" _hover={{ textDecor: "underline" }}>
                    {article.author.fullname}
                </Text>
            </Link>

            {/* Publish date */}
            <Text ml="1" color="gray.500" fontSize="sm">
                {new Date(article.createdAt).toDateString()}
            </Text>
        </Box>
    );
}
