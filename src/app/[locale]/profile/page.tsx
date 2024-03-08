import {NextIntlClientProvider, useMessages} from 'next-intl';
import React, {Suspense} from "react";
import {unstable_setRequestLocale} from "next-intl/server";
import Content from "@/app/[locale]/profile/page.content";
import pick from "lodash/pick";
import {locales} from "@/config/config";

import { IPageProps } from '@/interfaces/page';

export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}

const Page = ({params: {locale}}: IPageProps) => {
    // Enable static rendering
    unstable_setRequestLocale(locale);
    const messages = useMessages();

    return (
        <NextIntlClientProvider
            locale={locale}
            messages={pick(messages, 'profile', 'network', "common", "copy", "errors", 'form', "read_more")}
        >
            <Suspense fallback={<div>Loading...</div>}>
                <Content />
            </Suspense>
        </NextIntlClientProvider>
    )
}

export default Page;
