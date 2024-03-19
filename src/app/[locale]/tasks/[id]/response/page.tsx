import React from "react";

import { unstable_setRequestLocale } from "next-intl/server";
import { locales } from "@/config/config";
import Stepper from "./stepper";

import { NextIntlClientProvider, useMessages } from 'next-intl';
import pick from "lodash/pick";

type Props = {
    params: {
        category: string;
        locale: string;
        id: string;
    },
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

const Page = ({ params }: Props) => {
    // Enable static rendering
    unstable_setRequestLocale(params.locale);
    const messages = useMessages();

    return (
        <NextIntlClientProvider
            locale={params.locale}
            messages={pick(messages, "tasks", "buttons", "network")}
        >
            <Stepper id={params.id} />
        </NextIntlClientProvider>
    )
}

export default Page;