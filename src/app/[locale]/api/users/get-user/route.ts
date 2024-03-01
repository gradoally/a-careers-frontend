import {cookies} from "next/headers";
import {getTranslations} from "next-intl/server";
import {type NextRequest} from 'next/server'
import {fetchClientGetter} from "@/openapi/client-getter";
import {DEFAULT_LOCALE} from "@/lib/constants";
import {ApiError} from "@/openapi/client";

export async function GET(request: NextRequest) {
    const cookieStore = cookies();
    const locale = cookieStore.get("NEXT_LOCALE");
    const t = await getTranslations("errors");
    const searchParams = request.nextUrl.searchParams;
    const queryValue = searchParams.get('value');
    const queryBy = searchParams.get('by');

    if (!queryValue) {
        return new Response(`Invalidated request value`, {
            status: 400,
        })
    }
    let by = queryBy === "index" ? "index" : "wallet";

    const fetchClient = fetchClientGetter(
        {locale: locale?.value ?? DEFAULT_LOCALE, next: {revalidate: false}}
    )
    try {
        if (by === "index") {
            const value = parseInt(queryValue)
            if (isNaN(value)){
                if (!queryValue) {
                    return new Response(`Invalidated request value`, {
                        status: 400,
                    })
                }
            }
            const response = await fetchClient.search.getApiGetuser(
                {index: value, translateTo: locale?.value ?? DEFAULT_LOCALE}
            )
            return Response.json(response);

        } else {
            const response = await fetchClient.search.getApiFinduser(
                {address: queryValue, translateTo: locale?.value ?? DEFAULT_LOCALE}
            )
            if (response?.found && response?.data) {
                return Response.json(response.data);
            }
            return new Response(t("user_not_found"), {status: 404})
        }

    } catch (e) {
        console.log(e, 'users.get-user.route')
        if (e instanceof ApiError && e.status == 404) {
            return new Response(t("user_not_found"), {
                status: 404,
            })
        }
        return new Response(t("something_went_wrong_sorry"), {
            status: 500,
        })
    }
}