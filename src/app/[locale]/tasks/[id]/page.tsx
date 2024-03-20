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

type Props = {
    params: { locale: string, id: number };
};

const Page = ({ params: { locale, id } }: Props) => {

    const trans = useTranslations();
    const router = useRouter();
    const [tonConnectUI] = useTonConnectUI();
    const { connected } = useTonConnect();

    const [task, setTask] = useState<{
        loading: boolean,
        status: string,
        content: Order | null
    }>({
        loading: false,
        status: "",
        content: null
    });

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

    const footer = (
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
                {trans("response.offerCooperation")}
            </FooterButton>}
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
        </AppBar>
    )

    return (
        <Shell withDrawer header={header} footer={footer}>
            <div className="px-[20px] pb-[20px]">
                <Content task={task.content} />
            </div>
        </Shell>
    )
}

export default Page;
