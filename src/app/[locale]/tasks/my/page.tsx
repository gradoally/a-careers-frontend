"use client"
import React, { Suspense, useState, useEffect, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";

import { useAuthContext } from '@/lib/provider/auth.provider';

import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import AppBar from "@/components/layout/app-bar";
import Shell from "@/components/layout/Shell";
import CenteredContainer from "@/components/ui/CenteredContainer";
import { NextLinkComposed } from "@/components/Link";
import { CircularLoading } from '@/components/features/Loaders';
import MenuButton from "@/components/ui/buttons/MenuButton";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";
import Content from "./content";

import { getUserStatus } from '@/services/profile';

import { IUserStats } from '@/interfaces/request';

export default function Page() {
    const locale = useLocale();
    const trans = useTranslations("tasks");

    const { user } = useAuthContext();

    const [stats, setStats] = useState<{
        loading: boolean;
        status: string;
        content: IUserStats;
    }>({
        loading: false,
        status: "",
        content: {
            "asCustomerTotal": 0,
            "asCustomerByStatus": {},
            "asFreelancerTotal": 0,
            "asFreelancerByStatus": {}
        }
    });

    const dataStatus = useMemo(() => {
        return {
            isLoading: stats.loading ? true : false,
            noTasks:(stats.content.asCustomerTotal || stats.content.asFreelancerTotal) ? false : true
        }
    }, [stats]);

    useEffect(() => {
        if (!user?.data || dataStatus.isLoading) return;
        setStats({
            ...stats,
            loading: true,
            status: "loading"
        });
        getUserStatus({
            address: user?.data?.userAddress || "",
            index: user?.data?.index === undefined ? -1 : user.data.index,
            locale
        })
            .then(res => {
                res.data && setStats({
                    loading: false,
                    status: "success",
                    content: res.data
                });
            }).catch(err => {
                console.log((err as Error).message);
                setStats({
                    ...stats,
                    loading: false,
                    status: "fail"
                });
            });
    }, [user]);

    const header = (
        <AppBar height={"60px"} padding="15px 20px">
            <Stack direction="row" alignItems="center" spacing={"10px"}>
                <MenuButton />
                <Typography variant="h5" fontWeight="500" color="info.main">{trans("my")}</Typography>
            </Stack>
        </AppBar>
    )

    const footer = (
        dataStatus.noTasks && <Footer>
            <FooterButton
                component={NextLinkComposed} to={"/tasks/create"}
                color={"secondary"}
                variant="contained">
                {trans("create")}
            </FooterButton>
        </Footer>
    )

    return (<Shell withDrawer header={header} footer={footer}>
        <div className="px-[20px] pb-[20px] h-full">
            {dataStatus.isLoading ? <CircularLoading className="m-auto" /> : (
                dataStatus.noTasks ? <CenteredContainer className="opacity-[40%] text-[12px] !font-InterLight" >{trans("you_have_not_created_tasks")}</CenteredContainer>
                    : <Content stats={stats.content} />
            )}
        </div>
    </Shell>
    )
}
