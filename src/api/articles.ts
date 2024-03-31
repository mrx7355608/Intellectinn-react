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
