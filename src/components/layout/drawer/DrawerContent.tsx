"use client"
import React, { useEffect, useRef } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
    List,
    ListItemButton,
    ListItemText,
    ListItem,
    Stack,
    Drawer as MuiDrawer,
    Box, Typography
} from '@mui/material';

import { useTonConnect } from "@/hooks/useTonConnect";

import { useAuthContext } from "@/lib/provider/auth.provider";
import { useAppContext } from "@/lib/provider/app.providers";
import { toast } from "@/lib/helper";

import Divider from "@/components/ui/Divider";
import CloseButton from "@/components/ui/buttons/CloseButton";
import ConnectButton from "@/components/ui/buttons/ConnectButton";

import Link, { NextLinkComposed } from "@/components/Link";

import AppBar from "@/components/layout/app-bar";
import LanguageToggler from "@/components/layout/drawer/LanguageToggler";
import Shell from "@/components/layout/Shell";

import Logo from "@/app/logo";
import UserAvatar from "@/components/UserAvatar";

interface Props {
    routes: { label: string, to: string, secure: boolean }[];
}

export default function DrawerContent({ routes }: Props) {
    const { walletAddress, connected } = useTonConnect();
    const [tonConnectUI] = useTonConnectUI();
    const { user } = useAuthContext()
    const { isDrawerOpen, toggleDrawer } = useAppContext()
    const pathname = usePathname();
    const router = useRouter();
    const trans = useTranslations("common");
    const pathRef = useRef<string | null>(null);

    const goTo = async (to: string, auth: boolean) => {
        if (!auth || (auth && connected)) {
            router.push(to);
            toggleDrawer(false);
            return;
        }
        if (auth && !connected) {
            try {
                pathRef.current = to;
                await tonConnectUI.openModal();
            } catch (e) {
                toast(trans("errors.something_went_wrong_when_try_to_connect_ton_wallet"), 'warning')
            }
        }
    }

    useEffect(() => {
        if (!connected || !pathRef.current) return;
        toggleDrawer(false);
        router.push(pathRef.current);
        pathRef.current = null;
    }, [connected]);

    const header = (
        <AppBar>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Logo />
            </Stack>
            <Box component="div" sx={{ flexGrow: 1 }} />
            <ConnectButton text={trans('connect')} />
            <Stack direction="row" alignItems="center" style={{ marginLeft: 10, marginRight: "1px" }}>
                <CloseButton onClick={() => toggleDrawer(false)} />
            </Stack>
        </AppBar>
    )
    return (
        <MuiDrawer
            variant="temporary"
            onClose={() => toggleDrawer(false)}
            open={isDrawerOpen}
            sx={{
                zIndex: theme => 400,
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
            <Shell header={header} footer={
                <div className="w-full max-w-[768px] min-w-[300px] mx-auto p-4">
                    <Stack direction="row" spacing={2}
                        justifyContent="space-between">
                        <Typography component="div" sx={{ color: "text.secondary" }} variant="body2">
                            {trans("text_support")}
                        </Typography>
                        <LanguageToggler />
                    </Stack>
                </div>}>

                <Stack spacing={0} className="h-full">
                    {walletAddress && (
                        <div className="h-[200px]">
                            <Stack spacing="20px" className="py-[30px]" direction="column" justifyContent="center"
                                alignItems="center">
                                <UserAvatar />
                                <div className="text-center">
                                    {user?.data?.telegram && <Typography variant="h4">
                                        {user?.data?.telegram}
                                    </Typography>}
                                    <Typography component="div" variant="caption">
                                        <Link onClick={() => toggleDrawer(false)} className="underline"
                                            noLinkStyle href={"/profile"}>
                                            {trans("profile")} 📖
                                        </Link>
                                    </Typography>
                                </div>
                            </Stack>
                            <Divider />
                        </div>
                    )}
                    <nav className={clsx("grow", walletAddress ? "" : "flex flex-col justify-center items-center")}>
                        <List sx={{ width: "100%" }}>
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
                                            onClick={() => goTo(e.to, e.secure)}
                                            selected={isSelectedRoute}
                                        >
                                            <ListItemText
                                                sx={{ textAlign: "center" }}
                                                primaryTypographyProps={{
                                                    "color": isSelectedRoute ? "text.primary" : "text.secondary",
                                                    fontFamily: "InterRegular",
                                                    "fontWeight": "700 !important"
                                                }}
                                                primary={e.label} />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </nav>
                </Stack>
                {/*</div>*/}
            </Shell>
        </MuiDrawer>
    )
}
