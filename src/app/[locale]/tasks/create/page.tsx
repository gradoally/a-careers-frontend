import React from "react";

import pick from 'lodash/pick';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from "next-intl/server";

import { locales } from "@/config/config";
import Stepper from "./stepper";

type Props = {
    params: {
        category: string;
        locale: string;
    };
};


export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

const Page = ({ params: { locale } }: Props) => {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const messages = useMessages();
    return (
        <NextIntlClientProvider
            locale={locale}
            messages={pick(messages, "tasks", "buttons", "network", "locale_switcher", "form", "errors")}
        >
            <Stepper />
        </NextIntlClientProvider>
    )
}

export default Page;
