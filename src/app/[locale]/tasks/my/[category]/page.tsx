"use client"
import React, { useEffect, useState, use } from "react";
import { useTranslations } from "next-intl";

import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import AppBar from "@/components/layout/app-bar";
import Shell from "@/components/layout/Shell";
import { NextLinkComposed } from "@/components/Link";
import TaskList from "@/components/Task/TaskList";
import CenteredContainer from "@/components/ui/CenteredContainer";
import BackButton from "@/components/ui/buttons/BackButton";

import { Order } from "@/openapi/client";
import { CircularLoading } from "@/components/features/Loaders";
import { useAuthContext } from "@/lib/provider/auth.provider";
import { getUserOrders } from "@/services/profile";

type Props = {
    params: Promise<{
        category: string;
        locale: string;
    }>;
    searchParams: Promise<{
        user: string;
        status: number;
    }>
};

export default function Page(props: Props) {
    const { category } = use(props.params);
    const searchParams = use(props.searchParams);

    const trans = useTranslations();
    const { user } = useAuthContext();
    const [order, setOrder] = useState<{
        loading: boolean;
        status: string;
        contents: Order[];
    }>({
        loading: true,
        status: "",
        contents: []
    })

    useEffect(() => {
        if (!user?.data || user?.data?.index === undefined) return;

        getUserOrders({
            index: user.data.index,
            status: searchParams.status,
            role: searchParams.user === "freelancer" ? "freelancerStatus" : "customerStatus"
        })
            .then(res => {
                setOrder({
                    status: "success",
                    loading: false,
                    contents: res.data || []
                });
            })
            .catch(err => {
                console.log((err as Error).message);
                setOrder({
                    status: "fail",
                    loading: false,
                    contents: []
                });
            });

    }, [user]);

    const header = (
        <AppBar>
            <Stack direction="row" alignItems="center" spacing={"10px"}>
                <BackButton component={NextLinkComposed} to={"/tasks/my"} />
                <Typography
                    variant="h5"
                    sx={{ color: "info.main" }}>
                    {trans(`tasks.${category}`, { value: order.contents.length })}
                </Typography>
            </Stack>
        </AppBar>
    )

    return (
        <Shell header={header}>
            <div className="pb-5 pt-[15px]">
                {order.loading ? <CircularLoading /> : (
                    order.contents.length ?
                        <TaskList data={order.contents} hideStatus={true} /> : <CenteredContainer>{trans("common.no_more_data")}</CenteredContainer>
                )}
            </div>
        </Shell>
    )
}
