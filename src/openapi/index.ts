import {FetchClient} from "@/openapi/client";


const baseURL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_BASE_SERVER_URL
console.log(baseURL);

// Create the client instance with server and authentication details

export const fetchClient = new FetchClient({
    BASE: baseURL,
})
