"use client"
import React, { useState, useEffect, useMemo } from "react";
import { NextLinkComposed } from "@/components/Link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useTonConnect } from "@/hooks/useTonConnect";

import { useAuthContext } from "@/lib/provider/auth.provider";

import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import Footer from "@/components/layout/Footer";
import AppBar from "@/components/layout/app-bar";
import BackButton from "@/components/ui/buttons/BackButton";
import FooterButton from "@/components/ui/buttons/FooterButton";
import Shell from "@/components/layout/Shell";
import { CircularLoading } from "@/components/features/Loaders";

import CustomerButtons from "@/components/Task/Buttons/CustomerButtons";
import FreelancerButtons from "@/components/Task/Buttons/FreelancerButtons";

import Content from "./page.content";

import { Order } from "@/openapi/client";

import { getOrder } from "@/services/order";

type Props = {
    params: { locale: string, id: number };
};

const Page = ({ params: { locale, id } }: Props) => {

    const trans = useTranslations();
    const router = useRouter();
    const { user } = useAuthContext();
    const [tonConnectUI] = useTonConnectUI();
    const { connected } = useTonConnect();
    const [tab, setTab] = useState(0);
    const [task, setTask] = useState<{
        loading: boolean,
        status: string,
        content: Order | null
    }>({
        loading: false,
        status: "",
        content: null
    });

    const handleChange = (e: any, newValue: number) => {
        setTab(newValue);
    };

    async function connect() {
        try {
            await tonConnectUI.openModal();
            router.push(`${task.content?.index}/response`);
        } catch (err) {
            console.log(err);
        }
    }

    const isCustomer = useMemo(() => {
        return user?.data?.index === task.content?.customer?.index;
    }, [task, user]);

    useEffect(() => {
        if (task.loading) return;
        setTask({
            loading: true,
            status: "loading",
            content: null
        });
        getOrder({ index: `${id}`, locale })
            .then(res => {
                setTask({
                    loading: false,
                    status: "success",
                    content: res.data
                });
            }).catch(() => {
                setTask({
                    loading: false,
                    status: "fail",
                    content: null
                });
            })

    }, [id]);

    const header = (
        <AppBar height="60px">
            <Stack direction="row" alignItems="center" spacing={"10px"}>
                <BackButton component={NextLinkComposed} to={"/"} />
                <Typography variant="h5" sx={{ color: "info.main" }}>
                    {trans("tasks.task")} #{id}
                </Typography>
            </Stack>
            <div className="flex-grow" />
        </AppBar>
    )

    const ResponseFooter = (
        <Footer>
            <FooterButton
                onClick={() => router.push(`${task.content?.index}/response`)}
                color={"secondary"}
                variant="contained">
                {trans("task.button.offer_cooperation")}
            </FooterButton>
        </Footer>
    );

    const footer = () => {
        if (!task.content) return <></>;
        if (!connected) {
            return <Footer>
                <FooterButton
                    onClick={connect}
                    color={"secondary"}
                    variant="contained">
                    {trans("common.log_in_and_respond")} ⚡️
                </FooterButton>
            </Footer>
        }

        if (isCustomer) {
            return tab ? ResponseFooter : <CustomerButtons
                order={task.content}
                clicks={{
                    2: () => handleChange(undefined, 1)
                }}
            />
        }
        
        return <FreelancerButtons order={task.content} />
    }

    return (
        <Shell withDrawer header={header} footer={footer()}>
            <div className="px-[20px] pb-[20px]">
                {task.loading ? <CircularLoading /> : <Content
                    tabVisibility={isCustomer && task.content?.status === 2 ? true : false}
                    tab={tab}
                    changeTab={handleChange}
                    task={task.content}
                />}
            </div>
        </Shell>
    )
}

export default Page;
