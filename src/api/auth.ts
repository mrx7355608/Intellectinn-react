import { IApiResponse } from "../types/api";
import { IUser } from "../types/user";
import axiosAgent from "./utils";

type ILogin = { email: string; password: string };
type ISignup = ILogin & {
    fullname: string;
    confirm_password: string;
};

export async function login(creds: ILogin) {
    const response = await axiosAgent.post<IApiResponse<IUser>>(
        "/api/auth/login",
        creds
    );
    return response.data;
}

export async function signup(creds: ISignup) {
    const response = await axiosAgent.post<IApiResponse<IUser>>(
        "/api/auth/signup",
        creds
    );
    return response.data;
}

export async function logout() {
    const response = await axiosAgent.post<IApiResponse<IUser>>(
        "/api/auth/logout"
    );
    return response.data;
}
