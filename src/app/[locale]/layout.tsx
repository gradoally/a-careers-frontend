import React, {ReactNode} from "react";
import clsx from "clsx";

import localFont from 'next/font/local'
import type {Metadata} from 'next'
import pick from 'lodash/pick';
import {NextIntlClientProvider, useMessages} from 'next-intl';


import {
    // getTranslations,
    unstable_setRequestLocale
} from 'next-intl/server';
import {locales} from '@/config';
import AppProviders from "@/lib/app-providers";

import 'react-toastify/dist/ReactToastify.css';

import "../globals.css";


const inter = localFont({
    src: '../fonts/Inter.ttf',
    display: 'swap',
    variable: '--font-inter',
})

export const metadata: Metadata = {
    title: 'Alfamater',
    description: 'Ton wallet, Alfamater',
}

type Props = {
    children: ReactNode;
    params: { locale: string };
};

export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}


const RootLayout = ({children, params: {locale}}: Props) => {
    // Enable static rendering
    unstable_setRequestLocale(locale);
    const messages = useMessages();
    return (
        <html lang={locale} className={`${inter.variable}`}>
        <body className={clsx(
            'dark',
        )}>

        <style>{`
            html {
                font-family: ${inter.variable};
            }
        `}</style>
        <AppProviders options={{key: 'mui'}}>
            <NextIntlClientProvider
                locale={locale}
                messages={pick(messages, 'errors', 'common', 'tasks', "copy")}
            >
                {children}
            </NextIntlClientProvider>
        </AppProviders>
        </body>
        </html>
    )
}

// export const revalidate = 86400 // revalidate at every 1 day
export default RootLayout;
