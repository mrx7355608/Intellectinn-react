import { Heading, Box, Text, Image } from "@chakra-ui/react";
import { IArticle } from "../../types/articles";
import { Link } from "react-router-dom";

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
                <Link to={`/${article.slug}`}>
                    <Heading
                        fontSize="xl"
                        w="full"
                        _hover={{ textDecor: "underline" }}
                    >
                        {article.title}
                    </Heading>
                </Link>
                {article.summary.length <= 200 ? (
                    <Text mt="2" w="full" whiteSpace={"wrap"}>
                        {article.summary}
                    </Text>
                ) : (
                    <Text mt="2" w="full" whiteSpace={"wrap"}>
                        {article.summary.substring(0, 200)}...
                    </Text>
                )}
            </Box>
            <Image src={article.thumbnail} alt="thumbnail" w="150px" h="full" />
        </Box>
    );
}
