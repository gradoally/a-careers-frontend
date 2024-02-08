import React, {ReactNode} from "react";
import clsx from "clsx";
import {Inter} from 'next/font/google';
import type {Metadata} from 'next'
import pick from 'lodash/pick';
import {NextIntlClientProvider, useMessages} from 'next-intl';


import {
    // getTranslations,
    unstable_setRequestLocale
} from 'next-intl/server';
import {locales} from '@/config';
import AppProviders from "@/lib/app-providers";
import Shell from "@/components/layout/Shell";

import 'react-toastify/dist/ReactToastify.css';

import "../globals.css";


// const inter = Inter({
//     weight: ["100", "200", "300", '400', "500", "600", '700', "800", "900"],
//     subsets: ['latin'],
//     variable: '--font-inter',
// })

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
        <html lang={locale}>
        <head>

            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"anonymous"}/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet"/>
            </head>
        </head>
        <body className={clsx(
            'dark',
        )}>

        <AppProviders options={{key: 'mui'}}>

            <NextIntlClientProvider
                locale={locale}
                messages={pick(messages, 'errors', 'common')}
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