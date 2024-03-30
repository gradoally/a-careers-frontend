"use client"

import React, { useState } from 'react';
import { useTranslations } from "next-intl";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Divider from "@/components/ui/Divider";
import ResponseCard from "./card";
import TaskView from '@/components/Task/TaskView';
import { Order } from '@/openapi/client/models/Order';

import DaimondIcon from "@/assets/DaimondProfile.svg";

import { IResponse } from './card';

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
    isCustomer: boolean,
    tabVisibility: boolean,
    task: Order | null,
    tab: number,
    changeTab: (e: any, newValue: number) => void;
}) {
    const trans = useTranslations();
    const [responses] = useState<IResponse[]>([
        {
            profile: DaimondIcon,
            offerPrice: 1200,
            description: "Designed the architecture, ready to show.",
            specialization: "Blockchain Developer, FunC, FIFT",
            nickname: "SomeDao"
        }
    ]);
    return (
        <div className="w-full">
            {props.tabVisibility && <div className="h-[50px]">
                <Tabs centered value={props.tab} onChange={props.changeTab} aria-label="basic tabs example">
                    <Tab label={trans("common.task")} {...a11yProps(0)} />
                    <Tab label={`${trans("common.responses")} (3)`} {...a11yProps(1)} />
                </Tabs>
            </div>}
            <Divider />
            <CustomTabPanel value={props.tab} index={0}>
                {props.task && <TaskView
                    data={props.task}
                    isCustomer={props.isCustomer}
                />}
            </CustomTabPanel>
            <CustomTabPanel value={props.tab} index={1}>
                <Stack spacing="30px" direction="column">
                    {responses.map((response, index) => <ResponseCard key={index} isSelected={false} response={response} />)}
                </Stack>
            </CustomTabPanel>
        </div>
    );
}
