import { useState, useEffect } from "react";
import { Spinner, Text } from "@chakra-ui/react";
import ArticlesList from "../../components/Articles/ArticlesList";
import { useSearchParams } from "react-router-dom";
import { getArticles } from "../../api/articles";
import { IArticle } from "../../types/articles";

export default function UserPageArticles() {
    const [articles, setArticles] = useState<IArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [sp, setSp] = useSearchParams();

    const tag = sp.get("tag");

    // Fetch articles
    useEffect(() => {
        getArticles(tag)
            .then((resp) => {
                if (resp.error) {
                    setErr(resp.error);
                } else {
                    setArticles(resp.data);
                }
            })
            .finally(() => setLoading(false));
    }, [tag]);
    // Render the articles list
    return (
        <>
            {loading ? (
                <Spinner />
            ) : err ? (
                <Text color="red.600">{err}</Text>
            ) : articles.length < 1 ? (
                <Text>Nothing to show</Text>
            ) : (
                <ArticlesList articles={articles} />
            )}
        </>
    );
}
