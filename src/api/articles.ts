import { IApiResponse } from "../types/api";
import { IInputArticle } from "../types/articles";
import axiosAgent from "./utils";

export async function createArticle(article: IInputArticle) {
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

export async function deleteArticle(articleID: string) {
    const response = await axiosAgent.delete(`/api/articles/${articleID}`);
    if (response.status !== 204) {
        return response.data;
    }
    return {
        data: null,
        error: null,
    };
}

export async function likeArticle(articleID: string) {
    const response = await axiosAgent.patch<IApiResponse<string[]>>(
        `/api/articles/like/${articleID}`,
    );
    return response.data;
}

export async function unlikeArticle(articleID: string) {
    const response = await axiosAgent.patch<IApiResponse<string[]>>(
        `/api/articles/un-like/${articleID}`,
    );
    return response.data;
}

export async function addBookmark(articleID: string) {
    const response = await axiosAgent.post<IApiResponse<string[]>>(
        `/api/bookmarks/${articleID}`,
    );
    return response.data;
}

export async function removeBookmark(articleID: string) {
    const response = await axiosAgent.delete<IApiResponse<string[]>>(
        `/api/bookmarks/${articleID}`,
    );
    return response.data;
}
