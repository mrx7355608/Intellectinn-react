import { IUser } from "./user";

export type IApiResponse = {
    data: IUser;
    error?: string;
    ok: boolean;
};
