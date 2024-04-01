"use client"

import React, { useEffect, useState } from 'react';
import { useTranslations } from "next-intl";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Divider from "@/components/ui/Divider";
import ResponseCard from "./card";
import TaskView from '@/components/Task/TaskView';
import { Order } from '@/openapi/client/models/Order';

import { ITaskMetaInfo } from '@/hooks/useTaskFunc';
import { useTask } from '@/lib/provider/task.provider';
import { CircularLoading } from '@/components/features/Loaders';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ paddingTop: "20px" }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
        sx: {
            height: "50px",
            width: "155px",
            fontSize: "11px",
            fontWeight: 400,
            lineHeight: "20px",
            letterSpacing: "0.0666em",
            textAlign: "center",
            textTransform: "uppercase",
            '&:hover': {
                color: 'info.main',
                opacity: 1,
            },
            '&.Mui-selected': {
                color: 'common.white',
            },
            '&.Mui-focusVisible': {
                backgroundColor: 'common.white',
            },
        },
        variant: "fullWidth",
    };
}

export default function Content(props: {
    task: Order | null;
    taskMetaInfo: ITaskMetaInfo;
    tabVisibility: boolean;
    tab: number;
    changeTab: (e: any, newValue: number) => void;
}) {
    const trans = useTranslations();
    const { responses, response, selectResponse, loadResponses } = useTask();

    useEffect(() => {
        if (!props.task || props.task.index === undefined || responses.loading) return;
        loadResponses(props.task.index);
    }, [props.task]);

    return (
        <div className="w-full">
            {props.tabVisibility && <div className="h-[50px]">
                <Tabs centered value={props.tab} onChange={props.changeTab} aria-label="basic tabs example">
                    <Tab label={trans("common.task")} {...a11yProps(0)} />
                    <Tab label={`${trans("common.responses")} (${props.task?.responsesCount || 0})`} {...a11yProps(1)} />
                </Tabs>
            </div>}
            <Divider />
            <CustomTabPanel value={props.tab} index={0}>
                {props.task && <TaskView
                    data={props.task}
                    info={props.taskMetaInfo}
                />}
            </CustomTabPanel>
            <CustomTabPanel value={props.tab} index={1}>
                {responses.loading ? <CircularLoading /> : <Stack spacing="20px" direction="column">
                    {
                        responses.content.map((res, index) => <ResponseCard
                            key={index}
                            response={res}
                            select={() => selectResponse(res)}
                            isSelected={response?.id === res.id ? true : false}
                        />)
                    }
                </Stack>}
            </CustomTabPanel>
        </div>
    );
}
