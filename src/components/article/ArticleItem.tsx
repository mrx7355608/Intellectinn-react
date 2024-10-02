import { Box, Divider } from "@chakra-ui/react";
import Author from "./Author";
import TitleAndSummary from "./TitleAndSummary";
import { IArticle } from "../../types/articles";
import ArticleItemDetails from "./ArticleItemDetails";

export default function ArticleItem({ article }: { article: IArticle }) {
    return (
        <Box display="flex" flexDirection="column" w="full">
            <Author article={article} />
            <TitleAndSummary article={article} />
            <ArticleItemDetails article={article} />
            <Divider />
        </Box>
    );
}
