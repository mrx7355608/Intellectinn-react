import { useState, useEffect } from "react";
import ArticlesList from "../../components/Articles/ArticlesList";
import { useSearchParams } from "react-router-dom";

export default function SearchedArticles() {
    const [articles, setArticles] = useState([]);
    const [sp, setSp] = useSearchParams();

    useEffect(() => {
        console.log("fetching for", sp.get("query"));
    }, [sp.get("query")]);

    return <ArticlesList articles={articles} />;
}
