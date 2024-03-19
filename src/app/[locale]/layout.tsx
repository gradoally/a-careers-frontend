import React, { ReactNode } from "react";
import type { Metadata } from 'next'
import pick from 'lodash/pick';
import { NextIntlClientProvider } from 'next-intl';

import { unstable_setRequestLocale, getMessages } from 'next-intl/server';
import { locales } from '@/config/config';
import AppProviders from "@/lib/app-providers";
import { fetchClientGetter } from "@/openapi/client-getter";
import 'react-toastify/dist/ReactToastify.css';

import "../globals.css";

export const metadata: Metadata = {
    title: 'Alfamater',
    description: 'Ton wallet, Alfamater',
}

type Props = {
    children: ReactNode;
    params: { locale: string };
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}


const RootLayout = async ({ children, params: { locale } }: Props) => {
    // Enable static rendering
    unstable_setRequestLocale(locale);
    const messages = await getMessages();
    const fetchClient = fetchClientGetter({ next: { revalidate: 86400, tags: ["config"] } });
    let config = null
    try {
        config = await fetchClient.search.getApiConfig();
    } catch (e) {
        console.log(e)
    }
    return (
        <html lang={locale}>
            <body className="dark font-sans-serif scroll-hide">
                <NextIntlClientProvider
                    locale={locale}
                    messages={pick(messages, 'tasks', 'status_chip', 'errors', 'buttons', "locale_switcher", "common", "network", "form", "copy")}
                >
                    <AppProviders options={{ key: 'mui' }} config={config}>
                        {children}
                    </AppProviders>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}

// export const revalidate = 86400 // revalidate at every 1 day
export default RootLayout;
