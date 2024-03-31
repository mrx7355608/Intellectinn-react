import { useEffect, useState } from "react";
import ArticlesList from "../../components/Articles/ArticlesList";
import { getUserArticles } from "../../api/articles";
import { IArticle } from "../../types/articles";
import { Spinner, Text } from "@chakra-ui/react";

export default function Publications() {
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [articles, setArticles] = useState<IArticle[]>([]);

    // Fetch user articles
    useEffect(() => {
        getUserArticles()
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
