import React, { ReactNode } from "react";
import type { Metadata } from 'next'
import pick from 'lodash/pick';
import { NextIntlClientProvider } from 'next-intl';

import { unstable_setRequestLocale, getMessages } from 'next-intl/server';
import { locales } from '@/config/config';
import AppProviders from "@/lib/provider/app.providers";
import 'react-toastify/dist/ReactToastify.css';

import "../fonts.css";
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
    let config = null;
    return (
        <html lang={locale}>
            <body className="dark font-sans-serif scroll-hide">
                <NextIntlClientProvider
                    locale={locale}
                    messages={pick(messages,"screen", "task", "buttons", "read_more", "profile", 'tasks', 'response', 'status_chip', 'errors', 'buttons', "locale_switcher", "common", "network", "form", "copy", 'profile', 'common', "errors", 'form', 'network')}
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
