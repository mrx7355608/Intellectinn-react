import { Box, Image, Text } from "@chakra-ui/react";
import { IArticle } from "../../types/articles";

export default function Author({ article }: { article: IArticle }) {
    return (
        <Box display="flex" alignItems="center">
            {/* Profile picture*/}
            <Image
                src={article.author.profilePicture}
                w="19px"
                rounded="full"
                objectFit="cover"
            />
            {/* Name */}
            <Text ml="2" fontSize="sm">
                {article.author.fullname}
            </Text>

            {/* Publish date */}
            <Text ml="1" color="gray.500" fontSize="sm">
                {new Date(article.createdAt).toDateString()}
            </Text>
        </Box>
    );
}
