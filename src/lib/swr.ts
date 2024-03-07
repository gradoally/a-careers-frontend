import type {ApiResult} from "@/openapi/client/core/ApiResult";


class SWRError extends Error {
    public readonly url: string;
    public readonly status: number;
    public readonly statusText: string;
    public readonly body: any;

    constructor(response: ApiResult, message: string) {
        super(message);

        this.name = 'SWRError';
        this.url = response.url;
        this.status = response.status;
        this.statusText = response.statusText;
        this.body = response.body;
    }
}

export const fetcher = async (url: string) => {
    const response = await fetch(url)
    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!response.ok) {
        throw new SWRError(response, 'An error occurred while fetching the data.')
    }

    return response.json()
}
