import React from "react";
import { getTranslations } from "next-intl/server";

import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import TaskView from "@/components/TaskView";
import Shell from "@/components/layout/Shell";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";
import AppBar from "@/components/layout/app-bar";
import BackButton from "@/components/ui/buttons/BackButton";
import MenuButton from "@/components/ui/buttons/MenuButton";
import { locales } from "@/config/config";
import { NextLinkComposed } from "@/components/Link";
import ConnectButton from "@/components/ui/buttons/ConnectButton";
import { fetchClientGetter } from "@/openapi/client-getter";
import { ApiError } from "@/openapi/client"
import { notFound } from "next/navigation";

type Props = {
    params: { locale: string, id: number };
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

const Page = async ({ params: { locale, id } }: Props) => {

    const trans = await getTranslations("common");
    const fetchClient = fetchClientGetter({ locale: locale, next: { revalidate: false } })
    let response;
    try {
        response = await fetchClient.search.getApiGetorder({ index: id })
    } catch (e) {
        if (e instanceof ApiError && e.status === 404) {
            return notFound();
        }
        throw e
    }

    const footer = (
        <Footer>
            <FooterButton
                color={"secondary"}
                variant="contained">
                {trans("log_in_and_respond")} ⚡️
            </FooterButton>
        </Footer>
    )
    const header = (
        <AppBar height="60px">
            <Stack direction="row" alignItems="center" spacing={"10px"}>
                <BackButton component={NextLinkComposed} to={"/"} />
                <Typography variant="h5" sx={{ color: "info.main" }}>
                    #{id}
                </Typography>
            </Stack>

            <div className="flex-grow" />
            <Stack direction="row" alignItems="center" spacing={"15px"}>
                <ConnectButton text={trans('connect')} />
                <MenuButton />
            </Stack>
        </AppBar>
    )

    return (
        <Shell header={header} footer={footer} withDrawer>
            <Stack
                className="p-5"
                component="div"
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={"20px"}>
                <TaskView data={response} />
            </Stack>
        </Shell>
    )
}

export default Page;
