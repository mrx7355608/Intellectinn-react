import { IApiResponse } from "../types/api";
import { IArticle } from "../types/articles";
import axiosAgent from "./utils";

export async function createArticle(article: IArticle) {
    const response = await axiosAgent.post("/api/articles", article);
    return response.data;
}

export async function uploadThumbnailToCloudinary(file: File) {
    const cloudName = import.meta.env.VITE_CLOUDNAME;
    const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const cloudinaryURL = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const response = await axiosAgent.post(cloudinaryURL, formData, {
        withCredentials: false,
    });
    return response;
}

export async function searchTags(
    query: string,
): Promise<IApiResponse<string[]>> {
    const response = await axiosAgent.get(
        `/api/articles/search/tags?tags=${query}`,
    );
    return response.data;
}

export async function searchArticles(
    query: string,
): Promise<IApiResponse<IArticle[]>> {
    const response = await axiosAgent.get(
        `/api/articles/search?articles=${query}`,
    );
    return response.data;
}

export async function getArticles(query: string | null) {
    let response;
    if (!query) {
        response = await axiosAgent.get<IApiResponse<IArticle[]>>(
            "/api/articles/published",
        );
    } else {
        response = await axiosAgent.get<IApiResponse<IArticle[]>>(
            `/api/articles/published?tag=${query}`,
        );
    }

    return response.data;
}
