import Article from "./ArticleItem";
import { Box, Text } from "@chakra-ui/react";
import { IArticle } from "../../types/articles";
import { useEffect, useState } from "react";

export default function ArticlesList({
    articles: data,
}: {
    articles: IArticle[];
}) {
    const [articles, setArticles] = useState<IArticle[]>([]);

    useEffect(() => {
        if (data) {
            setArticles(data);
        }
    }, [data]);

    return (
        <Box display="flex" flexDirection="column" gap={"8"}>
            {articles.length > 0 ? (
                articles.map((article) => {
                    return <Article key={article._id} article={article} />;
                })
            ) : (
                <Text>Nothing to show</Text>
            )}
        </Box>
    );
}
