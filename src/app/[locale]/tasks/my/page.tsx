"use client"
import { useMessages } from 'next-intl';

import { useTranslations } from "next-intl";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";
import AppBar from "@/components/layout/app-bar";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import MenuButton from "@/components/ui/buttons/MenuButton";
import Shell from "@/components/layout/Shell";
import React, { Suspense } from "react";

import Content from "./content";
import CenteredContainer from "@/components/ui/CenteredContainer";
import { NextLinkComposed } from "@/components/Link";
import { useAuthContext } from "@/lib/provider/auth.provider";
import { IPageProps } from "@/interfaces/page";

const Page = (props: IPageProps) => {
    const { user } = useAuthContext();
    const trans = useTranslations("tasks");
    const data = "on moderation";
    const footer = (
        <Footer>
            {user?.data && 
            <FooterButton
                component={NextLinkComposed} to={"/tasks/create"}
                color={"secondary"}
                variant="contained">
                {trans("create")}
            </FooterButton>}
        </Footer>
    )
    const header = (
        <AppBar height={"60px"} padding="15px 20px">
            <Stack direction="row" alignItems="center" spacing={"10px"}>
                <MenuButton />
                <Typography variant="h5" fontWeight="500" color="info.main">{trans("my")}</Typography>
            </Stack>
        </AppBar>
    )

    return (<Shell withDrawer header={header} footer={footer}>
        <div className="px-[20px] pb-[20px]">
            <Suspense fallback={"Loading..."}>
                {user?.data ?
                    (data ? (
                        <Content data={data} />
                    ) : (
                        <CenteredContainer >{trans("you_have_not_created_tasks")}</CenteredContainer>
                    )) : <></>}
            </Suspense>
        </div>
    </Shell>
    )
}

export default Page;
