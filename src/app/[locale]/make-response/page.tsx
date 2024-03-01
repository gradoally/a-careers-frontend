import React from "react";

import {unstable_setRequestLocale} from "next-intl/server";
import {locales} from "@/config";
import Stepper from "./stepper";

import {NextIntlClientProvider, useMessages} from 'next-intl';
import pick from "lodash/pick";
type Props = {
    params: {
        category: string;
        locale: string;
    };
};


export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}

const Page = ({params: {locale}}: Props)=>{
    // Enable static rendering
    unstable_setRequestLocale(locale);
    const messages = useMessages();

    return (

        <NextIntlClientProvider
            locale={locale}
            messages={pick(messages, "tasks", "buttons", "network")}
        >
            <Stepper/>
        </NextIntlClientProvider>
    )
}

export default Page;