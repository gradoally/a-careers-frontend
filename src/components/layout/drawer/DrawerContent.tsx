"use client"
import {useLocale} from "next-intl";
import {usePathname} from "next/navigation";
import React from "react";
import {
    List,
    ListItemButton,
    ListItemText,
    ListItem,
    Stack,
    Drawer as MuiDrawer,
    Box, Typography
} from '@mui/material';

import {useThemeContext} from "@/providers/theme/provider";
import Logo from "@/app/logo";
import CloseButton from "@/components/ui/buttons/CloseButton";
import ConnectButton from "@/components/ui/buttons/ConnectButton";
import AppBar from "@/components/layout/app-bar";
import {NextLinkComposed} from "@/components/Link";

interface Props {
    messages: { connect: string, text_support: string }
    routes: {label: string, to: string}[]
}
const DrawerContent = ({messages, routes}: Props) => {
    const {isDrawerOpen, toggleDrawer} = useThemeContext()
    const pathname = usePathname();
    const locale = useLocale();
    return (
        <MuiDrawer
            variant="temporary"
            onClose={() => toggleDrawer(false)}
            open={isDrawerOpen}
            sx={{
                width: "100vw",
                zIndex: theme => theme.zIndex.drawer + 2,
                '& .MuiPaper-root': {
                    width: "100vw",
                    backgroundColor: theme => theme.palette.background.paper,
                    backgroundImage: 'none'
                },
                display: "flex"
            }}
        >
            <AppBar>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Logo/>
                </Stack>
                <Box component="div" sx={{flexGrow: 1}}/>
                <Stack><ConnectButton text={messages.connect}/></Stack>
                <Stack direction="row" alignItems="center" style={{marginLeft: 10}}>
                    <CloseButton onClick={() => toggleDrawer(false)}/>
                </Stack>
            </AppBar>
            <nav style={{flexGrow: 1,}}>
                <List sx={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    {routes.map((e, index) => {
                        const [, , ...segments] = pathname.split('/');
                        const pathnameWithoutLocale = segments.join("/");
                        const isSelectedRoute = `/${pathnameWithoutLocale}` === e.to
                        return (
                            <ListItem key={index} disablePadding>
                                <ListItemButton
                                    sx={{
                                        "&.Mui-selected": {
                                            color: "text.primary"
                                        }
                                    }}
                                    component={NextLinkComposed}
                                    to={e.to}
                                    selected={isSelectedRoute}>
                                    <ListItemText
                                        sx={{textAlign: "center"}}
                                        primaryTypographyProps={{"color": isSelectedRoute?"text.primary":"text.secondary"}}
                                        primary={e.label}/>
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </nav>
            <Box component="div" sx={{padding: "16px"}}>
                <Stack direction="row" spacing={2}
                       justifyContent="space-between">
                    <Typography sx={{color: "text.secondary"}} variant="body2">
                        {messages.text_support}
                    </Typography>
                    <div>
                        <Typography sx={{color: "text.secondary"}} variant="body2">
                            🌎 {locale}
                        </Typography>
                    </div>
                </Stack>
            </Box>
        </MuiDrawer>
    )
}

export default DrawerContent;