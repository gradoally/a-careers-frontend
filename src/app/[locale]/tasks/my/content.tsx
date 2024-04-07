"use client"

import React, { useState } from 'react';
import { useTranslations } from "next-intl";

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
import { CustomTabPanel, a11yProps } from '@/components/layout/TabPanel';

import { IUserStats2 } from '@/interfaces/request';

interface IContentProps {
    stats: IUserStats2;
    counts: {
        created: number;
        responded: number;
    }
}

interface ICustomListProps {
    iconSrc: string;
    title: string;
    category: string;
    status: string;
    user: "freelancer" | "customer";
}

function CustomListItem({ iconSrc, title, category, status, user }: ICustomListProps) {
    return (
        <>
            <ListItem
                disablePadding
                secondaryAction={<ArrowRightIcon />}
            >
                <ListItemButton
                    component={NextLinkComposed}
                    to={`/tasks/my/${category}?user=${user}&status=${status}`}
                    sx={{ "height": "80px", "padding": "0 !important" }}
                    alignItems={"center"}
                >
                    <ListItemIcon>
                        <Image width="24" height="24" alt="" src={iconSrc} />
                    </ListItemIcon>
                    <ListItemText primary={
                        <Typography variant="h4" color="secondary.main" sx={{
                            fontWeight: 400,
                            fontFamily: "SFProRegular"
                        }}>{title}</Typography>
                    } />
                </ListItemButton>
            </ListItem>
            <Divider component="li" />
        </>
    )
}

export default function Content({ stats, counts }: IContentProps) {

    const tc = useTranslations('common');
    const trans = useTranslations('tasks');
    const [tab, setTab] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <div className="w-full">
            <Tabs
                centered
                value={tab}
                onChange={handleChange}
            >
                <Tab
                    label={tc("created")}
                    className='!font-SFProRegular'
                    {...a11yProps(0)}
                />
                <Tab
                    label={tc("responses")}
                    className='!font-SFProRegular'
                    {...a11yProps(1)}
                />
            </Tabs>
            <Divider />
            <CustomTabPanel value={tab} index={0}>
                <nav>
                    <List
                        disablePadding
                        subheader={
                            <ListSubheader sx={{ padding: "0", margin: "12px 0", "color": "common.white" }}
                                disableSticky
                                component="div" id="nested-list-subheader">
                                <Typography variant="h4" sx={{ fontFamily: "SFProBold" }}>
                                    {trans("you_have_created", { value: counts.created })}
                                </Typography>
                            </ListSubheader>
                        }
                    >
                        <CustomListItem
                            iconSrc={"/images/hourglass_flowing_sand.png"}
                            title={trans("on_moderation", { value: stats.asCustomerByStatus.onModeration })}
                            status={"onModeration"}
                            category='on_moderation'
                            user='customer'
                        />
                        <CustomListItem
                            iconSrc={"/images/cap.png"}
                            title={trans("no_responses", { value: stats.asCustomerByStatus.noResponses })}
                            status={"noResponses"}
                            category='no_responses'
                            user='customer'
                        />
                        <CustomListItem
                            iconSrc={"/images/gem.png"}
                            title={trans("have_responses", { value: stats.asCustomerByStatus.haveResponses })}
                            status={"haveResponses"}
                            category='have_responses'
                            user='customer'
                        />
                        <CustomListItem
                            iconSrc={"/images/offer_made.png"}
                            title={trans("offer_made", { value: stats.asCustomerByStatus.offerMade })}
                            status={"offerMade"}
                            category='offer_made'
                            user='customer'
                        />
                        <CustomListItem
                            iconSrc={"/images/hammer.png"}
                            title={trans("in_the_work", { value: stats.asCustomerByStatus.inTheWork })}
                            status={"inTheWork"}
                            category='in_the_work'
                            user='customer'
                        />
                        <CustomListItem
                            iconSrc={"/images/money_with_wings.png"}
                            title={trans("pending_payment", { value: stats.asCustomerByStatus.pendingPayment })}
                            status={"pendingPayment"}
                            category='pending_payment'
                            user='customer'
                        />
                        <CustomListItem
                            iconSrc={"/images/lawyer.png"}
                            title={trans("arbitration", { value: stats.asCustomerByStatus.arbitration })}
                            status={"arbitration"}
                            category='arbitration'
                            user='customer'
                        />
                        <CustomListItem
                            iconSrc={"/images/rocket.png"}
                            title={trans("completed", { value: stats.asCustomerByStatus.completed })}
                            status={"completed"}
                            category='completed'
                            user='customer'
                        />
                    </List>
                </nav>
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={1}>
                <nav>
                    <List
                        disablePadding
                        subheader={
                            <ListSubheader sx={{ padding: "0", margin: "12px 0", "color": "common.white" }}
                                component="div" id="nested-list-subheader-2">
                                <Typography variant="h4" sx={{ fontFamily: "SFProBold" }}>
                                    {trans("you_have_responded", { value: counts.responded })}
                                </Typography>
                            </ListSubheader>
                        }
                    >
                        <CustomListItem
                            iconSrc={"/images/dizzy.png"}
                            title={trans("response_sent", { value: stats.asFreelancerByStatus.responseSent })}
                            status={"responseSent"}
                            category='response_sent'
                            user='freelancer'
                        />
                        <CustomListItem
                            iconSrc={"/images/fire.png"}
                            title={trans("response_denied", { value: stats.asFreelancerByStatus.responseDenied })}
                            status={"responseDenied"}
                            category='response_denied'
                            user='freelancer'
                        />
                        <CustomListItem
                            iconSrc={"/images/take.png"}
                            title={trans("an_offer_came_in", { value: stats.asFreelancerByStatus.anOfferCameIn })}
                            status={'anOfferCameIn'}
                            category='an_offer_came_in'
                            user='freelancer'
                        />
                        <CustomListItem
                            iconSrc={"/images/kite.png"}
                            title={trans("in_the_work", { value: stats.asFreelancerByStatus.inTheWork })}
                            status={"inTheWork"}
                            category='in_the_work'
                            user='freelancer'
                        />
                        <CustomListItem
                            iconSrc={"/images/dancer.png"}
                            title={trans("on_inspection", { value: stats.asFreelancerByStatus.onInspection })}
                            status={"onInspection"}
                            category='on_inspection'
                            user='freelancer'
                        />
                        <CustomListItem
                            iconSrc={"/images/lawyer.png"}
                            title={trans("arbitration", { value: stats.asFreelancerByStatus.arbitration })}
                            status={'arbitration'}
                            category='arbitration'
                            user='freelancer'
                        />
                        <CustomListItem
                            iconSrc={"/images/king.png"}
                            title={trans("terminated", { value: stats.asFreelancerByStatus.terminated })}
                            status={'terminated'}
                            category='terminated'
                            user='freelancer'
                        />
                        <CustomListItem
                            iconSrc={"/images/rocket.png"}
                            title={trans("completedTotal", { value: stats.asFreelancerByStatus.completedTotal })}
                            status={'completedTotal'}
                            category='completedTotal'
                            user='freelancer'
                        />
                        <CustomListItem
                            iconSrc={"/images/king.png"}
                            title={trans("failedTotal", { value: stats.asFreelancerByStatus.failedTotal })}
                            status={'failedTotal'}
                            category='failedTotal'
                            user='freelancer'
                        />
                    </List>
                </nav>
            </CustomTabPanel>
        </div>
    );
}
