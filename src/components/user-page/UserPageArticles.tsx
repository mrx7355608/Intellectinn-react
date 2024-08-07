import { Spinner, Text } from "@chakra-ui/react";
import ArticlesList from "../article/ArticlesList";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { IArticle } from "../../types/articles";

export default function UserPageArticles() {
    // eslint-disable-next-line
    const [sp, _setSp] = useSearchParams();
    const tag = sp.get("tag");

    const noTagUrl = "/api/articles/published";
    const withTagUrl = `/api/articles/published?tag=${tag}`;
    const {
        loading,
        err,
        data: articles,
    } = useFetch<IArticle>(tag ? withTagUrl : noTagUrl);

    // Render the articles list
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
