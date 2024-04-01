"use client"
import React, { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { redirect, useRouter } from "next/navigation";

import { useTonConnect } from "@/hooks/useTonConnect";

import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import { NextLinkComposed } from "@/components/Link";
import Footer from "@/components/layout/Footer";
import AppBar from "@/components/layout/app-bar";
import BackButton from "@/components/ui/buttons/BackButton";
import FooterButton from "@/components/ui/buttons/FooterButton";
import Shell from "@/components/layout/Shell";
import { CircularLoading } from "@/components/features/Loaders";

import CustomerButtons from "@/components/Task/Buttons/CustomerButtons";
import FreelancerButtons from "@/components/Task/Buttons/FreelancerButtons";

import Content from "./page.content";

import { useTask } from "@/lib/provider/task.provider";
import { useAuthContext } from "@/lib/provider/auth.provider";

type Props = {
    params: { locale: string, id: number };
};

const Page = ({ params: { locale, id } }: Props) => {

    const trans = useTranslations();
    const router = useRouter();
    const { connect, connected } = useTonConnect();
    const [tab, setTab] = useState(0);
    const { user } = useAuthContext();
    const { task, response, loadTask, info } = useTask();

    const handleChange = (e: any, newValue: number) => {
        setTab(newValue);
    };

    const tabVisibility = useMemo(() => info.isResponses ? true : false, [info]);

    useEffect(() => {
        if (id < 0) router.replace('/en');
        loadTask({ index: id, translateTo: locale, currentUserIndex: user?.data?.index });
    }, [id, user]);

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

    const footer = () => {
        if (!task.content) return <></>;
        if (!connected) {
            return <Footer>
                <FooterButton
                    onClick={() => connect(() => {
                        if (!info.isCustomer) {
                            router.push(`${task.content?.index}/response`);
                        }
                    })}
                    color={"secondary"}
                    variant="contained">
                    {trans("common.log_in_and_respond")} ⚡️
                </FooterButton>
            </Footer>
        }

        if (info.isCustomer) {
            return tab ? <Footer>
                <FooterButton
                    onClick={() => router.push(`${task.content?.index}/offer`)}
                    color={"secondary"}
                    variant="contained"
                    disabled={response ? false : true}
                >
                    {trans("task.button.offer_cooperation")}
                </FooterButton>
            </Footer> : <CustomerButtons
                order={task.content}
                response={response}
                statusCode={info.statusCode}
                clicks={{
                    20: () => handleChange(undefined, 1)
                }}
            />
        }

        return <FreelancerButtons order={task.content} statusCode={info.statusCode} />
    }

    return (
        <Shell withDrawer header={header} footer={footer()}>
            <div className="px-[20px] pb-[20px]">
                {task.loading ? <CircularLoading /> : <Content
                    taskMetaInfo={info}
                    tabVisibility={tabVisibility}
                    tab={tab}
                    changeTab={handleChange}
                    task={task.content}
                />}
            </div>
        </Shell>
    )
}

export default Page;
