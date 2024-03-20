import Image from "next/image";
import React from "react";
import pick from "lodash/pick";
import { NextIntlClientProvider, useMessages, useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from "next-intl/server";

import { locales } from "@/config/config";

import Typography from "@mui/material/Typography";

import AppBar from "@/components/layout/app-bar";
import Shell from "@/components/layout/Shell";
import CenteredContainer from "@/components/ui/CenteredContainer";
import Unicorn from "@/assets/gif/unicorn-low.gif";

import Content from "@/app/[locale]/profile/create/page.content";

import { IPageProps } from "@/interfaces/page";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default function Page({ params: { locale } }: IPageProps) {
    // Enable static rendering
    unstable_setRequestLocale(locale);
    const messages = useMessages();
    const trans = useTranslations("profile");

    const header = (
        <AppBar>
            <CenteredContainer>
                <Typography variant="h5" sx={{ color: "info.main" }}>{trans("create")}</Typography>
            </CenteredContainer>
        </AppBar>
    )

    return (
        <Shell withDrawer header={header}>
            <div className="p-5">
                <div className="flex justify-center mb-[30px]">
                    <Image src={Unicorn} alt="unicorn" width={90} height={90} />
                </div>
                <NextIntlClientProvider
                    locale={locale}
                    messages={pick(messages, 'profile', 'common', "errors", 'form', 'network')}
                >
                    <Content />
                </NextIntlClientProvider>
            </div>
        </Shell>
    )
}
