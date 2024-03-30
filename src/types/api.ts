export type IApiResponse<T> = {
    data: T;
    error?: string;
    ok: boolean;
};
