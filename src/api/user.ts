import { IApiResponse } from "../types/api";
import { IUser } from "../types/user";
import axiosAgent from "./utils";

export async function getUser() {
    const response = await axiosAgent.get<IApiResponse<IUser>>("/api/users/me");
    return response.data;
}

export async function searchUsers(
    query: string,
): Promise<IApiResponse<IUser[]>> {
    const response = await axiosAgent.get(`/api/users/search?user=${query}`);
    return response.data;
}
