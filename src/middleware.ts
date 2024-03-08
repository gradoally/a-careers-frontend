import type {NextRequest} from 'next/server'
// import {NextResponse} from 'next/server'
import createMiddleware from 'next-intl/middleware';

// import {checkToken} from "@/lib/auth";

import {DEFAULT_LOCALE} from "./lib/constants";
import {localePrefix, locales, pathnames} from './config/config';


export default function middleware(request: NextRequest) {
    // const [, locale, ...segments] = request.nextUrl.pathname.split('/');

    // const pathname = segments.join("/");

    // if (locale != null && pathname.startsWith('dashboard')) {
    //     const token = request.cookies.get(AUTH_TOKEN_COOKIE);
    //     const isValid = checkToken(token?.value.toString());
    //     if (!isValid) {
    //         request.cookies.delete(AUTH_TOKEN_COOKIE);
    //         request.cookies.delete(AUTH_REFRESH_TOKEN);
    //         const url = request.nextUrl.clone()
    //         url.searchParams.set('next-url', request.nextUrl.pathname);
    //         url.pathname = AUTH_LOGIN_URL;
    //         return NextResponse.redirect(url)
    //     }
    // }

    const handleI18nRouting = createMiddleware({
        defaultLocale: DEFAULT_LOCALE,
        locales,
        pathnames,
        localePrefix
      });

    return handleI18nRouting(request);
}


export const config = {
    matcher: [

        // Enable a redirect to a matching locale at the root
        '/',

        // Set a cookie to remember the previous locale for
        // all requests that have a locale prefix
        '/(ru|en)/:path*',

        // Enable redirects that add missing locales
        // (e.g. `/pathnames` -> `/en/pathnames`)
        '/((?!_next|_vercel|.*\\..*).*)'


        // "/((?!api|_next/static|_next/image|favicon.ico).*)",

        // '/',
        // '/dashboard:path*',
    ],
}
