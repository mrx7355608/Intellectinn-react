import { IApiResponse } from "../types/api";
import axiosAgent from "./utils";

export async function getUser() {
    const response = await axiosAgent.get<IApiResponse>("/api/users/me");
    return response.data;
}
