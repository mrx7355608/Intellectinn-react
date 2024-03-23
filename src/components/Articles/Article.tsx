import { Box, Divider } from "@chakra-ui/react";
import ArticleMenu from "./ArticleMenu";
import Author from "./Author";
import TitleAndSummary from "./TitleAndSummary";

export default function Article() {
    return (
        <Box display="flex" flexDirection="column" w="full">
            <Author />
            <TitleAndSummary />
            <ArticleMenu />
            <Divider />
        </Box>
    );
}
