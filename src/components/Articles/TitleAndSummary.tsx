import { Heading, Box, Text, Image } from "@chakra-ui/react";
import { IArticle } from "../../types/articles";

export default function TitleAndSummary({ article }: { article: IArticle }) {
    return (
        <Box
            display="flex"
            alignItems="start"
            justifyContent="space-between"
            mt="1"
            w="full"
        >
            <Box w="full" mr="7">
                <Heading fontSize="xl" w="full">
                    {article.title}
                </Heading>
                <Text mt="2" w="full" whiteSpace={"wrap"}>
                    {article.summary.substring(0, 200)}...
                </Text>
            </Box>
            <Image src={article.thumbnail} alt="thumbnail" w="150px" h="full" />
        </Box>
    );
}
