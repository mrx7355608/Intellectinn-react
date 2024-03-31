import ArticlesList from "../../components/Articles/ArticlesList";
import { Spinner, Text } from "@chakra-ui/react";
import useFetch from "../../hooks/useFetch";

export default function Publications() {
    const { loading, err, articles } = useFetch("/api/articles/published/me");

    return (
        <>
            {loading ? (
                <Spinner />
            ) : err ? (
                <Text color="red.600">{err}</Text>
            ) : (
                <ArticlesList articles={articles} />
            )}
        </>
    );
}
