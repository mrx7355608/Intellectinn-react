import Hero from "../components/home-page/Hero";
import { Box, Spinner, Text } from "@chakra-ui/react";
import ArticlesList from "../components/article/ArticlesList";
import useFetch from "../hooks/useFetch";
import { IArticle } from "../types/articles";
import { useEffect } from "react";
import { useArticles } from "../context/articles";

export default function Home() {
    const { articles, setArticles } = useArticles();
    const { loading, err, data } = useFetch<IArticle[]>(
        "/api/articles/published",
    );

    useEffect(() => {
        if (data) {
            setArticles(data);
        }
    }, [data]);

    return (
        <>
            <Hero />
            <Box p="12">
                {loading && <Spinner />}
                {err && <Text color="red.600">{err}</Text>}
                {articles && <ArticlesList articles={articles} />}
            </Box>
        </>
    );
}
