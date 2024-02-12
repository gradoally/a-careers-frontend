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
import Link, {NextLinkComposed} from "@/components/Link";

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
    const footer = (
        <Footer  >
            <FooterButton
                component={NextLinkComposed}
                to={"/create-profile/profile/create"}
                color={"secondary"} sx={{color: "common.black"}}
                className="w-full"
                variant="contained">
                {t("create")}
            </FooterButton>
        </Footer>
    )

    const header = (
        <AppBar padding="15px 20px">
            <Stack direction="row" alignItems="center" spacing={"10px"}>
                <MenuButton/>
                <Typography variant="h5" color="info.main">{t("my",)}</Typography>
            </Stack>
            <div className="grow"/>
            <Typography component="div" color="info.main" variant="body2">
                <Link noLinkStyle href={"/create-profile/with-tasks"}>With</Link>
            </Typography>
        </AppBar>
    )

    return (
        <Shell withAuth miniAppbar={true} withDrawer header={header} footer={footer}>
            <div className="p-[20px] h-full">
                <Suspense fallback={<div>Loading...</div>}>
                    <CenteredContainer className="text-sm opacity-[40%]">
                        {t("you_have_not_created_tasks")}
                    </CenteredContainer>
                </Suspense>
            </div>
        </Shell>
    )
}

export default Page;