import { useEffect, useState } from "react";
import { IArticle } from "../types/articles";
import axiosAgent from "../api/utils";
import { IApiResponse } from "../types/api";

export default function useFetch(url: string) {
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [articles, setArticles] = useState<IArticle[]>([]);

    useEffect(() => {
        setLoading(true);
        axiosAgent
            .get<IApiResponse<IArticle[]>>(url)
            .then((axiosResp) => axiosResp.data)
            .then((resp) => {
                if (resp.error) {
                    setErr(resp.error);
                } else {
                    setArticles(resp.data);
                }
            })
            .finally(() => setLoading(false));
    }, [url]);

    return { loading, err, articles };
}
