interface IApiResponse<T> {
    ok: boolean;
    data: T;
    error?: string;
}

export default async function fetchFromServer<T>(
    endpoint: string,
    options: RequestInit
): Promise<IApiResponse<T>> {
    const url = "http://localhost:8000" + endpoint;
    const response = await fetch(url, options);
    const result: IApiResponse<T> = await response.json();
    return result;
}
