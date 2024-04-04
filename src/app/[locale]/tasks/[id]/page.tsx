"use client"
import React, { Fragment, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { useTonConnect } from "@/hooks/useTonConnect";

import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Divider from "@/components/ui/Divider";
import { NextLinkComposed } from "@/components/Link";
import Footer from "@/components/layout/Footer";
import AppBar from "@/components/layout/app-bar";
import BackButton from "@/components/ui/buttons/BackButton";
import FooterButton from "@/components/ui/buttons/FooterButton";
import Shell from "@/components/layout/Shell";
import { CircularLoading } from "@/components/features/Loaders";

import { CustomTabPanel, a11yProps } from '@/components/layout/TabPanel';

import TaskView from "@/components/Task/View/TaskView";
import ResponseView from "@/components/Task/View/ResponsesView";
import CustomerButtons from "@/components/Task/View/Buttons/CustomerButtons";
import FreelancerButtons from "@/components/Task/View/Buttons/FreelancerButtons";

import { useTask } from "@/lib/provider/task.provider";
import { useAuthContext } from "@/lib/provider/auth.provider";
import ProfileView from "@/components/Profile/ProfileView";
import FreelancerView from "@/components/Task/View/FreelancerView";

type Props = {
    params: { locale: string, id: number };
};

export default function Page({ params: { locale, id } }: Props) {

    const trans = useTranslations();
    const router = useRouter();
    const { connect, connected } = useTonConnect();

    const { user } = useAuthContext();
    const { task, info, responses, selectResponse, response, loadTask, loadResponses, tabHandler, profileView, toggleProfileView } = useTask();

    const tabVisibility = useMemo(() => {
        return (info.isResponses && !info.isWorkStarted) ? true : false
    }, [info]);

    useEffect(() => {
        if (id < 0) router.replace('/en');
        console.log(user?.data?.index);
        loadTask({ index: id, translateTo: locale, currentUserIndex: user?.data?.index });
    }, [id, user]);

    useEffect(() => {
        if (!task.content || task.content.index === undefined || responses.loading) return;
        loadResponses(task.content.index);
    }, [task]);

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
                    onClick={connect}
                    color={"secondary"}
                    variant="contained">
                    {trans("common.log_in_and_respond")} ⚡️
                </FooterButton>
            </Footer>
        }

        if (info.isCustomer) {
            return tabHandler.tab ? <Footer>
                <FooterButton
                    onClick={() => router.push(`${task.content?.index}/offer`)}
                    color={"secondary"}
                    variant="contained"
                    disabled={response ? false : true}
                >
                    {trans("task.button.offer_cooperation")}
                </FooterButton>
            </Footer> : <CustomerButtons />
        }
        return <FreelancerButtons />
    }

    return (
        <Fragment>
            <Shell withDrawer header={header} footer={footer()}>
                <div className="px-[20px] pb-[20px]">
                    {task.loading ? <CircularLoading /> : <div className="w-full">
                        {tabVisibility && <div className="h-[50px]">
                            <Tabs centered value={tabHandler.tab} onChange={(e, newTab) => tabHandler.changeTab(newTab)} aria-label="basic tabs example">
                                <Tab label={trans("common.task")} {...a11yProps(0)} />
                                <Tab label={`${trans("common.responses")} (${task?.content?.responsesCount || 0})`} {...a11yProps(1)} />
                            </Tabs>
                        </div>}
                        <Divider />
                        <CustomTabPanel value={tabHandler.tab} index={0}>
                            <TaskView task={task} info={info} />
                        </CustomTabPanel>
                        <CustomTabPanel value={tabHandler.tab} index={1}>
                            <ResponseView
                                responses={responses}
                                selectedResponse={response}
                                selectResponse={selectResponse}
                                toggleProfileView={() => toggleProfileView(true)}
                            />
                        </CustomTabPanel>
                    </div>}
                </div>
            </Shell>
            {profileView && response?.freelancer && <FreelancerView
                isCustomer={info.isCustomer}
                freelancer={response.freelancer}
                click={() => {
                    toggleProfileView(false);
                    router.push(`/en/tasks/${task.content?.index}/offer`)
                }}
                back={() => toggleProfileView(false)}
            />}
        </Fragment>
    )
}
