import { useEffect, useState } from "react";
import axiosAgent from "../api/utils";
import { IApiResponse } from "../types/api";

export default function useFetch<T>(url: string) {
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        setLoading(true);
        axiosAgent
            .get<IApiResponse<T>>(url)
            .then((axiosResp) => axiosResp.data)
            .then((resp) => {
                if (resp.error) {
                    setErr(resp.error);
                } else {
                    setData(resp.data);
                }
            })
            .catch(() => setErr("Internal server error"))
            .finally(() => setLoading(false));
    }, [url]);

    return { loading, err, data };
}
