import {unstable_setRequestLocale} from "next-intl/server";
import {locales} from "@/config";
import {useTranslations} from "next-intl";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";
import AppBar from "@/components/layout/app-bar";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import MenuButton from "@/components/ui/buttons/MenuButton";
import Shell from "@/components/layout/Shell";
import React, {Suspense} from "react";

import Content from "@/app/[locale]/tasks/my/content";
import CenteredContainer from "@/components/ui/CenteredContainer";

type Props = {
    params: { locale: string };
};

export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}

const Page = ({params: {locale}}: Props) => {
    unstable_setRequestLocale(locale);
    const t = useTranslations("tasks");
    const data = "on moderation";
    const footer = (
        <Footer  >
            <FooterButton
                color={"secondary"} sx={{color: "common.black", width: "100%"}}
                variant="contained">
                {t("create")}
            </FooterButton>
        </Footer>
    )
    const header = (
        <AppBar padding="15px 20px">
            <Stack direction="row" alignItems="center" spacing={"10px"}>
                <MenuButton/>
                <Typography variant="h5" sx={{color: "info.main"}}>{t("my",)}</Typography>
            </Stack>
        </AppBar>
    )

    return (
        <Shell miniAppbar={true} withDrawer header={header} footer={footer}>
            <Suspense fallback={"Loading..."}>
                {data ? (
                    <Content data={data}/>
                ) : (
                    <CenteredContainer >{t("you_have_not_created_tasks")}</CenteredContainer>
                )}
            </Suspense>
        </Shell>
    )
}

export default Page;
