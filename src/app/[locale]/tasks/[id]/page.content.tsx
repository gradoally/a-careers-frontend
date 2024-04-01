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
import { ITaskMetaInfo } from '@/hooks/useTaskFunc';
import { useTask } from '@/lib/provider/task.provider';
import { useAuthContext } from '@/lib/provider/auth.provider';

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
    const { response, selectResponse } = useTask();
    const [responses] = useState<IResponse[]>([
        {
            id: 1,
            profile: DaimondIcon,
            offerPrice: 1200,
            description: "Designed the architecture, ready to show.",
            specialization: "Blockchain Developer, FunC, FIFT",
            deadline: new Date().toISOString(),
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
                    info={props.taskMetaInfo}
                />}
            </CustomTabPanel>
            <CustomTabPanel value={props.tab} index={1}>
                <Stack spacing="30px" direction="column">
                    {responses.map((res, index) => <ResponseCard
                        key={index}
                        isSelected={response?.id === res.id ? true : false}
                        response={res}
                        select={() => selectResponse({
                            id: res.id,
                            price: res.offerPrice,
                            text: res.description,
                            deadline: res.deadline,
                            freelancerAddress: "UQB0Nv1ucHN_7XJLkFlckrtQCjxEwPoiym2DqV_cAfvYaBKG",
                            freelancer: {
                                "index": 0,
                                "address": "EQAqPwkjnAIKJs57CLCGYfA2-pOpb-EzpkhL9fQkCSPUbD0u",
                                "userAddress": "UQB0Nv1ucHN_7XJLkFlckrtQCjxEwPoiym2DqV_cAfvYaBKG",
                                "revokedAt": "",
                                "userStatus": "active",
                                "isUser": true,
                                "isFreelancer": true,
                                "nickname": "Jonathan",
                                "telegram": "",
                                "about": "Web developer with 3 years of experience",
                                "website": "https://codernuub.com",
                                "portfolio": "",
                                "resume": "",
                                "specialization": "Javascript,Css,Pythong,Html",
                                "language": "dbd3a49d0d906b4ed9216b73330d2fb080ef2f758c12f3885068222e5e17151c",
                                "aboutTranslated": null
                            }
                        })}
                    />)}
                </Stack>
            </CustomTabPanel>
        </div>
    );
}
