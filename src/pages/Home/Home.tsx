import Hero from "./Hero";
import { Box, Spinner, Text } from "@chakra-ui/react";
import ArticlesList from "../../components/Articles/ArticlesList";
import useFetch from "../../hooks/useFetch";

export default function Home() {
    const { loading, err, articles } = useFetch("/api/articles/published");

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
