import React, { ReactNode } from "react";
import type { Metadata } from 'next';
import pick from 'lodash/pick';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale, getMessages } from 'next-intl/server';

import { locales } from '@/config/config';
import AppProviders from "@/lib/provider/app.providers";

import 'react-toastify/dist/ReactToastify.css';

import "../fonts.css";
import "../globals.css";
// import { useSearchParams } from "next/navigation";

export const metadata: Metadata = {
    title: 'Alfamater',
    description: 'Ton wallet, Alfamater',
}

type Props = {
    children: ReactNode;
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

const RootLayout = async ({ children, params }: Props) => {
    const { locale } = await params;
    // Enable static rendering
    setRequestLocale(locale);
    const messages = await getMessages();

    let config = null;

    return (
        <html lang={locale}>
            <body className="dark font-sans-serif scroll-hide">
                <NextIntlClientProvider
                    locale={locale}
                    messages={pick(messages, "buttons", "copy", "common","category", "errors", "form", "filter", "locale_switcher", "network", "profile", "read_more", 'response', "screen", 'status_chip', 'tasks', "task")}
                >
                    <AppProviders options={{ key: 'mui' }} config={config}>
                        {children}
                    </AppProviders>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}

export default RootLayout;
