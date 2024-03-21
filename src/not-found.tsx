import Shell from "@/components/layout/Shell";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";
import {NextLinkComposed} from "@/components/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import {parseCookies} from "nookies";
import {locales} from "@/config/config";

import "./globals.css";
import clsx from "clsx";
import AppProviders from "@/lib/provider/app.providers";
import type {Metadata} from "next";
import AppBar from "@/components/layout/app-bar";
import BackButton from "@/components/ui/buttons/BackButton";


export const metadata: Metadata = {
    title: 'Alfamater',
    description: 'Ton wallet, Alfamater',
}

const message = {
    "en": {"back": "Back", "message": "Something went wrong. Sorry!"},
    "ru": {"back": "Назад", "message": "Что то пошло не так. Простите!"},
}


export default function NotFound() {
    const cookies = parseCookies();
    let locale = cookies["NEXT_LOCALE"]

    if (!locales.includes(locale as any)) locale = "en";

    const header = (
        <AppBar>
            <Stack direction="row" alignItems="center" spacing={1}>
                <BackButton/>
                <Typography variant="h5" sx={{color: "info.main"}}>404</Typography>
            </Stack>
        </AppBar>
    )

    return (
        <html lang={locale}>
        <body className={clsx(
            'dark',
        )}>

        <AppProviders options={{key: 'mui'}} config={null}>
            <Shell  header={header} footer={<Footer>
                <FooterButton component={NextLinkComposed} to="/">
                    {message[locale as typeof locales[number]].back}
                </FooterButton>
            </Footer>}>
                <Stack className="p-5" component="div"
                       direction={"column"} justifyContent="center" alignItems={"center"} sx={{height: "100%"}}>
                    <div style={{
                        fontSize: "128px", lineHeight: "155px",
                    }} className="font-thin">
                        404
                    </div>
                    <Typography variant="body1">
                        {message[locale as typeof locales[number]].message}
                    </Typography>
                </Stack>
            </Shell>
        </AppProviders>
        </body>
        </html>
    )
}
