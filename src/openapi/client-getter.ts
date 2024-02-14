import {FetchClient} from "@/openapi/client";
import {BASE_URL, DEFAULT_LOCALE} from "@/lib/constants";

export function fetchClientGetter(props: {
    next?: NextFetchRequestConfig | undefined
    locale?: string
}={}): FetchClient {
    // Get cookie

    const config: {
        BASE: string | undefined,
        HEADERS: Record<string, string>,
        TOKEN?: string,
        NEXT?: NextFetchRequestConfig
    } = {
        BASE: BASE_URL,
        HEADERS: {
            'Accept-Language': props?.locale ?? DEFAULT_LOCALE
        },
        NEXT: props?.next,
    }
    return new FetchClient(config);
}

