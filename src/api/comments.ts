import axiosAgent from "./utils";
import { IApiResponse } from "../types/api";
import { IComment } from "../types/articles";

export async function postComment(text: string, articleID: string) {
    const response = await axiosAgent.post<IApiResponse<IComment>>(
        `/api/comments/${articleID}`,
        {
            text,
        }
    );
    return response.data;
}

export async function deleteComment(commentID: string) {
    const response = await axiosAgent.delete<IApiResponse<IComment | null>>(
        `/api/comments/${commentID}`
    );
    if (response.status !== 204) {
        return response.data;
    }
    return {
        data: null,
        error: null,
    };
}
