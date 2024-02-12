"use client"

import React, { ReactNode} from 'react';
import {useTranslations} from "next-intl";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListSubheader from '@mui/material/ListSubheader';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Divider from "@/components/ui/Divider";
import SecondaryActionButton from "@/components/ui/buttons/SecondaryActionButton";
import {NextLinkComposed} from "@/components/Link";

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


const CustomListItem = ({icon, title, category}: {icon: ReactNode, title: string, category?: string})=>{
    return (
        <>
            <ListItem
                disablePadding
                secondaryAction={<SecondaryActionButton to={"/"}/>}>
                <ListItemButton
                    component={NextLinkComposed}
                    to={'/create-profile/category'}
                    sx={{"height": "80px", "padding": "0"}}
                    alignItems={"center"}>
                    <ListItemIcon sx={{fontSize: "24px"}}>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={
                        <Typography variant="h4" color="secondary.main" sx={{
                            fontWeight: 400,
                        }}>{title}</Typography>
                    } />
                </ListItemButton>
            </ListItem>
            <Divider component="li"/>
        </>
    )
}

export default function Content({data}: {data: string}) {
    const [value, setValue] = React.useState(0);
    const tc = useTranslations('common')
    const t = useTranslations('tasks')
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="w-full">
            <div className="h-[50px]">
                <Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={tc("created")} {...a11yProps(0)} />
                    <Tab label={tc("responses")} {...a11yProps(1)} />
                </Tabs>
            </div>
            <Divider/>
            <CustomTabPanel value={value} index={0}>
                    <nav>
                        <List
                            disablePadding
                            subheader={
                                <ListSubheader sx={{padding: "0","color": "common.white"}}
                                               component="div" id="nested-list-subheader">
                                    <Typography variant="h4">
                                        {t("you_have_created", {value: "77"})}
                                    </Typography>
                                </ListSubheader>
                            }
                        >
                            <CustomListItem icon={"⏳"} title={t("on_moderation", {value: 2})}/>
                            <CustomListItem icon={"🧢"}  title={t("no_responses", {value: 0})}/>
                            <CustomListItem icon={"💎"}  title={t("have_responses", {value: 81})}/>
                            <CustomListItem icon={"🤌"}  title={t("offer_made", {value: 1})}/>
                            <CustomListItem icon={"⚒️"}  title={t("in_the_work", {value: 4})}/>
                            <CustomListItem icon={"💸️"}  title={t("pending_payment", {value: 2})}/>
                            <CustomListItem icon={"🤵"}  title={t("arbitration", {value: 2})}/>
                            <CustomListItem icon={"🚀"}  title={t("completed", {value: 6})}/>
                        </List>
                    </nav>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <nav>
                    <List
                        disablePadding

                        subheader={
                            <ListSubheader sx={{padding: "0","color": "common.white"}}
                                           component="div" id="nested-list-subheader-2">
                                <Typography variant="h4">
                                    {t("you_have_responded", {value: "777"})}
                                </Typography>
                            </ListSubheader>
                        }
                    >
                        <CustomListItem icon={"💫️"} title={t("response_sent", {value: 2})}/>
                        <CustomListItem icon={"🔥️"}  title={t("response_denied", {value: 0})}/>
                        <CustomListItem icon={"🫳"}  title={t("an_offer_came_in", {value: 81})}/>
                        <CustomListItem icon={"🪁"}  title={t("in_the_work", {value: 1})}/>
                        <CustomListItem icon={"⚒️"}  title={t("on_inspection", {value: 4})}/>
                        <CustomListItem icon={"💸️"}  title={t("in_the_work", {value: 2})}/>
                        <CustomListItem icon={"🤵"}  title={t("arbitration", {value: 2})}/>
                        <CustomListItem icon={"🤴"}  title={t("task_accomplished", {value: 2})}/>
                    </List>
                </nav>
            </CustomTabPanel>
        </div>
    );
}
