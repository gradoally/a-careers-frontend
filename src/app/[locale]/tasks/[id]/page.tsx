"use client"
import React, { useState, useEffect } from "react";
import { NextLinkComposed } from "@/components/Link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useTonConnect } from "@/hooks/useTonConnect";

import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import Footer from "@/components/layout/Footer";
import AppBar from "@/components/layout/app-bar";
import BackButton from "@/components/ui/buttons/BackButton";
import FooterButton from "@/components/ui/buttons/FooterButton";
import Shell from "@/components/layout/Shell";

import { Order } from "@/openapi/client";

import { getOrder } from "@/services/order";

import Content from "./page.content";
import { useAuthContext } from "@/lib/provider/auth.provider";

type Props = {
    params: { locale: string, id: number };
};

const Page = ({ params: { locale, id } }: Props) => {

    const trans = useTranslations();
    const router = useRouter();
    const { user } = useAuthContext();
    const [tonConnectUI] = useTonConnectUI();
    const { connected } = useTonConnect();
    const [value, setValue] = useState(0);
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
        setValue(newValue);
    };

    async function connect() {
        try {
            await tonConnectUI.openModal();
            router.push(`${task.content?.index}/response`);
        } catch (err) {
            console.log(err);
        }
    }

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

    const ResponseFooter = (
        <Footer>
            {!connected ? <FooterButton
                onClick={connect}
                color={"secondary"}
                variant="contained">
                {trans("common.log_in_and_respond")} ⚡️
            </FooterButton> : <FooterButton
                onClick={() => router.push(`${task.content?.index}/response`)}
                color={"secondary"}
                variant="contained">
                {trans("response.sendFeedback")}
            </FooterButton>}
        </Footer>
    );

    const TaskFooter = (
        <Footer>
            {user?.data?.index === task.content?.customer?.index ? <FooterButton
                onClick={(event: any) => handleChange(event, 1)}
                color={"secondary"}
                variant="contained">
                {trans("tasks.choose_specialist")}
            </FooterButton> : <FooterButton
                onClick={() => router.push(`${task.content?.index}/response`)}
                color={"secondary"}
                variant="contained">
                {trans("response.offerCooperation")}
            </FooterButton>}
        </Footer>
    )

    const footer = !value ? TaskFooter : ResponseFooter;

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

    return (
        <Shell withDrawer header={header} footer={footer}>
            <div className="px-[20px] pb-[20px]">
                <Content
                    isCustomer={task.content?.customer?.index !== user?.data?.index}
                    tab={value} changeTab={handleChange}
                    task={task.content}
                />
            </div>
        </Shell>
    )
}

export default Page;
