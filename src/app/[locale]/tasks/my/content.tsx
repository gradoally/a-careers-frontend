"use client"

import React, { useState } from 'react';
import { useLocale, useTranslations } from "next-intl";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import ListSubheader from '@mui/material/ListSubheader';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Divider from "@/components/ui/Divider";
import { NextLinkComposed } from "@/components/Link";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";
import Image from "@/components/Image";
import { IUserStats } from '@/interfaces/request';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface ICustomListProps { iconSrc: string, title: string, status?: number }


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
                <div className="pt-5">
                    {children}
                </div>
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

function CustomListItem({ iconSrc, title, status }: ICustomListProps) {
    return (
        <>
            <ListItem
                disablePadding
                secondaryAction={<ArrowRightIcon />}>
                <ListItemButton
                    component={NextLinkComposed}
                    to={`/tasks/my/${status}?user=freelancer`}
                    sx={{ "height": "80px", "padding": "0" }}
                    alignItems={"center"}>
                    <ListItemIcon>
                        <Image width="24" height="24" alt="" src={iconSrc} />
                    </ListItemIcon>
                    <ListItemText primary={
                        <Typography variant="h4" color="secondary.main" sx={{
                            fontWeight: 400,
                        }}>{title}</Typography>
                    } />
                </ListItemButton>
            </ListItem>
            <Divider component="li" />
        </>
    )
}

export default function Content({ stats }: { stats: IUserStats }) {

    const tc = useTranslations('common');
    const trans = useTranslations('tasks');

    const [tab, setTab] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <div className="w-full">
            <div className="h-[50px]">
                <Tabs centered value={tab} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={tc("created")} {...a11yProps(0)} />
                    <Tab label={tc("responses")} {...a11yProps(1)} />
                </Tabs>
            </div>
            <Divider />
            <CustomTabPanel value={tab} index={0}>
                <nav>
                    <List
                        disablePadding
                        subheader={
                            <ListSubheader sx={{ padding: "0", "color": "common.white" }}
                                disableSticky
                                component="div" id="nested-list-subheader">
                                <Typography variant="h4">
                                    {trans("you_have_created", { value: stats.asCustomerTotal })}
                                </Typography>
                            </ListSubheader>
                        }
                    >
                        <CustomListItem iconSrc={"/images/hourglass_flowing_sand.png"} title={trans("on_moderation", { value: 0 })} />
                        <CustomListItem iconSrc={"/images/hear_no_evil.png"} title={trans("no_responses", { value: 0 })} />
                        <CustomListItem iconSrc={"/images/gem.png"} title={trans("have_responses", { value: 81 })} />
                        <CustomListItem iconSrc={"/images/offer_made.png"} title={trans("offer_made", { value: 1 })} />
                        <CustomListItem iconSrc={"/images/right-facing_fist.png"} title={trans("in_the_work", { value: 4 })} />
                        <CustomListItem iconSrc={"/images/money_with_wings.png"} title={trans("pending_payment", { value: 2 })} />
                        <CustomListItem iconSrc={"/images/eyes.png"} title={trans("arbitration", { value: 2 })} />
                        <CustomListItem iconSrc={"/images/rocket.png"} title={trans("completed", { value: 6 })} />
                    </List>
                </nav>
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={1}>
                <nav>
                    <List
                        disablePadding
                        subheader={
                            <ListSubheader sx={{ padding: "0", "color": "common.white" }}
                                component="div" id="nested-list-subheader-2">
                                <Typography variant="h4">
                                    {trans("you_have_responded", { value: stats.asFreelancerTotal })}
                                </Typography>
                            </ListSubheader>
                        }
                    >
                        <CustomListItem iconSrc={"/images/dizzy.png"} title={trans("response_sent", { value: 2 })} />
                        <CustomListItem iconSrc={"/images/fire.png"} title={trans("response_denied", { value: 0 })} />
                        <CustomListItem iconSrc={"/images/fish_cake.png"} title={trans("an_offer_came_in", { value: 81 })} />
                        <CustomListItem iconSrc={"/images/right-facing_fist.png"} title={trans("in_the_work", { value: 1 })} />
                        <CustomListItem iconSrc={"/images/dancer.png"} title={trans("on_inspection", { value: 2 })} />
                        <CustomListItem iconSrc={"/images/eyes.png"} title={trans("arbitration", { value: 2 })} />
                        <CustomListItem iconSrc={"/images/star.png"} title={trans("task_accomplished", { value: 2 })} />
                    </List>
                </nav>
            </CustomTabPanel>
        </div>
    );
}
