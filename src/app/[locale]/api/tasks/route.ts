import {getTranslations} from "next-intl/server";
import {cookies} from 'next/headers'
import {type NextRequest} from 'next/server'
import {fetchClientGetter} from "@/openapi/client-getter";
import {DEFAULT_LOCALE} from "@/lib/constants";

export async function GET(request: NextRequest) {
    const cookieStore = cookies()
    const locale = cookieStore.get("NEXT_LOCALE")
    const t = await getTranslations("errors");

    const searchParams = request.nextUrl.searchParams
    const queryOrder = searchParams.get('orderBy')
    const queryPage = searchParams.get('page')
    const queryPrice = searchParams.get('price')
    const queryCategory = searchParams.get('category')
    const queryLanguage = searchParams.get('language')

    let page = 0
    if (queryPage) {
        const parsedPage = parseInt(queryPage, 10); // Parse string to integer with base 10
        if (!isNaN(parsedPage)) { // Check if the parsing is successful
            page = parsedPage;
        }
    }
    let order = "createdAt"
    if (queryOrder && ["createdAt", "deadline"].includes(queryOrder)) {
        order = queryOrder
    }
    let price: number | undefined = undefined
    if (queryPrice !== null && queryPrice !== "") {
        const parsedPrice = parseInt(queryPrice, 10)
        if (!isNaN(parsedPrice)) {
            price = parsedPrice
        }
    }

    let language: string | undefined = undefined
    if (queryLanguage !== null && queryLanguage !== "") {
        language = queryLanguage
    }

    let category: string | undefined = undefined
    if (queryCategory !== null && queryCategory !== "") {
        category = queryCategory
    }

    const fetchClient = fetchClientGetter({locale: locale?.value ?? DEFAULT_LOCALE})
    console.log(page, "page")
    try {
        const response = await fetchClient.search.getApiSearch({
            language: language,
            category: category,
            page: page,
            orderBy: order,
            sort: 'asc',
            minPrice: price,
            translateTo: locale?.value ?? DEFAULT_LOCALE
        })
        return Response.json(response)

    } catch (e) {
        return new Response(t("something_went_wrong_sorry"), {
            status: 500,
        })
    }
}