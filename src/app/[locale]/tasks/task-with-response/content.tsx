"use client"

import React, {ReactNode} from 'react';
import {useTranslations} from "next-intl";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Divider from "@/components/ui/Divider";
import ResponseCard from "./card";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{paddingTop: "20px"}}>
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
                // fontWeight: theme.typography.fontWeightMedium,
            },
            '&.Mui-focusVisible': {
                backgroundColor: 'common.white',
            },
        },
        variant: "fullWidth",
    };
}





export default function Content() {
    const [value, setValue] = React.useState(1);
    const tc = useTranslations('common')
    const t = useTranslations('tasks')
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="w-full">
            <div className="h-[50px]">
                <Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={tc("task")} {...a11yProps(0)} />
                    <Tab label={tc("responses")} {...a11yProps(1)} />
                </Tabs>
            </div>
            <Divider/>
            <CustomTabPanel value={value} index={0}>
                <div>Tasks</div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Stack spacing="30px" direction="column">
                    <ResponseCard/>
                    <ResponseCard isSelected/>
                    <ResponseCard/>
                </Stack>
            </CustomTabPanel>
        </div>
    );
}