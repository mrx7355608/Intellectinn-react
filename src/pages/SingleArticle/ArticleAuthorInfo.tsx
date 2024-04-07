import { Box, Image, Text } from "@chakra-ui/react";
import FollowAndUnfollowButtons from "./FollowAndUnfollowButtons";
import { IArticle } from "../../types/articles";

export default function ArticleAuthorInfo({ article }: { article: IArticle }) {
    return (
        <Box display="flex" w="full" justifyContent={"start"} mt="10" gap="4">
            <Image
                src={article.author.profilePicture}
                rounded="full"
                objectFit={"cover"}
                w="55px"
                h="55px"
            />
            <Box>
                <Text fontSize="md" fontWeight={"medium"}>
                    {article.author.fullname}
                </Text>
                <Text fontSize="sm" color="gray.500">
                    {article.timeToReadInMinutes} min read &middot;{" "}
                    {new Date(article.createdAt).toDateString()}
                </Text>
            </Box>
            <FollowAndUnfollowButtons authorID={article.author._id} />
        </Box>
    );
}
