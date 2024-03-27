"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useTonConnect } from "@/hooks/useTonConnect";
import { Order } from "@/openapi/client";

import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import TaskView from "@/components/TaskView";
import Shell from "@/components/layout/Shell";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";
import AppBar from "@/components/layout/app-bar";
import BackButton from "@/components/ui/buttons/BackButton";
import MenuButton from "@/components/ui/buttons/MenuButton";

import { NextLinkComposed } from "@/components/Link";
import ConnectButton from "@/components/ui/buttons/ConnectButton";

import { Loader } from "@/components/features/Loaders";

import { getOrder } from "@/services/order";

type Props = {
    params: { locale: string, id: number };
};

export default function Page({ params: { locale, id } }: Props) {

    const [tonConnectUI] = useTonConnectUI();
    const { connected } = useTonConnect();
    const router = useRouter();
    const trans = useTranslations();
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

    if (["loading", ""].includes(task.status)) {
        return <Loader />
    }

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
                {trans("tasks.make_a_response")} ⚡️
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
            <Stack direction="row" alignItems="center" spacing={"15px"}>
                <ConnectButton text={trans('common.connect')} />
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
                {(task.status === "success" && task.content) && <TaskView data={task.content} />}
            </Stack>
        </Shell>
    )
}
