"use client"

import {useTranslations} from "next-intl";
import React from "react";
import {
    List,
    ListItemButton,
    ListItemText,
    ListItem,
    Stack,
    Drawer as MuiDrawer,
    Typography
} from '@mui/material';
import ListItemIcon from "@mui/material/ListItemIcon";
import MuiDivider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";

import AppBar from "@/components/layout/app-bar";
import Divider from "@/components/ui/Divider";

import BackButton from "@/components/ui/buttons/BackButton";

import {useAppContext} from "@/lib/app-providers";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";

const FilterContent = () => {
    const {isFilterOpen, toggleFilter} = useAppContext()

    const tc = useTranslations("common");

    return (
        <MuiDrawer
            variant="temporary"
            onClose={() => toggleFilter(false)}
            open={isFilterOpen}
            sx={{
                zIndex: theme => theme.zIndex.drawer + 2,
                width: "100vw",
            }}

            PaperProps={{
                sx: {
                    width: "100%",
                    backgroundColor: theme => theme.palette.background.paper,
                    backgroundImage: 'none'
                },
            }}
        >

            <div className="w-[375px] h-full mx-auto pt-[60px]">
                <AppBar>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <BackButton onClick={() => toggleFilter(false)}/>
                        <Typography variant="h5" color="info">{tc("filter")}</Typography>
                    </Stack>
                </AppBar>

                <div>
                    <nav aria-label="filter">
                        <List>
                            <ListItem disablePadding secondaryAction={<ArrowRightIcon/>}>
                                <ListItemButton>
                                    <ListItemIcon sx={{fontSize: "24px"}}>
                                        🧩
                                    </ListItemIcon>
                                    <ListItemText primary={
                                        <Typography variant="caption">Draft</Typography>
                                    } secondary={
                                        <Typography sx={{color: "common.white"}} variant="body1">Drafts</Typography>
                                    }/>
                                </ListItemButton>
                            </ListItem>
                            <Divider/>
                            <ListItem disablePadding secondaryAction={<ArrowRightIcon/>}>
                                <ListItemButton>
                                    <ListItemIcon sx={{fontSize: "24px"}}>
                                        🌎
                                    </ListItemIcon>

                                    <ListItemText primary={
                                        <Typography variant="caption">Draft</Typography>
                                    } secondary={
                                        <Typography sx={{color: "common.white"}} variant="body1">Drafts</Typography>
                                    }/>
                                </ListItemButton>
                            </ListItem>
                            <Divider/>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon sx={{fontSize: "24px"}}>💎</ListItemIcon>
                                    <ListItemText primaryTypographyProps={{variant: "body1", sx: {opacity: "33%"}}}
                                                  primary="Drafts"/>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                    <MuiDivider/>
                    <nav aria-label="secondary mailbox folders">
                        <List>
                            <ListItem disablePadding secondaryAction={<Radio/>}>
                                <ListItemButton>
                                    <ListItemText
                                        secondaryTypographyProps={{variant: "caption", sx: {color: "common.white"}}}
                                        primaryTypographyProps={{sx: {marginBottom: "15px"}, variant: "h5"}}
                                        primary={"Sort"} secondary="By publication date"/>
                                </ListItemButton>
                            </ListItem>
                            <Divider/>

                            <ListItem disablePadding secondaryAction={<Radio/>}>
                                <ListItemButton>
                                    <ListItemText
                                        secondaryTypographyProps={{variant: "caption", sx: {color: "common.white"}}}
                                        secondary="By deadline"/>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                    <MuiDivider/>
                </div>
            </div>
        </MuiDrawer>
)
}

export default FilterContent;
