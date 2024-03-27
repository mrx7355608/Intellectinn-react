import axiosAgent from "./utils";

interface IArticle {
    title: string;
    content: string;
    summary: string;
    tags: string[];
    is_published: boolean;
}

export async function createArticle(article: IArticle) {
    const response = await axiosAgent.post("/api/articles", article);
    return response.data;
}
