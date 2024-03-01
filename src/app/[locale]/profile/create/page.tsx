import React from "react";
import pick from "lodash/pick";
import {useTranslations} from "next-intl";
import {NextIntlClientProvider, useMessages} from 'next-intl';
import {unstable_setRequestLocale} from "next-intl/server";


import Typography from "@mui/material/Typography";

import {locales} from "@/config";

import AppBar from "@/components/layout/app-bar";
import Shell from "@/components/layout/Shell";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";
import CenteredContainer from "@/components/ui/CenteredContainer";
import {NextLinkComposed} from "@/components/Link";
import UserAvatar from "@/components/UserAvatar";
import Content from "./content";
type Props = {
    params: {
        locale: string;
    };
};

export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}

const Page = ({params: {locale}}: Props) => {
    // Enable static rendering
    unstable_setRequestLocale(locale);
    const messages = useMessages();

    const t = useTranslations("profile");
    const tn = useTranslations("network");
    const header = (
        <AppBar>
            <CenteredContainer>
                <Typography variant="h5" sx={{color: "info.main"}}>{t("create")}</Typography>
            </CenteredContainer>
        </AppBar>
    )
    const footer = (
        <Footer>
            <FooterButton
                component={NextLinkComposed}
                to={'/create-profile/profile'}
                className="w-full"
                color={"secondary"}
                variant="contained">
                {t("send_to_blockchain")}
            </FooterButton>
            <Typography variant="body2">{tn("commission", {value: "0.011 TON"})}</Typography>
        </Footer>
    )

    return (
        <Shell  withDrawer header={header} >
            <div className="p-5">
                <div className="flex justify-center mb-[30px]">
                    <UserAvatar height={"90px"} width={"90px"}/>
                </div>

                <NextIntlClientProvider
                    locale={locale}
                    messages={pick(messages, 'profile', 'common', "errors", 'form', 'network')}
                >
                    <Content/>
                </NextIntlClientProvider>
            </div>
        </Shell>
    )
}

export default Page;
