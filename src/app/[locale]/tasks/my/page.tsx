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

import { getUserStatus2 } from '@/services/profile';

import { IUserStats2 } from '@/interfaces/request';

export default function Page() {
    const trans = useTranslations("tasks");

    const { user } = useAuthContext();

    const [stats, setStats] = useState<{
        loading: boolean;
        status: string;
        content: IUserStats2;
    }>({
        loading: false,
        status: "",
        content: {
            "asCustomerByStatus": {
                "onModeration": 0,
                "noResponses": 0,
                "haveResponses": 0,
                "offerMade": 1,
                "inTheWork": 0,
                "pendingPayment": 0,
                "arbitration": 0,
                "completed": 1
            },
            "asFreelancerByStatus": {
                "responseSent": 0,
                "responseDenied": 0,
                "anOfferCameIn": 0,
                "inTheWork": 0,
                "onInspection": 0,
                "arbitration": 0,
                "terminated": 0,
                "completedTotal":0,
                "failedTotal":0
            }
        }
    });

    const dataStatus = useMemo(() => {
        const obj = {
            created: 0,
            responded: 0,
            isLoading: stats.loading ? true : false,
            noTasks: (stats.content.asCustomerByStatus || stats.content.asFreelancerByStatus) ? false : true
        }

        if (obj.isLoading) return obj;

        Object.keys(stats.content.asCustomerByStatus).forEach(key => {
            const field = key as keyof typeof stats.content.asCustomerByStatus;
            obj.created += stats.content.asCustomerByStatus[field];
        });
        Object.keys(stats.content.asFreelancerByStatus).forEach(key => {
            const field = key as keyof typeof stats.content.asFreelancerByStatus;
            obj.responded += stats.content.asFreelancerByStatus[field];
        });

        return obj;
    }, [stats]);

    useEffect(() => {
        if (!user?.data || dataStatus.isLoading) return;
        setStats({
            ...stats,
            loading: true,
            status: "loading"
        });
        getUserStatus2({
            index: user?.data?.index === undefined ? -1 : user.data.index
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
                    : <Content stats={stats.content} counts={{
                        created: dataStatus.created,
                        responded: dataStatus.responded
                    }} />
            )}
        </div>
    </Shell>
    )
}
