import { Text, Box, Spinner } from "@chakra-ui/react";
import { IArticle } from "../../types/articles";
import useFetch from "../../hooks/useFetch";
import ArticlesList from "../../components/Articles/ArticlesList";

export default function Bookmarks() {
    const {
        loading,
        err,
        data: bookmarkedArticles,
    } = useFetch<IArticle>("/api/bookmarks/articles");

    return (
        <Box display="flex" flexDirection={"column"}>
            {loading ? (
                <Spinner />
            ) : err ? (
                <Text color="red.600">{err}</Text>
            ) : (
                <ArticlesList articles={bookmarkedArticles} />
            )}
        </Box>
    );
}
