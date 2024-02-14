import {FetchClient} from "@/openapi/client";


const baseURL = process.browser ? process.env.NEXT_PUBLIC_BASE_URL : process.env.NEXT_PUBLIC_BASE_SERVER_URL


// Create the client instance with server and authentication details

export const fetchClient = new FetchClient({
    BASE: baseURL,
})
