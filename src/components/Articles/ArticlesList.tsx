import Article from "./Article";
import { Box, Text } from "@chakra-ui/react";
import { IArticle } from "../../types/articles";

export default function ArticlesList({ articles }: { articles: IArticle[] }) {
    return (
        <Box display="flex" flexDirection="column" gap={"8"}>
            {articles.length > 2 ? (
                articles.map((article) => {
                    return <Article article={article} />;
                })
            ) : (
                <Text>Nothing to show</Text>
            )}
        </Box>
    );
}
