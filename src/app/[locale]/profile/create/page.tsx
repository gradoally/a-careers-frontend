import {useTranslations} from "next-intl";

import Shell from "@/components/layout/Shell";
import React from "react";
import AppBar from "@/components/layout/app-bar";

import Typography from "@mui/material/Typography";

import Avatar from "@mui/material/Avatar";
import Form from "./form";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";
import CenteredContainer from "@/components/ui/CenteredContainer";
import {unstable_setRequestLocale} from "next-intl/server";
import {locales} from "@/config";

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
    const t = useTranslations("profile");
    const header = (
        <AppBar >
            <CenteredContainer>
                <Typography variant="h5" sx={{color: "info.main"}}>{t("create")}</Typography>
            </CenteredContainer>
        </AppBar>
    )
    const footer = (
        <Footer  >
            <FooterButton
                className="w-full"
                color={"secondary"} sx={{color: "common.black"}}
                variant="contained">
                {t("send_to_blockchain")}
            </FooterButton>
            <Typography variant="body2">Комиссия сети ≈ 0.011 TON</Typography>
        </Footer>
    )

    return (
        <Shell miniAppbar={true} withDrawer header={header} footer={footer}>
            <div className="flex justify-center mb-[30px]">
                <Avatar sx={{"height": "90px", width: "90px"}} alt="Avatar" src={"/avatar.png"}/>
            </div>
            <Form/>
        </Shell>
    )
}

export default Page;