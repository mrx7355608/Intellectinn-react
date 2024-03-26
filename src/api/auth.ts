import { IUser } from "../types/user";
import axiosAgent from "./utils";

type ILogin = { email: string; password: string };
type ISignup = ILogin & {
    fullname: string;
    confirm_password: string;
};

type IApiResponse = {
    data: IUser;
    error?: string;
    ok: boolean;
};

export async function login(creds: ILogin): Promise<IApiResponse> {
    const response = await axiosAgent.post<IApiResponse>(
        "/api/auth/login",
        creds,
    );
    return response.data;
}

export async function signup(creds: ISignup): Promise<IApiResponse> {
    const response = await axiosAgent.post<IApiResponse>(
        "/api/auth/signup",
        creds,
    );
    return response.data;
}
