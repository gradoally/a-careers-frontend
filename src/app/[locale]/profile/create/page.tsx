import React from "react";
import pick from "lodash/pick";
import { useTranslations } from "next-intl";
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from "next-intl/server";

import Typography from "@mui/material/Typography";

import { locales } from "@/config/config";

import AppBar from "@/components/layout/app-bar";
import Shell from "@/components/layout/Shell";
import CenteredContainer from "@/components/ui/CenteredContainer";
import UserAvatar from "@/components/UserAvatar";
import Content from "./content";

type Props = {
    params: {
        locale: string;
    };
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default function Page({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);
    const messages = useMessages();

    const t = useTranslations("profile");
    const header = (
        <AppBar>
            <CenteredContainer>
                <Typography variant="h5" sx={{ color: "info.main" }}>{t("create")}</Typography>
            </CenteredContainer>
        </AppBar>
    )

    return (
        <Shell withDrawer header={header} >
            <div className="p-5">
                <div className="flex justify-center mb-[30px]">
                    <UserAvatar height={"90px"} width={"90px"} />
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
