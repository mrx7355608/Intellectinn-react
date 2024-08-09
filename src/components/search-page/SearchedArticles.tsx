import ArticlesList from "../article/ArticlesList";
import { useSearchParams } from "react-router-dom";
import { IArticle } from "../../types/articles";
import { Text, Spinner } from "@chakra-ui/react";
import useFetch from "../../hooks/useFetch";

export default function SearchedArticles() {
    const [sp, _setSp] = useSearchParams();
    const query = sp.get("query");
    const {
        loading,
        err,
        data: articles,
    } = useFetch<IArticle>(`/api/articles/search?articles=${query}`);

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
