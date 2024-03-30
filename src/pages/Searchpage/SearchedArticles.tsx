import { useState, useEffect } from "react";
import ArticlesList from "../../components/Articles/ArticlesList";
import { useSearchParams } from "react-router-dom";
import { searchArticles } from "../../api/articles";
import { IArticle } from "../../types/articles";
import { Text, Spinner } from "@chakra-ui/react";

export default function SearchedArticles() {
    const [articles, setArticles] = useState<IArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [sp, setSp] = useSearchParams();
    const query = sp.get("query");

    useEffect(() => {
        if (!query) return;
        setLoading(true);
        searchArticles(query)
            .then((resp) => {
                if (resp.error) {
                    setErr(resp.error);
                } else {
                    setArticles(resp.data);
                }
            })
            .finally(() => setLoading(false));
    }, [query]);

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
