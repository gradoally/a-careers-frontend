import React from "react";
import pick from "lodash/pick";
import {useTranslations} from "next-intl";
import {NextIntlClientProvider, useMessages} from 'next-intl';
import {unstable_setRequestLocale} from "next-intl/server";


import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import {locales} from "@/config";

import AppBar from "@/components/layout/app-bar";
import Shell from "@/components/layout/Shell";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";
import CenteredContainer from "@/components/ui/CenteredContainer";
import ProfileForm from "@/components/forms/ProfileForm";
import {NextLinkComposed} from "@/components/Link";
import {Stack} from "@mui/material";
import BackButton from "@/components/ui/buttons/BackButton";

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
    const tc = useTranslations("common");
    const header = (

        <AppBar >
            <Stack direction="row" alignItems="center" spacing={"10px"}>
                <BackButton component={NextLinkComposed} to={"/create-profile/profile"}/>
                <Typography
                    variant="h5"
                    sx={{color: "info.main"}}>
                    {tc("edit_profile")}
                </Typography>
            </Stack>
        </AppBar>
    )
    const footer = (
        <Footer>
            <FooterButton
                component={NextLinkComposed}
                to={'/create-profile/profile'}
                className="w-full"
                color={"secondary"} sx={{color: "common.black"}}
                variant="contained">
                {t("update_on_blockchain")}
            </FooterButton>
            <Typography variant="body2">{tc("network_commission", {value: "0.011 TON"})}</Typography>
        </Footer>
    )

    const data = {
        username: "@new_user",
        smartContract: "EQCISAJu…W_JqYM3t",
        telegram: "@some_wallet",
        about: "🎯 dApp любой сложности\n" +
            "💎 Премиум дизайн (UI/UX)!\n" +
            "⚙️ Адаптивная верстка – на профессиональном уровне!🏆 Золотой партнёр «1С-Битрикс» (нет) !\n" +
            "\n" +
            "✔️ Blockchain-продвижение сайтов на лидирующие позиции. Взлом рынков, соц. инжинеринг",
        site: "my-little-studio.ton",
        portfolio: "https://github.com/somewallet",
        resume: "https://github.com/somewallet",
        specialization: ["FunC", "FIFT", "Toncenter API"]
    }

    return (
        <Shell miniAppbar={true} withDrawer header={header} footer={footer}>
            <div className="p-[20px]">
                <div className="flex justify-center mb-[30px]">
                    <Avatar sx={{"height": "90px", width: "90px"}} alt="Avatar" src={"/avatar.png"}/>
                </div>

                <NextIntlClientProvider
                    locale={locale}
                    messages={pick(messages, 'profile', 'common')}
                >
                    <ProfileForm data={data}/>
                </NextIntlClientProvider>
            </div>
        </Shell>
    )
}

export default Page;