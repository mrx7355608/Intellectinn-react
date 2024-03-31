import ArticlesList from "../../components/Articles/ArticlesList";
import { Spinner, Text } from "@chakra-ui/react";
import useFetch from "../../hooks/useFetch";
import { IArticle } from "../../types/articles";

export default function Publications() {
    const {
        loading,
        err,
        data: articles,
    } = useFetch<IArticle>("/api/articles/published/me");

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
