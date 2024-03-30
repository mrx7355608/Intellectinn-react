import { Box, Divider } from "@chakra-ui/react";
import ArticleMenu from "./ArticleMenu";
import Author from "./Author";
import TitleAndSummary from "./TitleAndSummary";
import { IArticle } from "../../types/articles";

export default function Article({ article }: { article: IArticle }) {
    return (
        <Box display="flex" flexDirection="column" w="full">
            <Author article={article} />
            <TitleAndSummary article={article} />
            <ArticleMenu article={article} />
            <Divider />
        </Box>
    );
}
