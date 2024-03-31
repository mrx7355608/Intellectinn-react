import Hero from "./Hero";
import { IArticle } from "../../types/articles";
import { useState, useEffect } from "react";
import { getArticles } from "../../api/articles";
import { Box, Spinner, Text } from "@chakra-ui/react";
import ArticlesList from "../../components/Articles/ArticlesList";

export default function Home() {
    const [articles, setArticles] = useState<IArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        getArticles(null)
            .then((resp) => {
                if (resp.error) {
                    setErr(resp.error);
                } else {
                    setArticles(resp.data);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <Hero />
            <Box p="12">
                {loading ? (
                    <Spinner />
                ) : err ? (
                    <Text color="red.600">{err}</Text>
                ) : (
                    <ArticlesList articles={articles} />
                )}
            </Box>
        </>
    );
}
